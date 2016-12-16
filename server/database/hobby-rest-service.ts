import {AbstractRestService} from "./abstract-rest-service";
import {Database} from "./database";

export class HobbyRestService extends AbstractRestService {

    constructor(app, database: Database) {
        super(app, database);
    }

}