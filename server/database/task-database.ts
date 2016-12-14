import {Database, PathListEntry} from "./database";

export class TaskDatabase extends Database {

    protected createTestData(db) {
        db.post({name:'Meeting'});
        db.post({name:'Prepare dinner'});
        db.post({name:'Shopping'});
    }

    protected getEntityName() {
        return "task";
    }

    protected getSort() : any[] {
        return ['name'];
    }

    protected createPathListEntry(entry:PathListEntry, entity:any) {
        entry.name = entity.name;
    }

}