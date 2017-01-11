import {PersonDatabase} from "./database/person-database";
import {CompanyDatabase} from "./database/company-database";
import {TaskDatabase} from "./database/task-database";
import {HobbyDatabase} from "./database/hobby-database";
import {AbstractDatabase} from "./database/abstract-database";
import {TestData} from "./test-data";
import {PersonRestService} from "./rest/person-rest-service";
import {TaskRestService} from "./rest/task-rest-service";
import {HobbyRestService} from "./rest/hobby-rest-service";
import {CompanyRestService} from "./rest/company-rest-service";
import {ProjectDatabase} from "./database/project-database";
import {ProjectRestService} from "./rest/project-rest-service";

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

app.get('/*',function(req,res,next) {
    res.header("cache-control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
    res.header("pragma", "no-cache"); // HTTP 1.0
    res.header("expires", "0"); // HTTP 1.0 proxies
    next();
});

// entities
AbstractDatabase.initDatabase();
let personDatabase = new PersonDatabase();
let projectDatabase = new ProjectDatabase();
let companyDatabase = new CompanyDatabase();
let hobbyDatabase = new HobbyDatabase();
let taskDatabase = new TaskDatabase();
new PersonRestService(app, personDatabase).init();
new CompanyRestService(app, companyDatabase).init();
new HobbyRestService(app, hobbyDatabase).init();
new TaskRestService(app, taskDatabase).init();
new ProjectRestService(app, projectDatabase).init();
TestData.init();

// set the home page route
app.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('../index.html');
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});