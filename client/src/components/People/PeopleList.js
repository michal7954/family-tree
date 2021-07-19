import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Table from "../UI/Table";

const PeopleList = (props) => {
    const [peopleData, setPeopleData] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetch("http://localhost:4000/peopleList")
            .then((response) => response.json())
            .then((data) => {
                const transformData = data.map((person) => {
                    let birthYear = "None",
                        deathYear = "None";

                    person.lifeEvents.forEach((event) => {
                        if (event.type === "birth")
                            birthYear = event.date.slice(0, 4);

                        if (event.type === "death")
                            deathYear = event.date.slice(0, 4);
                    });

                    if (person.isAlive) deathYear = "...";

                    return {
                        fullname: person.name + " " + person.surname,
                        lifeYears: birthYear + "-" + deathYear,
                        _id: person._id,
                    };
                });

                setPeopleData(transformData);
            });
    }, []);

    const addPersonHandler = async (event) => {
        const response = await fetch("http://localhost:4000/addPerson");
        const data = await response.text();
        history.push("/personForm/" + data);

        event.preventDefault();
    };

    const headers = ["Imię i nazwisko", "Lata życia"];
    const keys = ["fullname", "lifeYears"];

    return (
        <div>
            PeopleList
            <Table
                onAddClick={addPersonHandler}
                headers={headers}
                keys={keys}
                data={peopleData}
                detailsAddress="/personForm/"
            />
        </div>
    );
};

export default PeopleList;
