import {AbstractDatabase} from "../database/abstract-database";

export abstract class AbstractRestService {

    constructor(protected _app, protected _database: AbstractDatabase) {
    }

    public init() {
        this.initList();
        this.initCreate();
        this.initRead();
        this.initUpdate();
        this.initDelete();
    }

    private initList() {
        let service = this;
        this._app.get('/services/' + service._database.getEntityName() + '', (req, res) => {
            service._database.list().then((rows) => {
                // create path list
                var promises = [];
                for (let item of rows) {
                    let entry: PathListEntry = new PathListEntry();
                    let key: PathListKey = new PathListKey();
                    key.key = item.id;
                    key.name = service._database.getEntityName() + "Key";
                    entry.key = key;
                    promises.push(service.createPathListEntry(entry, item["doc"]));
                }
                return Promise.all(promises).then((result) => {
                        res.json(result);
                    }
                ).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            })
        });
    }

    protected createPathListEntry(entry: PathListEntry, entity: any): Promise<PathListEntry> {
        return new Promise((resolve, reject) => {
            resolve(entry);
        });
    }

    private initCreate() {
        this._app.post('/services/' + this._database.getEntityName() + '', (req, res) => {
            this._database.create(req.body).then((newDoc) => {
                res.json(newDoc);
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    private initRead() {
        this._app.get('/services/' + this._database.getEntityName() + '/:key', (req, res) => {
            let key: string = req.params.key;
            this._database.read(key).then((doc) => {
                res.json(doc);
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    private initUpdate() {
        this._app.put('/services/' + this._database.getEntityName() + '/:key', (req, res) => {
            let key: string = req.params.key;
            this._database.update(key, req.body).then((doc) => {
                res.json(doc);
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    private initDelete() {
        this._app.delete('/services/' + this._database.getEntityName() + '/:key', (req, res) => {
            let key: string = req.params.key;
            this._database.delete(key).then((doc) => {
                res.json({message: 'deleted'});
            }).catch((err) => {
                console.log(err);
            });
        });
    }
}

export class PathListEntry {
    public key: PathListKey;
    public name: string;
    public color: string;
    public icon: string;
    public url: string;
    public active: boolean = true;
    public details: string[] = [];
}

export class PathListKey {
    public name: string;
    public key: number;
}