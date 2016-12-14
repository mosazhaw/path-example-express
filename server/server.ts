import {PersonDatabase} from "./database/person-database";
import {CompanyDatabase} from "./database/company-database";
import {TaskDatabase} from "./database/task-database";
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

// entities
new PersonDatabase(app).init();
new CompanyDatabase(app).init();
new TaskDatabase(app).init();
new HobbyDatabase(app).init();

// set the home page route
app.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('../index.html');
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});