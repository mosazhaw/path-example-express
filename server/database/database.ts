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

    protected abstract getSort() : any[];

    public list() : PathListEntry[] {
        let result:PathListEntry[] = [];
        for (let entity of this.getCollection().chain().find().compoundsort(this.getSort()).data()) {
            let entry:PathListEntry = new PathListEntry();
            let key:PathListKey = new PathListKey();
            key.key = entity['$loki'];
            key.name = this.getKeyName();
            entry.key = key;
            this.createPathListEntry(entry, entity);
            result.push(entry);
        }
        return result;
    }

    public create(data:any) : boolean {
        this.getCollection().insert(data);
        return true;
    }

    public read(key:number) : any {
        let query:any = {};
        query["$loki"] = key;
        let result:any = this.getCollection().findOne(query);
        result = JSON.parse(JSON.stringify(result)); // clone

        let pathKey:PathListKey = new PathListKey();
        pathKey.key = result.id;
        pathKey.name = this.getKeyName();
        result.key = pathKey;
        return result;
    }

    public update(key:number, data:any) : boolean {
        let query:any = {};
        query["$loki"] = key;
        let entity:any = this.getCollection().findOne(query);
        for (var element in data) {
            if (data.hasOwnProperty(element)) {
                entity[element] = data[element];
            }
        }
        this.getCollection().update(entity);
        return true;
    }

    public delete(key:number) {
        let query:any = {};
        query["$loki"] = key;
        let entity:any = this.getCollection().findOne(query);
        this.getCollection().remove(entity);
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