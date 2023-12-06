import ApiIdentity from '../api/ApiIdentity';
import UserManager from '../game/UserManager';
import ApiSession from '../api/ApiSession';
import ServerUser from '../game/ServerUser';
import UserUtil from '../util/UserUtil';
import ServerSession from '../game/ServerSession';

export default class UserModel {
    public static makeOrGetUser(name: string, ip: string): ApiIdentity {
        const user: ServerUser | undefined = UserManager.Instance.getUser(UserUtil.makeUserId(name, ip));
        return user ? user.getData() : UserManager.Instance.createUser(name, ip).getData();
    }

    public static makeSession(name: string, description: string, owner: string): ApiSession | undefined {
        const user: ServerUser | undefined = UserManager.Instance.getUser(owner);
        if (!user) return undefined;
        const session: ServerSession | undefined = UserManager.Instance.getSession(UserUtil.makeSessionId(name, owner));
        return session ? session.getData() : UserManager.Instance.createSession(name, description, owner).getData();
    }

    public static joinSession(identifier: string, userid: string): ApiSession | undefined {
        const user: ServerUser | undefined = UserManager.Instance.getUser(userid);
        if (!user) return undefined;
        const session: ServerSession | undefined = UserManager.Instance.getSession(identifier);
        if (session) {
            session.addUser(user);
            return session.getData();
        }
        return undefined;
    }
}
