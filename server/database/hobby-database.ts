import {Database, PathListKey, PathListEntry} from "./database";

export class HobbyDatabase extends Database {

    private _collection;

    constructor() {
        super();
        this._collection = this.db.addCollection('hobby');
        this._collection.insert({name:'Golf'});
        this._collection.insert({name:'Snowboard'});
        this._collection.insert({name:'Ski'});
        this._collection.insert({name:'Running'});
        this._collection.insert({name:'Orienteering'});
    }

    protected getCollection() : any {
        return this._collection;
    }

    protected getKeyName() : string {
        return "personKey";
    }

    protected getSort() : any[] {
        return ['name'];
    }

    protected createPathListEntry(entry:PathListEntry, entity:any) {
        entry.name = entity.name;
        entry.details.push('' + entry.key.key); // must be string
    }

}