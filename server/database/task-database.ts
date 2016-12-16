import {Database} from "./database";
import {PathListEntry} from "./../rest/abstract-rest-service";

export class TaskDatabase extends Database {

    public getEntityName() {
        return "task";
    }

    protected getSort() : any[] {
        return ['name'];
    }

}