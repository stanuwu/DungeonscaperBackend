import ApiSession from '../api/ApiSession';
import ServerUser from './ServerUser';
import UserManager from './UserManager';

export default class ServerSession {
    private data: ApiSession;

    public members: Map<string, ServerUser>;

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
        this.updateUsers();
    }

    public removeUser(userid: string): ServerUser | undefined {
        const user = this.members.get(userid);
        this.members.delete(userid);
        this.updateUsers();
        return user;
    }

    public removeUserByIndex(index: number): ServerUser | undefined {
        return this.removeUser(Array.from(this.members.keys())[index]);
    }

    public hasUser(userid: string): boolean {
        return this.members.has(userid);
    }

    public getUserNames(): string[] {
        const names: string[] = [];
        this.members.forEach((v) => {
            names.push(v.getData().name);
        });
        return names;
    }

    private updateUsers(): void {
        const names = this.getUserNames();
        this.members.forEach((v) => {
            v.getSocket()?.emit('sendUsers', names);
        });
    }

    public isUserOwner(user: ServerUser): boolean {
        // TODO: move owner id to server only
        return user.getData().identifier === this.getData().owner;
    }
}
