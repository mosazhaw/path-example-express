import {AbstractDatabase} from "../database/abstract-database";

export class DynamicComponentsRestService {

    constructor(protected _app) {
    }

    public init() {

        this._app.get("/services/dynamicComponentsPage", async (req, res) => {
            const result = [];
            const pageLabel = {};
            pageLabel["type"] = "pageLabel";
            pageLabel["value"] = "<h4>These button models are generated dynamically on the server:</h4>";
            pageLabel["newRow"] = true;
            result.push(pageLabel);

            for (let k = 1; k <= 10; k++) {
                const pageLabel2 = {};
                pageLabel2["type"] = "pageLabel";
                pageLabel2["value"] = "<h4>Button " + k + "</h4>";
                pageLabel2["newRow"] = true;
                result.push(pageLabel2);

                const button = {};
                button["type"] = "button";
                button["name"] = { default: "" + k };
                button["icon"] = "fa-user";
                button["color"] = "blue";
                button["key"] = {};
                button["key"]["key"] = k;
                button["key"]["name"] = "buttonKey";
                button["page"] = "dynamicComponentsChildPage";
                button["width"] = 2;
                result.push(button);
            }
            res.json(result);
        });

        this._app.get("/services/dynamicComponentsPage/:buttonKey", async (req, res) => {
            const result = [];
            const pageLabel = {};
            pageLabel["type"] = "pageLabel";
            pageLabel["value"] = "<h4>These button models are generated dynamically on the server:</h4>";
            pageLabel["newRow"] = true;
            result.push(pageLabel);

            for (let k = 1; k <= req.params.buttonKey; k++) {
                const button = {};
                button["type"] = "button";
                button["name"] = { default: "" + k };
                button["icon"] = "fa-user";
                button["color"] = "blue";
                button["key"] = {};
                button["key"]["key"] = k;
                button["key"]["name"] = "buttonKey";
                button["page"] = "dynamicComponentsChildPage";
                button["width"] = 2;
                result.push(button);
            }
            res.json(result);
        });

        this._app.get("/services/dynamicComponentsForm/field", async (req, res) => {
            const result = [];
            const types = ["text", "number", "date", "label", "label"];
            let k = 0;

            // width 2
            for (const type of types) {
                k++;
                result.push(this.createField(k, type, 2));
            }

            // width 1
            for (const type of types) {
                k++;
                result.push(this.createField(k, type, 1));
            }

            // set a value for first label
            result[3]["value"] = "VALUE";
            result[8]["value"] = "VALUE";

            res.json(result);
        });

    }

    private createField(count: number, type: string, width: number): any {
        const field = {};
        field["type"] = type;
        field["name"] = "Name" + count + " (" + type + ")";
        field["width"] = width;
        return field;
    }

}
