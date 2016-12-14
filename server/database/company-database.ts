import {Database, PathListEntry} from "./database";

export class CompanyDatabase extends Database {

    protected createTestData(db) {
        db.post({name:'Company A', city: 'Winterthur'});
        db.post({name:'ZHAW', city: 'Winterthur'});
        db.post({name:'Company B', city: 'Zürich'});
        db.post({name:'Company C', city: 'Frauenfeld'});
    }

    protected getEntityName() {
        return "company";
    }

    protected getSort() : any[] {
        return ['name'];
    }

    protected createPathListEntry(entry:PathListEntry, entity:any) {
        entry.name = entity.name;
        entry.details.push(entity.city);
    }

}