import {AbstractRestService} from "./abstract-rest-service";
import {AbstractDatabase} from "../database/abstract-database";

export class HobbyRestService extends AbstractRestService {

    constructor(app, database: AbstractDatabase) {
        super(app, database);
    }

}