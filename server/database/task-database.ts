import {AbstractDatabase} from "./abstract-database";
import {PathListEntry} from "../data/path-list-entry";

export class TaskDatabase extends AbstractDatabase {

    public getEntityName() {
        return "task";
    }

    protected getSort() : any[] {
        return ['name'];
    }

    public createPathListEntry(entry: PathListEntry, entity: any) {
        entry.name = entity.name;
        if (entity.project != null) {
            return this.read(entity.project).then((doc) => {
                entry.details.push(doc.name);
                return entry;
            }).catch((err) => {
                return entry;
            })
        } else {
            return super.createPathListEntry(entry, entity);
        }
    }

    public async getTasks(personKey): Promise<any> {
        let key = this.toComplexKey(personKey);
        let tasks = await AbstractDatabase._database.allDocs(key);
        let result:any[] = [];
        for (let task of tasks) {
            let item:any = {};
            item.personKey = personKey;
            item.taskKey = task.taskKey;
            result.push(item);
        }
        return result;
    }

    public async addPerson(personKey, taskKey): Promise<any> {
        let key: any = this.toComplexKey(personKey, taskKey);
        return AbstractDatabase._database.update(key, { personKey: personKey, taskKey: taskKey });
    }

    public async removePerson(personKey, taskKey): Promise<any> {
        let key = this.toComplexKey(personKey, taskKey);
        return AbstractDatabase._database.delete(key);
    }

}