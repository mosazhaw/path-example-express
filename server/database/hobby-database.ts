import {Database} from "./database";
import {PathListEntry} from "./../rest/abstract-rest-service";

export class HobbyDatabase extends Database {

    public getEntityName() {
        return "hobby";
    }

    protected getSort() : any[] {
        return ['name'];
    }

}