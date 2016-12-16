import {PersonDatabase} from "./person-database";
import {CompanyDatabase} from "./company-database";
import {TaskDatabase} from "./task-database";
import {HobbyDatabase} from "./hobby-database";

export class TestData {

    public static init() {
        let personDatabase = new PersonDatabase();
        let companyDatabase = new CompanyDatabase();
        let taskDatabase = new TaskDatabase();
        let hobbyDatabase = new HobbyDatabase();

        let promises = [];
        promises.push(companyDatabase.create({name: 'Company A', city: 'Winterthur'}));
        promises.push(companyDatabase.create({name: 'ZHAW', city: 'Winterthur'}));
        promises.push(companyDatabase.create({name: 'Company B', city: 'Zürich'}));
        promises.push(companyDatabase.create({name: 'Company C', city: 'Frauenfeld'}));
        Promise.all(promises).then((companies) => {
                personDatabase.create({firstName: 'Adam', familyName: 'Jones', company: companies[0].id});
                personDatabase.create({firstName: 'Betty', familyName: 'Miller', company: companies[2].id});
                personDatabase.create({firstName: 'Chris', familyName: 'Connor', company: companies[3].id});
                personDatabase.create({firstName: 'Dave', familyName: 'Dean', company: companies[3].id});
            }
        ).catch((err) => {
                console.log(err);
            }
        );

        hobbyDatabase.create({name: 'Golf'});
        hobbyDatabase.create({name: 'Orienteering'});
        hobbyDatabase.create({name: 'Running'});
        hobbyDatabase.create({name: 'Ski'});
        hobbyDatabase.create({name: 'Snowboard'});

        taskDatabase.create({name: 'Meeting'});
        taskDatabase.create({name: 'Prepare dinner'});
        taskDatabase.create({name: 'Shopping'});
    }

}