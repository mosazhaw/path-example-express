import {PathListEntry} from "../data/path-list-entry";
import {PathListKey} from "../data/path-list-key";

export abstract class AbstractDatabase {

    protected static _database;

    public static initDatabase() {
        var PouchDB = require('pouchdb');
        PouchDB.plugin(require('pouchdb-adapter-memory'));
        this._database = new PouchDB("path-example", {adapter: 'memory'});
    }

    public abstract getEntityName(): string;

    protected abstract getSort(): any[];

    public list() : Promise<any> {
        let service = this;
        return AbstractDatabase._database.allDocs({
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
            return rows;
        })
    }

    public create(data: any): Promise<any> {
        data._id = this.getEntityName() + '_' + this.generateUUID();
        return AbstractDatabase._database.post(data);
    }

    public read(key: any): Promise<any> {
        return AbstractDatabase._database.get(key);
    }

    public update(key: any, data: string): Promise<any> {
        return AbstractDatabase._database.get(key).then((doc) => {
            let updatedDoc: any = data;
            updatedDoc._rev = doc._rev;
            updatedDoc._id = doc._id;
            return AbstractDatabase._database.put(updatedDoc);
        });
    }

    public delete(key: any): Promise<any> {
        return AbstractDatabase._database.get(key).then(function (doc) {
            return AbstractDatabase._database.remove(doc);
        })
    }

    public createPathList(rows, res) {
        let service = this;
        var promises = [];
        for (let item of rows) {
            let entry: PathListEntry = new PathListEntry();
            let key: PathListKey = new PathListKey();
            key.key = item.id;
            key.name = service.getEntityName() + "Key";
            entry.key = key;
            promises.push(service.createPathListEntry(entry, item["doc"]));
        }
        return Promise.all(promises).then((result) => {
                res.json(result);
            }
        ).catch((err) => {
            console.log(err);
        });
    }

    public createPathListEntry(entry: PathListEntry, entity: any): Promise<PathListEntry> {
        return new Promise((resolve, reject) => {
            resolve(entry);
        });
    }

    private generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

}