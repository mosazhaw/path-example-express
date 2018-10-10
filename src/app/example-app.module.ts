import {NgModule} from "@angular/core";
import {ExampleAppComponent} from "./example-app.component";
import {AppModule} from "path-framework/app/app.module";
import {ExampleComponent} from "./custom/example.component";

@NgModule({
    imports:      [AppModule.forRoot()],
    declarations: [ExampleAppComponent, ExampleComponent],
    bootstrap:    [ExampleAppComponent],
    entryComponents: [ExampleComponent]
})
export class ExampleAppModule {}
