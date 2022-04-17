import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import request from "../../helpers/http";

import Table from "../UI/Table";

const PeopleList = (props) => {
    const [peopleData, setPeopleData] = useState([]);
    const [showMarriages, setShowMarriages] = useState(false);
    const [filter, setFilter] = useState("");
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

                    if (person.name === "UNKNOWN") {
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
                        ...person,
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

    const filteredPeopleData = peopleData.filter(
        (personData) =>
            personData._id.includes(filter) ||
            personData.fullname.toLowerCase().includes(filter.toLowerCase()) ||
            personData.description.toLowerCase().includes(filter.toLowerCase()) ||
            personData.lifeYears.includes(filter) ||
            personData.graveId?.includes(filter) ||
            personData.cemeteryId?.includes(filter)
    );

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
            <br />
            <input
                type="text"
                placeholder="filtrowanie"
                onChange={(event) => setFilter(event.target.value)}
            />
            <Table
                onAddClick={addPersonHandler}
                headers={headers}
                keys={keys}
                data={filteredPeopleData}
                detailsAddress="/person/"
            />
        </div>
    );
};

export default PeopleList;
