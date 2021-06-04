import React from 'react';
import { Link } from "react-router-dom";

export default class PeopleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            peopleData: []
        }

        this.addPerson = this.addPerson.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:4000/peopleList')
            .then(response => response.json())
            .then(data => this.setState({ peopleData: data }));
    }

    addPerson(event) {
        console.log("add");
        fetch('http://localhost:4000/addPerson')
            .then(response => response.text())
            .then(data => this.props.history.push("/personForm/" + data));

        event.preventDefault()
    }


    render() {
        const rows = this.state.peopleData.map(person => <Row key={person._id} person={person} />)

        return (
            <div>
                PeopleList
                <table>
                    <thead>
                        <tr>
                            <th><button onClick={this.addPerson}>Dodaj</button></th>
                            <th>Imię i nazwisko</th>
                            <th>Lata życia</th>
                            <th>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}

class Row extends React.Component {
    render() {
        let birthYear = "None", deathYear = "None"

        this.props.person.lifeEvents.forEach(event => {
            if (event.type === "birth")
                birthYear = event.date.slice(0, 4)

            if (event.type === "death")
                deathYear = event.date.slice(0, 4)
        });

        if (this.props.person.isAlive)
            deathYear="..."

        return (
            <tr>
                <td><Link to={"/personForm/" + this.props.person._id}>Szczegóły</Link></td>
                <td>{this.props.person.name} {this.props.person.surname}</td>
                <td>{birthYear}-{deathYear}</td>
                <td className="copyText" onClick={() => { navigator.clipboard.writeText(this.props.person._id) }}>{this.props.person._id}</td>
            </tr>
        )
    }
}