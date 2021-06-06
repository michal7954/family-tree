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
    children: [],
    lifeEvents: [],
    phoneNumber: '',
    emailAddress: '',
    residencePlace: ''
}


app.get('/', (req, res) => {
    res.send('Hello World!')
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

app.get('/person/:id', (req, res) => {
    people.findOne({ _id: req.params.id }, function (err, doc) {
        res.send(doc)
    });
})

app.post('/personFormSubmin', (req, res) => {

    people.findOne({ _id: req.body._id }, function (err, doc) {

        if (doc.mother != req.body.mother) {
            people.update({ _id: doc.mother }, { $pull: { children: req.body._id } }, { multi: false }, function () { });
            people.update({ _id: req.body.mother }, { $addToSet: { children: req.body._id } }, { multi: false }, function (err, numReplaced) { });
        }

        if (doc.father != req.body.father) {
            people.update({ _id: doc.father }, { $pull: { children: req.body._id } }, { multi: false }, function () { });
            people.update({ _id: req.body.father }, { $addToSet: { children: req.body._id } }, { multi: false }, function (err, numReplaced) { });
        }

        people.update({ _id: req.body._id }, req.body, { multi: false }, function (err, numReplaced) {
            res.sendStatus(200);
        });
    });

})

app.post('/personRemove', (req, res) => {

    people.findOne({ _id: req.body._id }, function (err, doc) {

        people.update({ _id: doc.mother }, { $pull: { children: req.body._id } }, { multi: false }, function () { });
        people.update({ _id: doc.father }, { $pull: { children: req.body._id } }, { multi: false }, function () { });

        doc.children.forEach(childId => {
            if (doc.gender == 'w')
                people.update({ _id: childId }, { $set: { mother: '' } }, { multi: false }, function () { });
            else
                people.update({ _id: childId }, { $set: { father: '' } }, { multi: false }, function () { });
        });

        people.remove({ _id: req.body._id }, { multi: false }, function (err, numRemoved) {
            res.sendStatus(200);
        });
    });
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})