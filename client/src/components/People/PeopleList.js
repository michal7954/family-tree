import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import request from "../../helpers/http";

import Table from "../UI/Table";

const PeopleList = (props) => {
    const [peopleData, setPeopleData] = useState([]);
    const [showMarriages, setShowMarriages] = useState(false);
    const history = useHistory();

    useEffect(() => {
        request({
            type: "getAll",
            source: "people",
        }).then((data) => {
            const transformData = data
                .filter((person) => {
                    if (showMarriages) return true;
                    else return person.name !== "MARRIAGE";
                })
                .map((person) => {


                    let fullname = `${person.name} ${person.surname}`,
                        birthYear = "None",
                        deathYear = "None";

                    if (person.name === 'UNKNOWN'){
                        const firsSentence = person.description.split(".")[0];
                        fullname = `${firsSentence}. ${person.surname}`;
                    }

                    person.lifeEvents.forEach((event) => {
                        if (event.type === "birth" && event.date.length > 0)
                            birthYear = event.date.slice(0, 4);

                        if (event.type === "death" && event.date.length > 0)
                            deathYear = event.date.slice(0, 4);
                    });

                    if (person.isAlive) deathYear = "...";

                    return {
                        fullname,
                        lifeYears: `${birthYear}-${deathYear}`,
                        _id: person._id,
                    };
                });

            setPeopleData(transformData);
        });
    }, [showMarriages]);

    const addPersonHandler = async (event) => {
        request({
            type: "create",
            source: "people",
        }).then((data) => {
            history.push("/person/" + data._id);
        });

        event.preventDefault();
    };

    const headers = ["Imię i nazwisko", "Lata życia"];
    const keys = ["fullname", "lifeYears"];

    return (
        <div>
            Lista osób
            <br />
            <label>
                <input
                    type="checkbox"
                    onChange={(event) => setShowMarriages(event.target.checked)}
                />
                Pokaż MARRIAGE
            </label>
            <Table
                onAddClick={addPersonHandler}
                headers={headers}
                keys={keys}
                data={peopleData}
                detailsAddress="/person/"
            />
        </div>
    );
};

export default PeopleList;
