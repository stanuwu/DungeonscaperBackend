interface ServerToClientEvents {
    test: () => void;
    requestAuth: (callback: (auth: string) => void) => void;
    sendUsers: (users: string[]) => void;
    kick: () => void;
}

interface ClientToServerEvents {
    test: () => void;
    auth: (auth: string) => void;
    requestUsers: () => void;
    kickUser: (id: number) => void;
}

interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    auth: string;
}

export { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData }