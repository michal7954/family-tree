import React from 'react';

export default class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {
                name: '',
                surname: '',
                isAlive: false,
                gender: 'm',
                description: '',
                mother: '',
                father: '',
                // children: [],
                lifeEvents: [],
                phoneNumber: '',
                emailAddress: '',
                residencePlace: ''
            },
            eventsNumber: 0
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addLifeEventSection = this.addLifeEventSection.bind(this);
        this.handleLifeEventSectionInputChange = this.handleLifeEventSectionInputChange.bind(this)
        this.removeLifeEventSection = this.removeLifeEventSection.bind(this)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [name]: value
            }
        }));
    }

    handleSubmit(event) {
        var data = JSON.stringify(this.state.formData)
        fetch('http://localhost:4000/personFormSubmin', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        })

        // czyszczenie pól po wysłaniu
        // this.setState({
        //     formData: {
        //         name: '',
        //         surname: '',
        //         isAlive: false,
        //         gender: 'm',
        //         description: '',
        //         mother: '',
        //         father: '',
        //         // children: [],
        //         lifeEvents: [],
        //         phoneNumber: '',
        //         emailAddress: '',
        //         residencePlace: ''
        //     },
        //     eventsNumber: 0
        // });

        event.preventDefault();
    }

    addLifeEventSection(event) {

        this.setState(prevState => ({
            eventsNumber: prevState.eventsNumber + 1,
            formData: {
                ...prevState.formData,
                lifeEvents: [
                    ...prevState.formData.lifeEvents,
                    {
                        type: "any",
                        date: "",
                        place: "",
                    },
                ]
            }
        }));

        event.preventDefault();
    }

    handleLifeEventSectionInputChange(event, index) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let newLifeEvents = [...this.state.formData.lifeEvents]
        newLifeEvents[index][name] = value

        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                lifeEvents: newLifeEvents
            }
        }));

        event.preventDefault();
    }

    removeLifeEventSection(event, index) {

        let newLifeEvents = [...this.state.formData.lifeEvents]
        if (index > -1)
            newLifeEvents.splice(index, 1);

        this.setState(prevState => ({
            eventsNumber: prevState.eventsNumber - 1,
            formData: {
                ...prevState.formData,
                lifeEvents: newLifeEvents
            }
        }));

        event.preventDefault();
    }

    render() {

        const events = this.state.formData.lifeEvents.map((element, index) =>
            <LifeEventSection values={element} removeLifeEventSection={this.removeLifeEventSection} onInputChange={this.handleLifeEventSectionInputChange} eventIndex={index} />
        )

        return (
            <form onSubmit={this.handleSubmit}>
                Wprowadź dane osoby<br />
                <label>Imię: <input type="text" name="name" value={this.state.formData.name} onChange={this.handleInputChange} /></label><br />
                <label>Nazwisko: <input type="text" name="surname" value={this.state.formData.surname} onChange={this.handleInputChange} /></label><br />
                <label>Żyjąca: <input type="checkbox" name="isAlive" value={this.state.formData.isAlive} onChange={this.handleInputChange} /></label><br />

                <div onChange={this.handleInputChange}>
                    Płeć:
                <label><input type="radio" name="gender" value="w" />kobieta</label>
                    <label><input type="radio" name="gender" value="m" defaultChecked />mężczyzna</label><br />
                </div>

                <label>Opis: <textarea name="description" value={this.state.formData.description} onChange={this.handleInputChange} /></label><br />
                <label>Matka: <input type="text" name="mother" value={this.state.formData.mother} onChange={this.handleInputChange} /></label><br />
                <label>Ojciec: <input type="text" name="father" value={this.state.formData.father} onChange={this.handleInputChange} /></label><br />
                {
                    this.state.formData.isAlive
                        ?
                        <div>
                            <label>Telefon: <input type="text" name="phoneNumber" value={this.state.formData.phoneNumber} onChange={this.handleInputChange} /></label><br />
                            <label>E-mail: <input type="text" name="emailAddress" value={this.state.formData.emailAddress} onChange={this.handleInputChange} /></label><br />
                            <label>Miejsce zamieszkania: <input type="text" name="residencePlace" value={this.state.formData.residencePlace} onChange={this.handleInputChange} /></label><br />
                        </div>
                        : <div></div>
                }
                <button onClick={this.addLifeEventSection}>Dodaj kolejne wydarzenie z życia: {this.state.eventsNumber}</button><br />
                {events}
                <input type="submit" value="Wyślij" />
            </form>
        );
    }
}

class LifeEventSection extends React.Component {
    render() {
        return (
            <span>
                <select name="type" value={this.props.values.type} onChange={event => this.props.onInputChange(event, this.props.eventIndex)}>
                    <option value="any">Dowolne</option>
                    <option value="birth">Narodziny</option>
                    <option value="baptism">Chrzest</option>
                    <option value="marriage">Ślub</option>
                    <option value="death">Śmierć</option>
                    <option value="funeral">Pogrzeb</option>
                </select>
                <label><input type="date" name="date" value={this.props.values.date} onChange={event => this.props.onInputChange(event, this.props.eventIndex)} /></label>
                <label><input type="text" name="place" value={this.props.values.place} onChange={event => this.props.onInputChange(event, this.props.eventIndex)} /></label>
                <button onClick={event => this.props.removeLifeEventSection(event, this.props.eventIndex)}>Usuń</button>
                <br />
            </span>
        );
    }
}