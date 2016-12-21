import {AbstractDatabase} from "./abstract-database";
import {PathListEntry} from "../data/path-list-entry";

export class HobbyDatabase extends AbstractDatabase {

    public getEntityName() {
        return "hobby";
    }

    protected getSort(): any[] {
        return ['name'];
    }

    public createPathListEntry(entry: PathListEntry, entity: any) {
        entry.name = entity.name;
        return super.createPathListEntry(entry, entity);
    }

    public async addHobby(personKey, hobbyKey): Promise<any> {
        let key: any = this.toComplexKey(personKey, hobbyKey);
        let rev = this.createRevision(key, null);
        if (await this.hobbyExists(personKey, hobbyKey)) {
            let doc = await AbstractDatabase._database.get(key);
            rev._rev = doc._rev;
        }
        return AbstractDatabase._database.put(rev);
    }

    public async removeHobby(personKey, hobbyKey): Promise<any> {
        let key = this.toComplexKey(personKey, hobbyKey);
        let doc = await AbstractDatabase._database.get(key);
        return AbstractDatabase._database.remove(this.createRevision(key, doc._rev));
    }

    public async hobbyExists(personKey, hobbyKey): Promise<any> {
        let key = this.toComplexKey(personKey, hobbyKey);
        try {
            let exists = await AbstractDatabase._database.get(key);
            return Promise.resolve(true);
        } catch (err) {
            return Promise.resolve(false);
        };
    }

}