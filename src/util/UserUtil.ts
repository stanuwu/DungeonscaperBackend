import * as crypto from 'crypto';

export default class UserUtil {
    public static cleanName(name: string): string {
        // implement string cleaning here
        return name;
    }

    public static makeUserId(name: string, ip: string): string {
        const random: number = Math.random();
        return `${UserUtil.stringHash(ip) ^ UserUtil.stringHash(name) ^ random}`;
    }

    public static makeSessionId(name: string, ownerId: string): string {
        const random: number = Math.random();
        return `${UserUtil.stringHash(name) ^ UserUtil.stringHash(ownerId) ^ random}`;
    }

    public static stringHash(value: string): number {
        return Number(`0x${crypto.createHash('md5').update(value).digest('hex')}`);
    }
}
