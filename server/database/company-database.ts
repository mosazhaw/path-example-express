import {Database} from "./database";
import {PathListEntry} from "./../rest/abstract-rest-service";

export class CompanyDatabase extends Database {

    public getEntityName() {
        return "company";
    }

    protected getSort(): any[] {
        return ['name'];
    }

}