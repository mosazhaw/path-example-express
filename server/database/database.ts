export abstract class Database {

    private _database;

    constructor(private _app) {
        // create entity database
        var PouchDB = require('pouchdb');
        PouchDB.plugin(require('pouchdb-adapter-memory'));
        this._database = new PouchDB(this.getEntityName(), {adapter: 'memory'});
        this.createTestData(this._database);
    }

    public init() {
        this.initList();
        this.initCreate();
        this.initRead();
        this.initUpdate();
        this.initDelete();
    }

    protected createTestData(db) {
    }

    protected abstract getEntityName() : string;

    protected abstract createPathListEntry(entry:PathListEntry, entity:any);

    protected abstract getSort() : any[];

    protected initList()  {
        let service = this;
        this._app.get('/services/'+this.getEntityName()+'', (req, res) => {
            service._database.query((doc, emit) => {
                let emitString:string = '';
                for (let sort of service.getSort()) {
                    emitString += doc[sort];
                }
                emit(emitString);
            }, {include_docs: true}).then((docs) => {
                let result:PathListEntry[] = [];
                for (let item of docs["rows"]) {
                    let entry:PathListEntry = new PathListEntry();
                    let key:PathListKey = new PathListKey();
                    key.key = item.id;
                    key.name = service.getEntityName() + "Key";
                    entry.key = key;
                    service.createPathListEntry(entry, item["doc"]);
                    result.push(entry);
                }
                res.json(result);
            }).catch(function (err) {
                console.log(err);
            });
        });
    }

    protected initCreate() {
        let service = this;
        this._app.post('/services/'+this.getEntityName()+'', (req, res) => {
            let key:string = req.params.key;
            service._database.post(req.body).then((newDoc) => {
                res.json(newDoc);
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    protected initRead() {
        let service = this;
        this._app.get('/services/'+this.getEntityName()+'/:key', (req, res) => {
            let key:string = req.params.key;
            service._database.get(key).then((doc) => {
                res.json(doc);
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    protected initUpdate() {
        let service = this;
        this._app.put('/services/'+this.getEntityName()+'/:key', (req, res) => {
            let key:string = req.params.key;
            service._database.get(key).then((doc) => {
                let updatedDoc = req.body;
                updatedDoc._rev = doc._rev;
                updatedDoc._id = doc._id;
                service._database.put(req.body).then((result) => {
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
        let service = this;
        this._app.delete('/services/'+this.getEntityName()+'/:key', (req, res) => {
            let key:string = req.params.key;
            service._database.get(key).then(function(doc) {
                service._database.remove(doc).then((response) => {
                    res.json({message: 'deleted'});
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

}

export class PathListEntry {
    public key:PathListKey;
    public name:string;
    public color:string;
    public icon:string;
    public url:string;
    public active:boolean = true;
    public details:string[] = [];
}

export class PathListKey {
    public name:string;
    public key:number;
}