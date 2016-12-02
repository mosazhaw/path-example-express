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
                "Birthday": "Geburtstag",
                "Contacts": "Freunde",
                "Companies": "Firmen",
                "Hobbies": "Hobbys",
                "Hobby": "Hobby",
                "HobbyName": "Hobby Name",
                "NewHobby": "Neues Hobby",
                "Tasks": "Aufgaben"
            }
        } else {
            return {
                "Birthday": "Birthday",
                "Contacts": "Contacts",
                "Companies": "Companies",
                "Hobbies": "Hobbies",
                "Hobby": "Hobby",
                "HobbyName": "Hobby Name",
                "NewHobby": "New Hobby",
                "Tasks": "Tasks"
            };
        }
    }

}