import {Database, PathListEntry} from "./database";

export class PersonDatabase extends Database {

    private _person;

    constructor() {
        super();
        this._person = this.db.addCollection('person');
        this._person.insert({firstName:'Adam', familyName: 'Jones', evtBirth: '2013-12-14T00:00:00.000Z'});
        this._person.insert({firstName:'Betty', familyName: 'Miller', evtBirth: '2012-12-14T00:00:00.000Z'});
        this._person.insert({firstName:'Chris', familyName: 'Connor', evtBirth: '1999-05-14T00:00:00.000Z'});
        this._person.insert({firstName:'Dave', familyName: 'Dean', evtBirth: '1992-11-14T00:00:00.000Z'});
    }

    protected getCollection() : any {
        return this._person;
    }

    protected getKeyName() : string {
        return "personKey";
    }

    protected getSort() : any[] {
        return ['firstName', 'lastName'];
    }

    protected createPathListEntry(entry:PathListEntry, entity:any) {
        entry.name = entity.familyName + ' ' + entity.firstName;
        entry.details.push('' + entry.key.key); // must be string
    }

}