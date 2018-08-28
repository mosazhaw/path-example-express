import {AbstractDatabase} from "../database/abstract-database";

export class DynamicComponentsRestService {

    constructor(protected _app) {
    }

    public init() {

        this._app.get('/services/dynamicComponentsPage', async (req, res) => {
            let result = [];
            let pageLabel = {};
            pageLabel["type"] = 'pageLabel';
            pageLabel["value"] = '<h3>These button models are generated dynamically on the server:</h3>';
            pageLabel["newRow"] = true;
            result.push(pageLabel);

            for (let k = 1; k <= 10; k++) {
                let pageLabel = {};
                pageLabel["type"] = 'pageLabel';
                pageLabel["value"] = '<h3>Button ' + k + '</h3>';
                pageLabel["newRow"] = true;
                result.push(pageLabel);

                let button = {};
                button["type"] = 'button';
                button["name"] = { default: '' + k };
                button["icon"] = 'fa-user';
                button["color"] = 'blue';
                button["key"] = {};
                button["key"]["key"] = k;
                button["key"]["name"] = 'buttonKey';
                button["page"] = 'dynamicComponentsChildPage';
                button["width"] = 2;
                result.push(button);
            }
            res.json(result);
        });

        this._app.get('/services/dynamicComponentsPage/:buttonKey', async (req, res) => {
            let result = [];
            let pageLabel = {};
            pageLabel["type"] = 'pageLabel';
            pageLabel["value"] = '<h3>These button models are generated dynamically on the server:</h3>';
            pageLabel["newRow"] = true;
            result.push(pageLabel);

            for (let k = 1; k <= req.params.buttonKey; k++) {
                let button = {};
                button["type"] = 'button';
                button["name"] = { default: '' + k };
                button["icon"] = 'fa-user';
                button["color"] = 'blue';
                button["key"] = {};
                button["key"]["key"] = k;
                button["key"]["name"] = 'buttonKey';
                button["page"] = 'dynamicComponentsChildPage';
                button["width"] = 2;
                result.push(button);
            }
            res.json(result);
        });

        this._app.get('/services/dynamicComponentsForm/field', async (req, res) => {
            let result = [];
            let types = ["text", "number", "date", "label"];
            let k = 0;

            for (let type of types) {
                k++;
                let field = {};
                field["type"] = type;
                field["name"] = 'Name' + k + " (" + type + ")";
                field["width"] = 2;
                result.push(field);
            }
            res.json(result);
        });

    }

}