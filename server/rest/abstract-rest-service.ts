import {Database} from "./../database/database";

export abstract class AbstractRestService {

    constructor(protected _app, protected _database:Database) {
    }

    public init() {
        this.initList();
        this.initCreate();
        this.initRead();
        this.initUpdate();
        this.initDelete();
    }

    protected initList() {
        let service = this;
        this._app.get('/services/' + this._database.getEntityName() + '', (req, res) => {
            this._database.list().then((result) => {
                res.json(result);
            }).catch((err) => {
                console.log(err);
            })
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