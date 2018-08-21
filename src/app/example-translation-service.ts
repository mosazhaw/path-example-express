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
                "ButtonWidth": "Button Breite",
                "City": "Ort",
                "Contacts": "Freunde",
                "Company": "Firma",
                "CompanyName": "Firma Name",
                "Companies": "Firmen",
                "Comments": "Kommentar",
                "CustomComponents": "Eigene Komponenten",
                "CustomComponentTooltip": "Benutze deine eigenen Angular Komponenten mit dem Path GUI-Modell",
                "DynamicComponents": "Dynamische Komponenten",
                "DynamicComponentTooltip": "Dynamische Komponenten werden on-the-fly serverseitig definiert.",
                "EditCompany": "Firma bearbeiten",
                "EditPerson": "Person bearbeiten",
                "EditTask": "Aufgabe bearbeiten",
                "ElementTest": "Element-Test",
                "EndDate": "Enddatum",
                "FamilyName": "Nachname",
                "FirstName": "Vorname",
                "Hobbies": "Hobbys",
                "Hobby": "Hobby",
                "HobbyName": "Hobby Name",
                "InlineForm": "Inline Form",
                "NewCompany": "Neue Firma",
                "NewHobby": "Neues Hobby",
                "NewPerson": "Neue Person",
                "NewProject": "Neues Projekt",
                "NewTask": "Neue Aufgabe",
                "Person": "Person",
                "Priority": "Priorität",
                "Project": "Projekt",
                "Projects": "Projekte",
                "ProjectName": "Projekt Name",
                "Rating": "Rating",
                "StartDate": "Startdatum",
                "Tasks": "Aufgaben",
                "Task": "Aufgabe",
                "TaskName": "Aufgabe Name",
                "Type": "Typ",
                "User": "Benutzer",
                "www.google.com": "www.google.com"
            }
        } else {
            return {
                "AddTask": "Add Task",
                "Birthday": "Birthday",
                "ButtonWidth": "Button Width",
                "City": "City",
                "Contacts": "Contacts",
                "Company": "Company",
                "CompanyName": "Company Name",
                "Companies": "Companies",
                "Comments": "Comments",
                "CustomComponents": "Custom Components",
                "CustomComponentTooltip": "Use your own Angular components with the Path GUI model",
                "DynamicComponents": "Dynamic Components",
                "DynamicComponentTooltip": "Dynamic components are generated server-side on-thy-fly.",
                "EditCompany": "Edit Company",
                "EditPerson": "Edit Person",
                "EditTask": "Edit Task",
                "ElementTest": "Element Test",
                "EndDate": "End date",
                "FamilyName": "Family name",
                "FirstName": "First name",
                "Hobbies": "Hobbies",
                "Hobby": "Hobby",
                "HobbyName": "Hobby Name",
                "InlineForm": "Inline Form",
                "NewCompany": "New Company",
                "NewHobby": "New Hobby",
                "NewPerson": "New Person",
                "NewProject": "New Project",
                "NewTask": "New Task",
                "Person": "Person",
                "Priority": "Priority",
                "Project": "Project",
                "Projects": "Projects",
                "ProjectName": "Project Name",
                "Rating": "Rating",
                "StartDate": "Start date",
                "Tasks": "Tasks",
                "Task": "Task",
                "TaskName": "Task Name",
                "Type": "Type",
                "User": "User",
                "www.google.com": "www.google.com"
            };
        }
    }

}