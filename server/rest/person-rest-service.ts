import {AbstractRestService} from "./abstract-rest-service";
import {PersonDatabase} from "../database/person-database";
import {TaskDatabase} from "../database/task-database";

export class PersonRestService extends AbstractRestService {

    constructor(app, private database: PersonDatabase) {
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
                    if (row.company == req.params.companyKey) {
                        filteredRows.push(row);
                    }
                }
                service._database.createPathList(filteredRows, res);
            }).catch((err) => {
                console.log(err);
            })
        });

        this._app.get('/services/task/:taskKey/person', (req, res) => {
            let taskKey = req.params.taskKey;
            service.database.getPersons(taskKey).then((rows) => {
                service._database.createPathList(rows, res);
            }).catch((err) => {
                console.log(err);
            })
        });
    }

}