import {AbstractDatabase} from "./abstract-database";
import {PathListEntry} from "../data/path-list-entry";

export class HobbyDatabase extends AbstractDatabase {

    public getEntityName() {
        return "hobby";
    }

    protected getSort(): any[] {
        return ['name'];
    }

    public createPathListEntry(entry:PathListEntry, entity:any) {
        for (let item of entity.name) {
            if (item[0]["key"] == "en") {
                entry.name = item[1];
                break;
            }
        }
        return super.createPathListEntry(entry, entity);
    }

    public async addHobby(personKey, hobbyKey): Promise<any> {
        let key: any = this.toComplexKey(personKey, hobbyKey);
        return AbstractDatabase._database.update(key, {});
    }

    public async removeHobby(personKey, hobbyKey): Promise<any> {
        let key = this.toComplexKey(personKey, hobbyKey);
        return AbstractDatabase._database.delete(key);
    }

    public async hobbyExists(personKey, hobbyKey): Promise<any> {
        let key = this.toComplexKey(personKey, hobbyKey);
        try {
            let exists = await AbstractDatabase._database.read(key);
            return Promise.resolve(true);
        } catch (err) {
            return Promise.resolve(false);
        };
    }

}