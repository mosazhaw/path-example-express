import {Database, PathListEntry} from "./database";

export class CompanyDatabase extends Database {

    protected getEntityName() {
        return "company";
    }

    protected getSort(): any[] {
        return ['name'];
    }

    protected createPathListEntry(entry: PathListEntry, entity: any): Promise<PathListEntry> {
        entry.name = entity.name;
        entry.details.push(entity.city);
        return super.createPathListEntry(entry, entity);
    }

}