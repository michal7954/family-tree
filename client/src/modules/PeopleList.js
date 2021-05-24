import React from 'react';

export default class PeopleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            peopleData: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:4000/peopleList')
            .then(response => response.json())
            .then(data => {
                this.setState({ peopleData: data })
            });
    }

    render() {
        const rows = this.state.peopleData.map(person => {

            return <Row person={person} />
        })
        return (
            <div>
                PeopleList
                <table>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Opis</th>
                        <th>Nr telefonu</th>
                        <th>E-mail</th>
                        <th>Miejsce zamieszkania</th>
                        <th>ID</th>
                    </tr>
                    {rows}
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
                <td>{this.props.person._id}</td>
            </tr>
        )
    }
}