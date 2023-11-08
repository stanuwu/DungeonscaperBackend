export default class ApiIdentity {
    public readonly name: string;

    public readonly identifier: string;

    constructor(name: string, identifier: string) {
        this.name = name;
        this.identifier = identifier;
    }
}
