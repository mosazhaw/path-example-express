export class Database {

    private _loki = require('lokijs');
    private _db;
    private _person;

    constructor() {
        this._db = new this._loki('PathExample');
        this._person = this._db.addCollection('person');
        this._person.insert({key: 1, firstName:'Adam', familyName: 'Jones'});
        this._person.insert({key: 2, firstName:'Betty', familyName: 'Miller'});
        this._person.insert({key: 3, firstName:'Chris', familyName: 'Connor'});
        this._person.insert({key: 4, firstName:'Dave', familyName: 'Dean'});
    }

    public getPersons() : any {
        let result:PathListEntry[] = [];
        for (let person of this._person.find()) {
            let entry:PathListEntry = new PathListEntry();
            let key:PathListKey = new PathListKey();
            key.key = person.key;
            key.name = "personKey";
            entry.key = key;
            entry.name = person.familyName + ' ' + person.firstName;
            entry.details.push(person.key);
            result.push(entry);
        }
        return result;
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