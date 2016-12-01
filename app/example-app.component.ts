/* angular/path imports */
import {Component} from '@angular/core';
import * as path from "path-framework/app/path-framework/path";

/* model imports */
import {GuiModel} from './gui-model/guimodel';
import * as handler from './gui-model/form/handlers'
import * as beans from './gui-model/generated/forms'
import {TranslationService} from "path-framework/app/path-framework/service/translation.service";

@Component({
    selector: 'path-application',
    templateUrl: './../node_modules/path-framework/app/path-framework/path-app.component.html',
    // providers: [{ provide: path.PathService, useClass: path.PathMockService }]
    providers: [path.PathService, TranslationService]
})
export class ExampleAppComponent extends path.PathAppComponent {

    private _appConfig = new GuiModel();

    constructor(pathService: path.PathService, translationService: TranslationService) {
        super(pathService, translationService);
    }

    protected getFrontendVersion():string {
        return "0.0.1";
    }

    protected getStartPage():string {
        return "mainmenu";
    }

    protected getOwnUserForm():string {
        return "HelloWorldForm";
    }

    protected getGuiModel() {
        if (this._appConfig != null) {
            return this._appConfig.guiModel;
        }
        return null;
    }

    public getBackendUrl() {
        return "http://localhost:8080/services";
    }
    
    protected getBeans() {
        return beans;
    }
    
    protected getHandlers() {
        return handler;
    }

}