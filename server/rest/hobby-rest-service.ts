import {AbstractRestService, PathListEntry} from "./abstract-rest-service";
import {Database} from "./../database/database";

export class HobbyRestService extends AbstractRestService {

    constructor(app, database: Database) {
        super(app, database);
    }

    protected createPathListEntry(entry:PathListEntry, entity:any) {
        entry.name = entity.name;
        return super.createPathListEntry(entry, entity);
    }

}