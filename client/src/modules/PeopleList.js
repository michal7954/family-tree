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
                            <th>Imię</th>
                            <th>Opis</th>
                            <th>Nr telefonu</th>
                            <th>E-mail</th>
                            <th>Miejsce zamieszkania</th>
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
        return (
            <tr>
                <td>{this.props.person.name}</td>
                <td>{this.props.person.surname}</td>
                <td>{this.props.person.description}</td>
                <td>{this.props.person.phoneNumber}</td>
                <td>{this.props.person.emailAddress}</td>
                <td>{this.props.person.residencePlace}</td>
                <td className="copyText" onClick={() => { navigator.clipboard.writeText(this.props.person._id) }}>{this.props.person._id}</td>
            </tr>
        )
    }
}