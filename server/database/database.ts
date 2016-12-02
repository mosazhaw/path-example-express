import {LokiJS} from "./lokijs";

export abstract class Database {

    private _db = LokiJS.getDatabase();

    constructor() {
    }

    get db(): any {
        return this._db;
    }

    protected abstract getCollection() : any;

    protected abstract getKeyName() : string;

    protected abstract createPathListEntry(entry:PathListEntry, entity:any);

    public list() : PathListEntry[] {
        let result:PathListEntry[] = [];
        for (let person of this.getCollection().find()) {
            let entry:PathListEntry = new PathListEntry();
            let key:PathListKey = new PathListKey();
            key.key = person['$loki'];
            key.name = this.getKeyName();
            entry.key = key;
            this.createPathListEntry(entry, person);
            result.push(entry);
        }
        return result;
    }

    public create(data:any) : boolean {
        this.getCollection().insert(data);
        return true;
    }

    public read(personKey:number) : any {
        let query:any = {};
        query["$loki"] = personKey;
        let result:any = this.getCollection().findOne(query);
        result = JSON.parse(JSON.stringify(result)); // clone

        let key:PathListKey = new PathListKey();
        key.key = result.id;
        key.name = this.getKeyName();
        result.key = key;
        return result;
    }

    public update(personKey:number, data:any) : boolean {
        let query:any = {};
        query["$loki"] = personKey;
        let person:any = this.getCollection().findOne(query);
        person.firstName = data.firstName;
        person.familyName = data.familyName;
        this.getCollection().update(person);
        return true;
    }

    public delete(personKey:number) {
        let query:any = {};
        query["$loki"] = personKey;
        let person:any = this.getCollection().findOne(query);
        this.getCollection().remove(person);
        return true;
    }


}

export class PathListEntry {
    public key:PathListKey;
    public name:string;
    public color:string;
    public icon:string;
    public url:string;
    public active:boolean = true;
    public details:string[] = [];
}

export class PathListKey {
    public name:string;
    public key:number;
}