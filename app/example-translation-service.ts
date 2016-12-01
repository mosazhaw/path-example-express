import {Injectable} from "@angular/core";
import {TranslationService} from "path-framework/app/path-framework/service/translation.service"

@Injectable()
export class ExampleTranslationService extends TranslationService {

    protected getTranslations() {
        console.log("Example Service");
        return super.getTranslations();
    }

}