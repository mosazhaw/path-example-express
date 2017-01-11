import {AbstractDatabase} from "./abstract-database";
import {PathListEntry} from "../data/path-list-entry";

export class PersonDatabase extends AbstractDatabase {

    public getEntityName() {
        return "person";
    }

    protected getSort() : any[] {
        return ['familyName', 'firstName'];
    }

    public createPathListEntry(entry:PathListEntry, entity:any) : Promise<PathListEntry> {
        entry.name = entity.firstName + ' ' + entity.familyName;
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

    public async getPersons(taskKey): Promise<any> {
        let persons = await this.list();
        let result:any[] = [];
        for (let person of persons) {
            let key:any = this.toComplexKey(person._id, taskKey);
            console.log(key);
            try {
                let doc = await AbstractDatabase._database.read(key);
                result.push(person);
            } catch (err) {
                console.log('error')
            }
        }
        return result;
    }

}