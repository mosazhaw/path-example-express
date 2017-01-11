import {AbstractDatabase} from "./abstract-database";
import {PathListEntry} from "../data/path-list-entry";

export class ProjectDatabase extends AbstractDatabase {

    public getEntityName() {
        return "project";
    }

    protected getSort() : any[] {
        return ['name'];
    }

    public createPathListEntry(entry: PathListEntry, entity: any) {
        entry.name = entity.name;
        if (entity.company != null) {
            return this.read(entity.company).then((doc) => {
                entry.details.push(doc.name);
                return entry;
            }).catch((err) => {
                return entry;
            })
        } else {
            return super.createPathListEntry(entry, entity);
        }
    }

}