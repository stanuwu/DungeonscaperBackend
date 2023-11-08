import ServerSession from './ServerSession';
import ServerUser from './ServerUser';
import ApiIdentity from '../api/ApiIdentity';
import UserUtil from '../util/UserUtil';
import ApiSession from '../api/ApiSession';

export default class UserManager {
    public static readonly Instance: UserManager = new UserManager();

    private Users: Map<string, ServerUser>;

    private Sessions: Map<string, ServerSession>;

    constructor() {
        this.Users = new Map<string, ServerUser>();
        this.Sessions = new Map<string, ServerSession>();
    }

    private addUser(user: ServerUser): void {
        this.Users.set(user.getId(), user);
    }

    private addSession(session: ServerSession): void {
        this.Sessions.set(session.getId(), session);
    }

    public getUser(id: string): ServerUser | undefined {
        return this.Users.get(id);
    }

    public getSession(id: string): ServerSession | undefined {
        return this.Sessions.get(id);
    }

    public createUser(name: string, ip: string): ServerUser {
        const cleanName: string = UserUtil.cleanName(name);
        const id: string = UserUtil.makeUserId(cleanName, ip);
        const data: ApiIdentity = new ApiIdentity(cleanName, id);
        const user: ServerUser = new ServerUser(data, ip);
        this.addUser(user);
        return user;
    }

    public createSession(name: string, description: string, owner: string): ServerSession {
        const cleanName: string = UserUtil.cleanName(name);
        const cleanDesc: string = UserUtil.cleanName(description);
        const id: string = UserUtil.makeSessionId(cleanName, owner);

        // add websockets here
        const ws: string = 'N/A';

        const data: ApiSession = new ApiSession(cleanName, cleanDesc, id, owner, ws);
        const session: ServerSession = new ServerSession(data);
        this.addSession(session);
        return session;
    }
}
