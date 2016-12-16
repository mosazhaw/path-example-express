import {AbstractRestService, PathListEntry} from "./abstract-rest-service";
import {Database} from "./../database/database";

export class PersonRestService extends AbstractRestService {

    constructor(app, database: Database) {
        super(app, database);
    }

    protected createPathListEntry(entry:PathListEntry, entity:any) : Promise<PathListEntry> {
        entry.name = entity.firstName + ' ' + entity.familyName;
        if (entity.company != null) {
            return this._database.read(entity.company).then((doc) => {
                entry.details.push(doc.name);
                return entry;
            }).catch((err) => {
                return entry;
            })
        } else {
            return super.createPathListEntry(entry, entity);
        }
    }

}