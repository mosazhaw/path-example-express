import {PersonDatabase} from "./database/person-database";
import {CompanyDatabase} from "./database/company-database";
import {TaskDatabase} from "./database/task-database";
import {HobbyDatabase} from "./database/hobby-database";
import {Database} from "./database/database";
import {TestData} from "./test-data";
import {PersonRestService} from "./rest/person-rest-service";
import {TaskRestService} from "./rest/task-rest-service";
import {HobbyRestService} from "./rest/hobby-rest-service";
import {CompanyRestService} from "./rest/company-rest-service";

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

// entities
Database.initDatabase();
let personDatabase = new PersonDatabase();
let companyDatabase = new CompanyDatabase();
let hobbyDatabase = new HobbyDatabase();
let taskDatabase = new TaskDatabase();
new PersonRestService(app, personDatabase).init();
new CompanyRestService(app, companyDatabase).init();
new HobbyRestService(app, hobbyDatabase).init();
new TaskRestService(app, taskDatabase).init();
TestData.init();

// set the home page route
app.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('../index.html');
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});