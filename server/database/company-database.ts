import {Database} from "./database";
import {PathListEntry} from "./abstract-rest-service";

export class CompanyDatabase extends Database {

    public getEntityName() {
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