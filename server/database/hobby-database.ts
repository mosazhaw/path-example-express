import {AbstractDatabase} from "./abstract-database";
import {PathListEntry} from "./../rest/abstract-rest-service";

export class HobbyDatabase extends AbstractDatabase {

    public getEntityName() {
        return "hobby";
    }

    protected getSort() : any[] {
        return ['name'];
    }

}