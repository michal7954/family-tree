import { useEffect, useState } from 'react';

import Table from "../UI/Table"

const PeopleList = props => {

    const [peopleData, setPeopleData] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/peopleList')
            .then(response => response.json())
            .then(data => {
                
                const transformData = data.map(person => {

                    let birthYear = "None", deathYear = "None"

                    person.lifeEvents.forEach(event => {
                        if (event.type === "birth")
                            birthYear = event.date.slice(0, 4)

                        if (event.type === "death")
                            deathYear = event.date.slice(0, 4)
                    });

                    if (person.isAlive)
                        deathYear = "..."

                    return [
                        person.name + " " + person.surname,
                        birthYear+"-"+deathYear,
                        person._id
                    ]
                })

                // console.log(transformData)

                setPeopleData(transformData)
            });
    }, []);

    const addPersonHandler = event => {
        fetch('http://localhost:4000/addPerson')
            .then(response => response.text())
            .then(data => props.history.push("/personForm/" + data));

        event.preventDefault()
    }

    const headers = ["Imię i nazwisko", "Lata życia", "ID"]

    return (
        <div>
            PeopleList
            <Table onAddClick={addPersonHandler} headers={headers} data={peopleData}/>
        </div>
    )
}

export default PeopleList