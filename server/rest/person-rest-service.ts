import {AbstractRestService} from "./abstract-rest-service";
import {AbstractDatabase} from "../database/abstract-database";
import {HobbyDatabase} from "../database/hobby-database";
import {PathListEntry} from "../data/path-list-entry";
import {PathListKey} from "../data/path-list-key";

export class PersonRestService extends AbstractRestService {

    constructor(app, database: AbstractDatabase, private hobbyDatabase: HobbyDatabase) {
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
                service._database.createPathList(filteredRows, res);
            }).catch((err) => {
                console.log(err);
            })
        });

        this._app.get('/services/person/:personKey/hobby', (req, res) => {
            service.hobbyDatabase.list().then((rows) => {
                rows.pop();
                var promises = [];
                for (let hobby of rows) {
                    // TODO create generic method
                    let entry = new PathListEntry();
                    let key: PathListKey = new PathListKey();
                    key.key = hobby.id;
                    key.name = service.hobbyDatabase.getEntityName() + "Key";
                    entry.key = key;
                    promises.push(service.hobbyDatabase.createPathListEntry(entry, hobby["doc"]));
                }
                Promise.all(promises).then((result) => {
                    res.json(result);
                }).catch((err) => {
                    console.log(err);
                })
            }).catch((err) => {
                console.log(err);
            })
        });
    }

}