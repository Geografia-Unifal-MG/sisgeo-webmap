export class Datasource {
    public id: string;
    public name: string;
    public description: string;
    public host: string;
    public enabled: boolean;

    // constructor(id:string, name:string, description:string, host: string, enabled:boolean){
    //     this.id = id;
    //     this.name = name;
    //     this.description = description;
    //     this.host = host;
    //     this.enabled = enabled;
    // }

    constructor() {}

    addHost(host: string) {
        this.host = host;
        return this;
    }
}