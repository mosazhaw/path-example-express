let express = require('express');
let app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
let port = process.env.PORT || 8080;

// make express look in the public directory for assets (css/js/img)
app.use('/', [express.static(__dirname + './../')]);

// database
let loki = require('lokijs');
let db = new loki('PathExample');
let person = db.addCollection('person');
person.insert({key: 1, firstName:'Adam', familyName: 'Jones'});
person.insert({key: 2, firstName:'Betty', familyName: 'Miller'});
person.insert({key: 3, firstName:'Chris', familyName: 'Connor'});
person.insert({key: 4, firstName:'Dave', familyName: 'Dean'});

app.get('/services/ping', function(req, res) {
    res.json({ status: 'ok', userId : 'demo', version: '0.0.1' });
});

app.get('/services/person', function(req, res) {
    res.json(person.find());
});

// set the home page route
app.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('../index.html');
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});