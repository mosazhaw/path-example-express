import {AbstractRestService, PathListEntry, PathListKey} from "./abstract-rest-service";
import {AbstractDatabase} from "../database/abstract-database";

export class PersonRestService extends AbstractRestService {

    constructor(app, database: AbstractDatabase) {
        super(app, database);
    }

    protected initList() {
        super.initList();

        let service = this;
        this._app.get('/services/company/:companyKey/person', (req, res) => {
            service._database.list().then((rows) => {
                // filter relations
                let filteredRows = [];
                for (let row of rows) {
                    if (row["doc"].company == req.params.companyKey) {
                        filteredRows.push(row);
                    }
                }
                service.createPathList(filteredRows, res);
            }).catch((err) => {
                console.log(err);
            })
        });
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