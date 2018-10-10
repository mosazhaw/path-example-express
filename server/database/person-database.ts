import {AbstractDatabase} from "./abstract-database";
import {PathListEntry} from "../data/path-list-entry";

export class PersonDatabase extends AbstractDatabase {

    public getEntityName() {
        return "person";
    }

    public getSearchAttributes(): any[] {
        return ["familyName", "firstName"];
    }

    protected getSort(): any[] {
        return ["familyName", "firstName"];
    }

    public createPathListEntry(entry: PathListEntry, entity: any): Promise<PathListEntry> {
        entry.name = entity.firstName + " " + entity.familyName;
        if (entity.company != null) {
            return this.read(entity.company).then((doc) => {
                entry.details.push(doc.name);
                return entry;
            }).catch((err) => {
                return entry;
            });
        } else {
            return super.createPathListEntry(entry, entity);
        }
    }

    public async getPersons(taskKey): Promise<any> {
        const persons = await this.list();
        const result: any[] = [];
        for (const person of persons) {
            const key: any = this.toComplexKey(person._id, taskKey);
            console.log(key);
            try {
                const doc = await AbstractDatabase._database.read(key);
                result.push(person);
            } catch (err) {
                console.log("error");
            }
        }
        return result;
    }

}
