import {Database, PathListKey, PathListEntry} from "./database";

export class CompanyDatabase extends Database {

    private _collection;

    constructor() {
        super();
        this._collection = this.db.addCollection('company');
        this._collection.insert({name:'Company A', city: 'Winterthur'});
        this._collection.insert({name:'ZHAW', city: 'Winterthur'});
        this._collection.insert({name:'Company B', city: 'Zürich'});
        this._collection.insert({name:'Company C', city: 'Frauenfeld'});
    }

    protected getCollection() : any {
        return this._collection;
    }

    protected getKeyName() : string {
        return "companyKey";
    }

    protected getSort() : any[] {
        return ['name'];
    }

    protected createPathListEntry(entry:PathListEntry, entity:any) {
        entry.name = entity.name;
        entry.details.push(entity.city);
    }

}