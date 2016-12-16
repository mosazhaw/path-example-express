import {AbstractRestService} from "./abstract-rest-service";
import {Database} from "./../database/database";

export class TaskRestService extends AbstractRestService {

    constructor(app, database: Database) {
        super(app, database);
    }

}