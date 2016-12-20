import {AbstractRestService} from "./abstract-rest-service";
import {AbstractDatabase} from "../database/abstract-database";

export class CompanyRestService extends AbstractRestService {

    constructor(app, database: AbstractDatabase) {
        super(app, database);
    }

}