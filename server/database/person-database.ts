import {AbstractDatabase} from "./abstract-database";

export class PersonDatabase extends AbstractDatabase {

    public getEntityName() {
        return "person";
    }

    protected getSort() : any[] {
        return ['familyName', 'firstName'];
    }

}