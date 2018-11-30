import {AbstractRestService} from "./abstract-rest-service";
import {ProjectDatabase} from "../database/project-database";
import {FileDatabase} from "../database/file-database";

export class FileRestService extends AbstractRestService {

    constructor(app, private database: FileDatabase) {
        super(app, database);
    }

}
