const personTemplate = {
    name: "",
    surname: "",
    isAlive: false,
    gender: "m",
    description: "",
    mother: "",
    father: "",
    children: [],
    lifeEvents: [],
    phoneNumber: "",
    emailAddress: "",
    residencePlace: "",
};

const graveTemplate = {
    description: "",
    cemeteryId: "",
    buriedList: [],
};

const cemeteryTemplate = {
    name: "",
    address: "",
    graves: [],
};

(function () {
    
    let dbs;

    module.exports.setDbsObject=(newDbsObject)=>{
        dbs=newDbsObject;
    }

    module.exports.getAll = (sourceDB) => {
        return new Promise((resolve, reject) => {
            sourceDB.find({}, (err, docs) => {
                resolve(docs);
            });
        });
    };

    module.exports.get = (sourceDB, _id) => {
        return new Promise((resolve, reject) =>
            sourceDB.findOne({ _id }, (err, doc) => resolve(doc))
        );
    };

    module.exports.createPerson = (sourceDB) => {
        return new Promise((resolve, reject) =>
            sourceDB.insert(personTemplate, (err, newDoc) =>
                resolve(newDoc._id)
            )
        );
    };

    module.exports.createGrave = (sourceDB) => {
        return new Promise((resolve, reject) =>
            sourceDB.insert(graveTemplate, (err, newDoc) => resolve(newDoc._id))
        );
    };

    module.exports.createCemetery = (sourceDB) => {
        return new Promise((resolve, reject) =>
            sourceDB.insert(cemeteryTemplate, (err, newDoc) =>
                resolve(newDoc._id)
            )
        );
    };

    module.exports.updatePerson = (db, data) => {
        return new Promise((resolve, reject) => {
            db.findOne({ _id: data._id }, function (err, doc) {
                if (doc.mother != data.mother) {
                    db.update(
                        { _id: doc.mother },
                        { $pull: { children: data._id } },
                        { multi: false },
                        function () {}
                    );
                    db.update(
                        { _id: data.mother },
                        { $addToSet: { children: data._id } },
                        { multi: false },
                        function (err, numReplaced) {}
                    );
                }

                if (doc.father != data.father) {
                    db.update(
                        { _id: doc.father },
                        { $pull: { children: data._id } },
                        { multi: false },
                        function () {}
                    );
                    db.update(
                        { _id: data.father },
                        { $addToSet: { children: data._id } },
                        { multi: false },
                        function (err, numReplaced) {}
                    );
                }

                db.update(
                    { _id: data._id },
                    data,
                    { multi: false },
                    function (err, numReplaced) {
                        resolve({ status: "OK" });
                    }
                );
            });
        });
    };

    module.exports.removePerson = (db, _id) => {
        return new Promise((resolve, reject) => {
            db.findOne({ _id }, function (err, doc) {
                db.update(
                    { _id: doc.mother },
                    { $pull: { children: _id } },
                    { multi: false },
                    function () {}
                );
                db.update(
                    { _id: doc.father },
                    { $pull: { children: _id } },
                    { multi: false },
                    function () {}
                );

                doc.children.forEach((childId) => {
                    if (doc.gender == "w")
                        db.update(
                            { _id: childId },
                            { $set: { mother: "" } },
                            { multi: false },
                            function () {}
                        );
                    else
                        db.update(
                            { _id: childId },
                            { $set: { father: "" } },
                            { multi: false },
                            function () {}
                        );
                });

                db.remove(
                    { _id: _id },
                    { multi: false },
                    function (err, numRemoved) {
                        resolve({ status: "OK" });
                    }
                );
            });
        });
    };
})();
