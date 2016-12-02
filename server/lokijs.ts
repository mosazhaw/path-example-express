export class LokiJS {

    private static _database;
    private static _loki = require('lokijs');

    public static getDatabase() {
        if (this._database == null) {
            this._database = new this._loki('PathExample');
        }
        return this._database;
    }

}