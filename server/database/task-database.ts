import {Database, PathListEntry} from "./database";

export class TaskDatabase extends Database {

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