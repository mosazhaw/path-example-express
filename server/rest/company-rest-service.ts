import {AbstractRestService, PathListEntry} from "./abstract-rest-service";
import {Database} from "./../database/database";

export class CompanyRestService extends AbstractRestService {

    constructor(app, database: Database) {
        super(app, database);
    }

    protected createPathListEntry(entry: PathListEntry, entity: any): Promise<PathListEntry> {
        entry.name = entity.name;
        entry.details.push(entity.city);
        return super.createPathListEntry(entry, entity);
    }

}