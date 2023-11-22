import * as crypto from 'crypto';

export default class UserUtil {
    public static cleanName(name: string): string {
        return name.replace('[^[A-Za-z0-9\\,\\.\\-\\_\\:\\\'\\ \\(\\)\\"\\!]]', '');
    }

    public static makeUserId(name: string, ip: string): string {
        return `${BigInt(UserUtil.stringHash(ip)) ^ BigInt(UserUtil.stringHash(name))}`;
    }

    public static makeSessionId(name: string, ownerId: string): string {
        return `${BigInt(UserUtil.stringHash(name)) ^ BigInt(UserUtil.stringHash(ownerId))}`;
    }

    public static stringHash(value: string): number {
        return Number(`0x${crypto.createHash('md5').update(value).digest('hex')}`);
    }
}
