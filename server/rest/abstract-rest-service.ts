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

    protected initList() {
        let service = this;
        this._app.get('/services/' + service._database.getEntityName() + '', (req, res) => {
            service._database.list().then((rows) => {
                this._database.createPathList(rows, res);
            }).catch((err) => {
                console.log(err);
            })
        });
    }

    protected initCreate() {
        this._app.post('/services/' + this._database.getEntityName() + '', (req, res) => {
            this._database.create(req.body).then((newDoc) => {
                res.json(newDoc);
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    protected initRead() {
        this._app.get('/services/' + this._database.getEntityName() + '/:key', (req, res) => {
            let key: string = req.params.key;
            this._database.read(key).then((doc) => {
                res.json(doc);
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    protected initUpdate() {
        this._app.put('/services/' + this._database.getEntityName() + '/:key', (req, res) => {
            let key: string = req.params.key;
            this._database.update(key, req.body).then((doc) => {
                res.json(doc);
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    protected initDelete() {
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