const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser');

const app = express()
const port = 1234

app.use(cors())
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var Datastore = require('nedb')

var db = new Datastore({ filename: './data/testdb.txt' });

db.loadDatabase(function (err) {    // Callback is optional
    // Now commands will be executedd
});

var doc = { hello: 'world'
               , n: 5
               , today: new Date()
               , nedbIsAwesome: true
               , notthere: null
               , notToBeSaved: undefined  // Will not be saved
               , fruits: [ 'apple', 'orange', 'pear' ]
               , infos: { name: 'nedb' }
               };
 
db.insert(doc, function (err, newDoc) {   // Callback is optional
  // newDoc is the newly inserted document, including its _id
  // newDoc has no key called notToBeSaved since its value was undefined
});

app.get('/', (req, res) => {
    res.send('DUPA')
})

app.post('/form', (req, res) => {
    console.log(req.body.value)
    db.insert(req.body, function (err, newDoc) {   // Callback is optional
        // newDoc is the newly inserted document, including its _id
        // newDoc has no key called notToBeSaved since its value was undefined
      });
    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})