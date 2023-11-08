import ApiSession from '../api/ApiSession';

export default class ServerSession {
    private data: ApiSession;

    private members: string[];

    constructor(data: ApiSession) {
        this.data = data;
        this.members = [data.owner];
    }

    public getData(): ApiSession {
        return this.data;
    }

    public getId(): string {
        return this.data.identifier;
    }
}
