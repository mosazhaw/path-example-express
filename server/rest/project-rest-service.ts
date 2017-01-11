import {AbstractRestService} from "./abstract-rest-service";
import {PathListKey} from "../data/path-list-key";
import {PathListEntry} from "../data/path-list-entry";
import {HobbyDatabase} from "../database/hobby-database";
import {ProjectDatabase} from "../database/project-database";

export class ProjectRestService extends AbstractRestService {

    constructor(app, private database: ProjectDatabase) {
        super(app, database);
    }

}