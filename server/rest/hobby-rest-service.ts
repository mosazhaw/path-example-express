import {AbstractRestService, PathListEntry} from "./abstract-rest-service";
import {AbstractDatabase} from "../database/abstract-database";

export class HobbyRestService extends AbstractRestService {

    constructor(app, database: AbstractDatabase) {
        super(app, database);
    }

    protected createPathListEntry(entry:PathListEntry, entity:any) {
        entry.name = entity.name;
        return super.createPathListEntry(entry, entity);
    }

}