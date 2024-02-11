import { Server, Socket } from 'socket.io';
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './Packets';
import UserManager from '../game/UserManager';
import ServerUser from "../game/ServerUser";

export default class SocketManager {
    public static Instance: SocketManager = new SocketManager();

    private server: Server;

    constructor() {
        this.server = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>({
            cors: {
                origin: "http://localhost:5173",
                methods: ["GET", "POST"]
            }
        });

        this.server.on('connection', this.HandleConnect);
    }

    public async StartListen(port: number): Promise<void> {
        this.server.listen(port + 1);
    }

    private HandleConnect(socket: Socket): void {
        // Test
        console.log('Client Connected');

        // Handle Disconnect
        socket.on('disconnect', () => {
            SocketManager.Instance.HandleDisconnect(socket);
        });

        // Handle Auth
        socket.on('auth', (auth) => {
            SocketManager.Instance.OnAuth(auth, socket);
        });

        // Handle ReAuth
        SocketManager.Instance.OnReAuth(socket);

        // Handle Users Request
        socket.on('requestUsers', () => SocketManager.Instance.UserRequest(socket));

        // Handle Kick User
        socket.on('kickUser', (id: number) => SocketManager.Instance.KickUser(id, socket));

        // Handle Test
        socket.on('test', () => console.log("Socket Test"));

        // Test Client
        socket.emit("test");
    }

    private HandleDisconnect(socket: Socket): void {
        console.log("Client Disconnected");
        const user = UserManager.Instance.getUser(socket.data.auth);
        if (user !== undefined) {
            user.clearSocket();
            user.getSession()?.removeUser(user.getData().identifier);
        }
    }

    private OnAuth(auth: string, socket: Socket): void {
        const user = UserManager.Instance.getUser(auth);
        if (user !== undefined) {
            user.setSocket(socket);
        }
    }

    private OnReAuth(socket: Socket): void {
        socket.timeout(5000).emit("requestAuth", (err: any, auth: string) => {
            if (err) {
                socket.disconnect();
                return;
            }
            const user = UserManager.Instance.getUser(auth);
            if (user !== undefined) {
                user.setSocket(socket);
                user.sendPlayState();
                user.getSession()?.addUser(user);
            }
        })
    }

    private UserRequest(socket: Socket): void {
        const user = UserManager.Instance.getUser(socket.data.auth);
        if (user !== undefined && user.getSession() !== undefined) {
            socket.emit('sendUsers', user.getSession()!.getUserNames())
        }
    }

    private KickUser(id: number, socket: Socket): void {
        const user = UserManager.Instance.getUser(socket.data.auth);
        if (user !== undefined && user.getSession() !== undefined && user.getSession()!.isUserOwner(user)) {
            const kicked = user.getSession()!.removeUserByIndex(id);
            kicked?.clearSession();
            kicked?.getSocket()?.emit('kick');
            kicked?.getSocket()?.disconnect();
        }
    }
}