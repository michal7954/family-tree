const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
var Datastore = require('nedb');

const app = express()
const port = 4000

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var people = new Datastore({ filename: './data/people.txt' });
var graves = new Datastore({ filename: './data/graves.txt' });
var cemeteries = new Datastore({ filename: './data/cemeteries.txt' });

people.loadDatabase();
graves.loadDatabase();
cemeteries.loadDatabase();

const personTemplate = {
    name: '',
    surname: '',
    isAlive: false,
    gender: 'm',
    description: '',
    mother: '',
    father: '',
    // children: [],
    lifeEvents: [],
    phoneNumber: '',
    emailAddress: '',
    residencePlace: ''
}


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/person/:id', (req, res) => {
    people.findOne({ _id: req.params.id }, function (err, doc) {
        res.send(doc)
    });
})

app.post('/personFormSubmin', (req, res) => {
    people.update({ _id: req.body._id }, req.body, { multi: false }, function (err, numReplaced) {
        res.sendStatus(200);
    });
})

app.post('/personRemove', (req, res) => {
    people.remove({ _id: req.body._id }, { multi: false }, function (err, numRemoved) {
        res.sendStatus(200);
    });
})

app.get('/peopleList', (req, res) => {

    people.find({}, function (err, docs) {
        res.send(docs)
    });
})

app.get('/addPerson', (req, res) => {
    people.insert(personTemplate, function (err, newDoc) {
        res.send(newDoc._id)
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})