import {Database, PathListEntry} from "./database";

export class PersonDatabase extends Database {

    protected createTestData(db) {
        db.post({firstName:'Adam', familyName: 'Jones'});
        db.post({firstName:'Betty', familyName: 'Miller'});
        db.post({firstName:'Chris', familyName: 'Connor'});
        db.post({firstName:'Dave', familyName: 'Dean'});
    }

    protected getEntityName() {
        return "person";
    }

    protected getSort() : any[] {
        return ['name'];
    }

    protected createPathListEntry(entry:PathListEntry, entity:any) {
        entry.name = entity.firstName + ' ' + entity.familyName;
    }

}