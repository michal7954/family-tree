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


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/personFormSubmin', (req, res) => {
    people.insert(req.body, function (err, newDoc) {
        if (err)
            console.log(err)
    });
    res.sendStatus(200);
})

app.get('/peopleList', (req, res) => {
    
    people.find({}, function (err, docs) {
        res.send(docs)
      });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})