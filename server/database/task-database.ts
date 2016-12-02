import {Database, PathListEntry} from "./database";

export class TaskDatabase extends Database {

    private _collection;

    constructor() {
        super();
        this._collection = this.db.addCollection('task');
        this._collection.insert({name:'Prepare dinner'});
        this._collection.insert({name:'Meeting'});
        this._collection.insert({name:'Shopping'});
    }

    protected getCollection() : any {
        return this._collection;
    }

    protected getKeyName() : string {
        return "taskKey";
    }

    protected getSort() : any[] {
        return ['name'];
    }

    protected createPathListEntry(entry:PathListEntry, entity:any) {
        entry.name = entity.name;
        entry.details.push('' + entry.key.key); // must be string
    }

}