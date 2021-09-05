const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Datastore = require("nedb");

const app = express();
const port = 4000;

const dbActions = require("./db/actions");

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

const dbPrefix = 'testDB';
const people = new Datastore({ filename: `./data/${dbPrefix}/people.txt` });
const graves = new Datastore({ filename: `./data/${dbPrefix}/graves.txt` });
const cemeteries = new Datastore({ filename: `./data/${dbPrefix}/cemeteries.txt` });

people.loadDatabase();
graves.loadDatabase();
cemeteries.loadDatabase();

const dbs = { people, graves, cemeteries };
dbActions.setDbsObject(dbs)

app.post("/", (req, res) => {
    const sourceDB = dbs[req.body.source];

    switch (req.body.type) {
        case "getAll":
            dbActions.getAll(sourceDB).then((docs) => res.send(docs));
            break;

        case "get":
            dbActions.get(sourceDB, req.body._id).then((doc) => res.send(doc));
            break;
        case "create":
            switch (req.body.source) {
                case "people":
                    dbActions
                        .createPerson(sourceDB)
                        .then((id) => res.send({ _id: id }));
                    break;
                case "graves":
                    dbActions
                        .createGrave(sourceDB)
                        .then((id) => res.send({ _id: id }));
                    break;
                case "cemeteries":
                    dbActions
                        .createCemetery(sourceDB)
                        .then((id) => res.send({ _id: id }));
                    break;
            }
            break;

        case "update":
            switch (req.body.source) {
                case "people":
                    dbActions
                        .updatePerson(sourceDB, req.body.data)
                        .then((status) => res.send(status));
                    break;
                case "graves":
                    dbActions
                        .updateGrave(sourceDB, req.body.data)
                        .then((status) => res.send(status));
                    break;
                case "cemeteries":
                    dbActions
                        .updateCemetery(sourceDB, req.body.data)
                        .then((status) => res.send(status));
                    break;
            }
            break;

        case "remove":
            switch (req.body.source) {
                case "people":
                    dbActions
                        .removePerson(sourceDB, req.body._id)
                        .then((status) => res.send(status));
                    break;
                case "graves":
                    dbActions
                        .removeGrave(sourceDB, req.body._id)
                        .then((status) => res.send(status));
                    break;
                case "cemeteries":
                    dbActions
                        .removeCemetery(sourceDB, req.body._id)
                        .then((status) => res.send(status));
                    break;
            }
            break;

        default:
            break;
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
