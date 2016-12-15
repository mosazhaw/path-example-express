export abstract class Database {

    protected static _database;

    constructor(private _app) {
        this.createTestData();
    }

    public static initDatabase() {
        var PouchDB = require('pouchdb');
        PouchDB.plugin(require('pouchdb-adapter-memory'));
        this._database = new PouchDB("path-example", {adapter: 'memory'});
    }

    public init() {
        this.initList();
        this.initCreate();
        this.initRead();
        this.initUpdate();
        this.initDelete();
    }

    protected createTestData() {
    }

    protected abstract getEntityName(): string;

    protected createPathListEntry(entry: PathListEntry, entity: any): Promise<PathListEntry> {
        return new Promise((resolve, reject) => {
            resolve(entry);
        });
    }

    protected abstract getSort(): any[];

    protected initList() {
        let service = this;
        this._app.get('/services/' + this.getEntityName() + '', (req, res) => {
            Database._database.allDocs({
                include_docs: true,
                startkey: service.getEntityName(),
                endkey: service.getEntityName() + '\uffff'
            }).then((docs) => {
                let result: PathListEntry[] = [];
                let rows = docs["rows"];

                // sort
                let compare = (a, b) => {
                    for (let sort of service.getSort()) {
                        if (a['doc'][sort] < b['doc'][sort]) {
                            return -1;
                        }
                        else if (a['doc'][sort] > b['doc'][sort]) {
                            return 1;
                        }
                    }
                    return 0;
                }
                rows.sort(compare);

                // create path list
                var promises = [];
                for (let item of rows) {
                    let entry: PathListEntry = new PathListEntry();
                    let key: PathListKey = new PathListKey();
                    key.key = item.id;
                    key.name = service.getEntityName() + "Key";
                    entry.key = key;
                    promises.push(service.createPathListEntry(entry, item["doc"]));
                }
                Promise.all(promises).then(function (values) {
                    for (let entry of values) {
                        result.push(entry);
                    }
                    res.json(result);
                }).catch(function (err) {
                    console.log(err);
                });
            }).catch(function (err) {
                console.log(err);
            });
        });
    }

    protected initCreate() {
        this._app.post('/services/' + this.getEntityName() + '', (req, res) => {
            this.create(req.body, res);
        });
    }

    protected create(data: any, response) {
        data._id = this.getEntityName() + '_' + this.generateUUID();
        Database._database.post(data).then((newDoc) => {
            if (response != null && response["json"] != null) {
                response.json(newDoc);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    protected initRead() {
        this._app.get('/services/' + this.getEntityName() + '/:key', (req, res) => {
            let key: string = req.params.key;
            Database._database.get(key).then((doc) => {
                res.json(doc);
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    protected initUpdate() {
        this._app.put('/services/' + this.getEntityName() + '/:key', (req, res) => {
            let key: string = req.params.key;
            Database._database.get(key).then((doc) => {
                let updatedDoc = req.body;
                updatedDoc._rev = doc._rev;
                updatedDoc._id = doc._id;
                Database._database.put(req.body).then((result) => {
                    res.json(result);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    protected initDelete() {
        this._app.delete('/services/' + this.getEntityName() + '/:key', (req, res) => {
            let key: string = req.params.key;
            Database._database.get(key).then(function (doc) {
                Database._database.remove(doc).then((response) => {
                    res.json({message: 'deleted'});
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    protected generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
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