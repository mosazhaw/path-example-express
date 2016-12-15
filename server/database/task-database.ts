import {Database, PathListEntry} from "./database";

export class TaskDatabase extends Database {

    protected createTestData() {
        this.create({name:'Meeting'}, null);
        this.create({name:'Prepare dinner'}, null);
        this.create({name:'Shopping'}, null);
    }

    protected getEntityName() {
        return "task";
    }

    protected getSort() : any[] {
        return ['name'];
    }

    protected createPathListEntry(entry:PathListEntry, entity:any) {
        entry.name = entity.name;
        return super.createPathListEntry(entry, entity);
    }

}