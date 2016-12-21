import {AbstractRestService} from "./abstract-rest-service";
import {PathListEntry} from "../data/path-list-entry";
import {PathListKey} from "../data/path-list-key";
import {TaskDatabase} from "../database/task-database";

export class TaskRestService extends AbstractRestService {

    constructor(app, private database: TaskDatabase) {
        super(app, database);
    }

    protected initList() {
        super.initList();

        let service = this;
        this._app.get('/services/person/:personKey/task', async (req, res) => {
            let rows = await service.database.getTasks(req.params.personKey);
            let promises = [];
            console.log(rows);
            for (let task of rows) {
                // TODO fetch in one shot
                promises.push(service.database.read(task.taskKey));
            }
            let result = await Promise.all(promises);
            let entries:any[] = [];
            promises = [];
            for (let task of result) {
                let entry = new PathListEntry();
                let key: PathListKey = new PathListKey();
                key.key = task._id;
                key.name = service.database.getEntityName() + "Key";
                entry.key = key;
                entries.push(entry);
                promises.push(service.database.createPathListEntry(entry, task));
            }
            result = await Promise.all(promises);
            res.json(result);
        });

        this._app.get('/services/person/:personKey/task/:taskKey', (req, res) => {
            res.json({ personKey: req.params.personKey, taskKey: req.params.taskKey });
        });
    }

    protected initUpdate() {
        super.initUpdate();

        let service = this;
        this._app.put('/services/person/:personKey/task', async (req, res) => {
            let result = await service.database.addPerson(req.params.personKey, req.body.taskKey);
            res.json(result);
        });
    }

    protected initDelete() {
        super.initDelete();

        let service = this;
        this._app.delete('/services/person/:personKey/task/:taskKey', async (req, res) => {
            let result = await service.database.removePerson(req.params.personKey, req.params.taskKey);
            res.json(result);
        });
    }

}