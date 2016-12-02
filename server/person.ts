import {Database, PathListKey, PathListEntry} from "./database";

export class Person extends Database {

    private _person;

    constructor() {
        super();
        this._person = this.db.addCollection('person');
        this._person.insert({firstName:'Adam', familyName: 'Jones'});
        this._person.insert({firstName:'Betty', familyName: 'Miller'});
        this._person.insert({firstName:'Chris', familyName: 'Connor'});
        this._person.insert({firstName:'Dave', familyName: 'Dean'});
    }

    protected getCollection() : any {
        return this._person;
    }

    protected getKeyName() : string {
        return "personKey";
    }

    protected createPathListEntry(entry:PathListEntry, entity:any) {
        entry.name = entity.familyName + ' ' + entity.firstName;
        entry.details.push('' + entry.key.key); // must be string
    }

}