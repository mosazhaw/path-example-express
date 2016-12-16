import {AbstractDatabase} from "./abstract-database";

export class TaskDatabase extends AbstractDatabase {

    public getEntityName() {
        return "task";
    }

    protected getSort() : any[] {
        return ['name'];
    }

}