export class GuiModel {

    private _guiModel = {
        "application": {
            "title": "Path Example",
            "formList": [
                {
                    "id": "PersonForm",
                    "title": "Person",
                    "formFieldList": [
                        {
                            "id": "name",
                            "type": "text",
                            "name": "FamilyName",
                            "width": 1,
                            "required": true
                        },
                        {
                            "id": "name",
                            "type": "text",
                            "name": "FirstName",
                            "width": 1,
                            "required": true
                        },
                        {
                            "type": "deleteButton",
                            "name": "Delete"
                        },
                        {
                            "type": "cancelButton",
                            "name": "Cancel"
                        },
                        {
                            "type": "okButton",
                            "name": "Ok"
                        }
                    ]
                },
                {
                    "id": "UserForm",
                    "title": "Person",
                    "formFieldList": [
                        {
                            "id": "name",
                            "type": "text",
                            "name": "User",
                            "width": 2,
                            "required": true,
                        },
                        {
                            "type": "cancelButton",
                            "name": "Cancel"
                        },
                        {
                            "type": "okButton",
                            "name": "Ok"
                        }
                    ]
                },
            ],
            "pageList": [
                {
                    "id": "mainmenu",
                    "name": "MainMenu",
                    "elementList": [
                        {
                            "type": "button",
                            "name": "Contacts",
                            "icon": "fa-user",
                            "color": "blue",
                            "page": "contactspage",
                        },
                        {
                            "type": "button",
                            "name": "Companies",
                            "icon": "fa-industry",
                            "color": "lime",
                        },
                        {
                            "type": "button",
                            "name": "Hobbies",
                            "icon": "fa-industry",
                            "color": "carrot",
                        },
                        {
                            "type": "button",
                            "name": "Tasks",
                            "icon": "fa-tasks",
                            "color": "wisteria",
                        }
                    ]
                },
                {
                    "id": "contactspage",
                    "name": "Contacts",
                    "elementList": [
                        {
                            "type": "backbutton",
                        },
                        {
                            "type": "newButton",
                            "name": "NewPerson",
                            "icon": "fa-user",
                            "color": "green",
                            "form": {
                                "form": "PersonForm"
                            }
                        },
                        {
                            "type": "list",
                            "name": "PersonList",
                            "icon": "fa-user",
                            "color": "blue",
                            "search": true,
                            "form": {
                                "form": "PersonForm"
                            }
                        },
                    ]
                },
            ]
        }
    };


    get guiModel() {
        return this._guiModel;
    }
}