import {Socket} from "socket.io";
import ApiIdentity from '../api/ApiIdentity';
import ServerSession from './ServerSession';

export default class ServerUser {
    private data: ApiIdentity;

    private ip: string;

    private session?: ServerSession;

    private socket?: Socket;

    constructor(data: ApiIdentity, ip: string) {
        this.data = data;
        this.ip = ip;
        this.session = undefined;
        this.socket = undefined;
    }

    public getData(): ApiIdentity {
        return this.data;
    }

    public getId(): string {
        return this.data.identifier;
    }

    public setSocket(socket: Socket): void {
        socket.data.auth = this.getId();
        this.socket = socket;
    }

    public getSocket(): Socket | undefined {
        return this.socket;
    }

    public getSession(): ServerSession | undefined {
        return this.session;
    }

    public setSession(session: ServerSession): void {
        this.session = session;
    }

    public clearSession(): void {
        this.session = undefined;
    }

    public clearSocket(): void {
        this.socket = undefined;
    }

    public sendPlayState(): void {
        // TODO: impl
    }
}
