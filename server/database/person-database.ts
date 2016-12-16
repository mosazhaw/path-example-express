import {AbstractDatabase} from "./abstract-database";
import {PathListEntry} from "./../rest/abstract-rest-service";

export class PersonDatabase extends AbstractDatabase {

    public getEntityName() {
        return "person";
    }

    protected getSort() : any[] {
        return ['familyName', 'firstName'];
    }

}