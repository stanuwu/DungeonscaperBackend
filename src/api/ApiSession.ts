export default class ApiSession {
    public readonly name: string;

    public readonly description: string;

    public readonly identifier: string;

    public readonly owner: string;

    public readonly websocket: string;

    constructor(name: string, description: string, identifier: string, owner: string, websocket: string) {
        this.name = name;
        this.description = description;
        this.identifier = identifier;
        this.owner = owner;
        this.websocket = websocket;
    }
}
