import {Database} from "./database";
import {PathListEntry} from "./../rest/abstract-rest-service";

export class PersonDatabase extends Database {

    public getEntityName() {
        return "person";
    }

    protected getSort() : any[] {
        return ['familyName', 'firstName'];
    }

}