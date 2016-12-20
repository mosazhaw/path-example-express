import {AbstractDatabase} from "./abstract-database";
import {PathListEntry} from "../data/path-list-entry";

export class CompanyDatabase extends AbstractDatabase {

    public getEntityName() {
        return "company";
    }

    protected getSort(): any[] {
        return ['name'];
    }

    public createPathListEntry(entry: PathListEntry, entity: any): Promise<PathListEntry> {
        entry.name = entity.name;
        entry.details.push(entity.city);
        return super.createPathListEntry(entry, entity);
    }

}