import {Database, PathListEntry} from "./database";

export class HobbyDatabase extends Database {

    protected createTestData() {
        this.create({name:'Golf'}, null);
        this.create({name:'Orienteering'}, null);
        this.create({name:'Running'}, null);
        this.create({name:'Ski'}, null);
        this.create({name:'Snowboard'}, null);
    }

    protected getEntityName() {
        return "hobby";
    }

    protected getSort() : any[] {
        return ['name'];
    }

    protected createPathListEntry(entry:PathListEntry, entity:any) {
        entry.name = entity.name;
        return super.createPathListEntry(entry, entity);
    }

}