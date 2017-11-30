import {AbstractRestService} from "./abstract-rest-service";
import {AbstractDatabase} from "../database/abstract-database";
import {CompanyDatabase} from "../database/company-database";
import {PathListEntry} from "../data/path-list-entry";
import {PathListKey} from "../data/path-list-key";

export class CompanyRestService extends AbstractRestService {

    constructor(app, private database: CompanyDatabase) {
        super(app, database);
    }

    protected initList() {
        super.initList();

        let service = this;
        this._app.get('/services/company/link', async (req, res) => {
            let rows = await service.database.list();

            let entries:any[] = [];
            let promises = [];
            for (let company of rows) {
                let entry = new PathListEntry();
                let key: PathListKey = new PathListKey();
                key.key = company._id;
                key.name = service.database.getEntityName() + "Key";
                entry.key = key;
                entry.url = "http://www.google.com/search?q=" + company.name;
                entry.color = this.getRandomElement(["wisteria", "orange"]);
                entry.icon = this.getRandomElement(["fa-globe", "fa-link"]);
                entry.type = "linkButton";
                entries.push(entry);
                promises.push(service.database.createPathListEntry(entry, company));
            }
            let result = await Promise.all(promises);
            res.json(result);
        });
    }

    private getRandomElement(array:string[]) : string {
        return array[Math.floor(Math.random() * array.length)];
    }

}