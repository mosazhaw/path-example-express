import {AbstractRestService, PathListEntry} from "./abstract-rest-service";
import {AbstractDatabase} from "../database/abstract-database";

export class CompanyRestService extends AbstractRestService {

    constructor(app, database: AbstractDatabase) {
        super(app, database);
    }

    protected createPathListEntry(entry: PathListEntry, entity: any): Promise<PathListEntry> {
        entry.name = entity.name;
        entry.details.push(entity.city);
        return super.createPathListEntry(entry, entity);
    }

}