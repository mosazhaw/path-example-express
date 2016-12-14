import {Database, PathListEntry} from "./database";

export class HobbyDatabase extends Database {

    protected createTestData(db) {
        db.post({name:'Golf'});
        db.post({name:'Orienteering'});
        db.post({name:'Running'});
        db.post({name:'Ski'});
        db.post({name:'Snowboard'});
    }

    protected getEntityName() {
        return "hobby";
    }

    protected getSort() : any[] {
        return ['name'];
    }

    protected createPathListEntry(entry:PathListEntry, entity:any) {
        entry.name = entity.name;
    }

}