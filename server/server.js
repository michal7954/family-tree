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

const people = new Datastore({ filename: "./data/people.txt" });
const graves = new Datastore({ filename: "./data/graves.txt" });
const cemeteries = new Datastore({ filename: "./data/cemeteries.txt" });

people.loadDatabase();
graves.loadDatabase();
cemeteries.loadDatabase();

const dbs = { people, graves, cemeteries };

app.post("/", (req, res) => {
    const sourceDB = dbs[req.body.source];

    switch (req.body.type) {
        case "getAll":
            dbActions.getAll(sourceDB).then((docs) => res.send(docs));
            break;
        case "create":
            dbActions.create(sourceDB).then((id) => res.send({ _id: id }));
            break;
        case "get":
            dbActions.get(sourceDB, req.body._id).then((doc) => res.send(doc));
            break;
        case "update":
            dbActions
                .update(sourceDB, req.body.source, req.body.data)
                .then((status) => res.send(status));
            break;
        case "remove":
            dbActions
                .remove(sourceDB, req.body.source, req.body._id)
                .then((status) => res.send(status));
            break;
        default:
            break;
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
