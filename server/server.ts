import {Database} from "./database/database";
import {PersonDatabase} from "./database/person-database";
import {CompanyDatabase} from "./database/company-database";
import {HobbyDatabase} from "./database/hobby-database";

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set the port of our application
// process.env.PORT lets the port be set by Heroku
let port = process.env.PORT || 8080;

// make express look in the public directory for assets (css/js/img)
app.use('/', [express.static(__dirname + './../')]);

app.get('/services/ping', function(req, res) {
    res.json({ status: 'ok', userId : 'demo', version: '0.0.1' });
});

function addCrudServices(entity:string, database:Database) {
    app.get('/services/' + entity, function(req, res) {
        res.json(database.list());
    });

    app.get('/services/'+entity+'/:key', function(req, res) {
        res.json(database.read(parseInt(req.params.key)));
    });

    app.post('/services/'+entity, function(req, res) {
        res.json(database.create(req.body));
    });

    app.put('/services/'+entity+'/:key', function(req, res) {
        res.json(database.update(parseInt(req.params.key), req.body));
    });

    app.delete('/services/'+entity+'/:key', function(req, res) {
        res.json(database.delete(parseInt(req.params.key)));
    });
}

addCrudServices("person", new PersonDatabase());
addCrudServices("company", new CompanyDatabase());
addCrudServices("hobby", new HobbyDatabase());

// set the home page route
app.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('../index.html');
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});