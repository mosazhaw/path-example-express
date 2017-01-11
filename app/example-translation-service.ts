import {Injectable} from "@angular/core";
import {TranslationService} from "path-framework/app/path-framework/service/translation.service"

@Injectable()
export class ExampleTranslationService extends TranslationService {

    protected getTranslation(key:string) : string {
        let myTranslations = this.createTranslationMap(this.getExampleTranslations());
        // prefer custom translations
        if (myTranslations.get(key) == null) {
            return super.getTranslation(key);
        }
        return myTranslations.get(key);
    }

    private getExampleTranslations() {
        let languageCode: string = this.getUserLanguage();

        // put additional application translations here
        if (languageCode == "de") {
            return {
                "AddTask": "Task hinzufügen",
                "Birthday": "Geburtstag",
                "City": "Ort",
                "Contacts": "Freunde",
                "Company": "Firma",
                "CompanyName": "Firma Name",
                "Companies": "Firmen",
                "Comments": "Kommentar",
                "EditCompany": "Firma bearbeiten",
                "EditPerson": "Person bearbeiten",
                "EndDate": "Enddatum",
                "FamilyName": "Nachname",
                "FirstName": "Vorname",
                "Hobbies": "Hobbys",
                "Hobby": "Hobby",
                "HobbyName": "Hobby Name",
                "NewCompany": "Neue Firma",
                "NewHobby": "Neues Hobby",
                "NewPerson": "Neue Person",
                "NewProject": "Neues Projekt",
                "NewTask": "Neue Aufgabe",
                "Person": "Person",
                "Project": "Projekt",
                "Projects": "Projekte",
                "ProjectName": "Projekt Name",
                "StartDate": "Startdatum",
                "Tasks": "Aufgaben",
                "Task": "Aufgabe",
                "TaskName": "Aufgabe Name",
                "User": "Benutzer"
            }
        } else {
            return {
                "AddTask": "Add Task",
                "Birthday": "Birthday",
                "City": "City",
                "Contacts": "Contacts",
                "Company": "Company",
                "CompanyName": "Company Name",
                "Companies": "Companies",
                "Comments": "Comments",
                "EditCompany": "Edit Company",
                "EditPerson": "Edit Person",
                "EndDate": "End date",
                "FamilyName": "Family name",
                "FirstName": "First name",
                "Hobbies": "Hobbies",
                "Hobby": "Hobby",
                "HobbyName": "Hobby Name",
                "NewCompany": "New Company",
                "NewHobby": "New Hobby",
                "NewPerson": "New Person",
                "NewProject": "New Project",
                "NewTask": "New Task",
                "Person": "Person",
                "Project": "Project",
                "Projects": "Projects",
                "ProjectName": "Project Name",
                "StartDate": "Start date",
                "Tasks": "Tasks",
                "Task": "Task",
                "TaskName": "Task Name",
                "User": "User"
            };
        }
    }

}