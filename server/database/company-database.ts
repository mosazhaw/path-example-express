import {AbstractDatabase} from "./abstract-database";

export class CompanyDatabase extends AbstractDatabase {

    public getEntityName() {
        return "company";
    }

    protected getSort(): any[] {
        return ['name'];
    }

}