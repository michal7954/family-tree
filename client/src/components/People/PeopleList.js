import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import request from "../../helpers/http";

import Table from "../UI/Table";

const PeopleList = (props) => {
    const [peopleData, setPeopleData] = useState([]);
    const history = useHistory();

    useEffect(() => {
        request({
            type: "getAll",
            source: "people",
        }).then((data) => {
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
        request({
            type:"create",
            source: "people"
        }).then((data)=>{
            history.push("/person/" + data._id);
        });

        event.preventDefault();
    };

    const headers = ["Imię i nazwisko", "Lata życia"];
    const keys = ["fullname", "lifeYears"];

    return (
        <div>
            Lista osób
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
