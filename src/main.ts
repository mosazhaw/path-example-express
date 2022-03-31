import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { ExampleAppModule } from "./app/example-app.module";

platformBrowserDynamic().bootstrapModule(ExampleAppModule).catch(err => console.error(err));;
