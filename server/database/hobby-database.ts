import {Database, PathListEntry} from "./database";

export class HobbyDatabase extends Database {

    protected createTestData() {
        this.create({name:'Golf'});
        this.create({name:'Orienteering'});
        this.create({name:'Running'});
        this.create({name:'Ski'});
        this.create({name:'Snowboard'});
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