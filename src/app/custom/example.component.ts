import {Component} from '@angular/core';
import {CustomPageElement} from 'path-framework/app/path-framework/page/element/custom/custom-container.component';


@Component({
    template: `
        <div>
          <h4>This text is a custom component added by Path-Example as child of {{getText()}}</h4> 
        </div>
      `
})
export class ExampleComponent extends CustomPageElement {

    constructor() {
        super();
        console.log("example component");
    }

    public getText():string {
        if (this.pageElement != null && this.pageElement.parentPageElement != null) {
            return this.pageElement.parentPageElement.name;
        }
        return null;
    }
}