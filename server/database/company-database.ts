import {AbstractDatabase} from "./abstract-database";
import {PathListEntry} from "./../rest/abstract-rest-service";

export class CompanyDatabase extends AbstractDatabase {

    public getEntityName() {
        return "company";
    }

    protected getSort(): any[] {
        return ['name'];
    }

}