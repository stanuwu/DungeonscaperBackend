import ApiSession from '../api/ApiSession';
import ServerUser from './ServerUser';
import UserManager from './UserManager';

export default class ServerSession {
    private data: ApiSession;

    private members: Map<string, ServerUser>;

    constructor(data: ApiSession) {
        this.data = data;
        this.members = new Map<string, ServerUser>();
        this.members.set(data.owner, UserManager.Instance.getUser(data.owner)!);
    }

    public getData(): ApiSession {
        return this.data;
    }

    public getId(): string {
        return this.data.identifier;
    }

    public addUser(user: ServerUser): void {
        this.members.set(user.getId(), user);
    }

    public removeUser(userid: string): void {
        this.members.delete(userid);
    }

    public hasUser(userid: string): boolean {
        return this.members.has(userid);
    }
}
