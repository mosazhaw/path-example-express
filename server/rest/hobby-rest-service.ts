import {AbstractRestService} from "./abstract-rest-service";
import {PathListKey} from "../data/path-list-key";
import {PathListEntry} from "../data/path-list-entry";
import {HobbyDatabase} from "../database/hobby-database";

export class HobbyRestService extends AbstractRestService {

    constructor(app, private database: HobbyDatabase) {
        super(app, database);
    }

    protected initList() {
        super.initList();

        let service = this;
        this._app.get('/services/person/:personKey/hobby', async (req, res) => {
            let rows = await service.database.list();
            var promises = [];
            for (let hobby of rows) {
                // TODO create generic method
                let entry = new PathListEntry();
                let key: PathListKey = new PathListKey();
                key.key = hobby._id;
                key.name = service.database.getEntityName() + "Key";
                let hobbyExists = await service.database.hobbyExists(req.params.personKey, hobby._id);
                if (hobbyExists) {
                    entry.color = 'carrot';
                } else {
                    entry.color = 'concrete';
                }
                entry.key = key;
                entry.url = '/person/:personKey/hobby/:hobbyKey';
                promises.push(service.database.createPathListEntry(entry, hobby));
            }
            let result = await Promise.all(promises);
            res.json(result);
        });
    }

    protected initRead() {
        super.initRead();

        let service = this;
        this._app.get('/services/person/:personKey/hobby/:hobbyKey', async (req, res) => {
            let hobbyExists:boolean = await service.database.hobbyExists(req.params.personKey, req.params.hobbyKey);
            if (hobbyExists) {
                await service.database.removeHobby(req.params.personKey, req.params.hobbyKey);
            } else {
                await service.database.addHobby(req.params.personKey, req.params.hobbyKey);
            }
            res.json({});
        });
    }

}