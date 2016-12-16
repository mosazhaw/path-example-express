import {AbstractDatabase} from "./abstract-database";
import {PathListEntry} from "./../rest/abstract-rest-service";

export class TaskDatabase extends AbstractDatabase {

    public getEntityName() {
        return "task";
    }

    protected getSort() : any[] {
        return ['name'];
    }

}