import {AbstractDatabase} from "./abstract-database";

export class HobbyDatabase extends AbstractDatabase {

    public getEntityName() {
        return "hobby";
    }

    protected getSort() : any[] {
        return ['name'];
    }

}