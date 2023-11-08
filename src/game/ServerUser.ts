import ApiIdentity from '../api/ApiIdentity';
import ServerSession from './ServerSession';

export default class ServerUser {
    private data: ApiIdentity;

    private ip: string;

    private session?: ServerSession;

    constructor(data: ApiIdentity, ip: string) {
        this.data = data;
        this.ip = ip;
        this.session = undefined;
    }

    public getData(): ApiIdentity {
        return this.data;
    }

    public getId(): string {
        return this.data.identifier;
    }
}
