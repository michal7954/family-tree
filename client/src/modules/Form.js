import React, { Component } from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {
                // value: '', 
                name: '',
                surname: '',
                isAlive: '',
                description: '',
                mother: '',
                father: '',
                // children: [],
                phoneNumber: '',
                emailAddress: '',
                residencePlace: ''
            },
            eventsNumber:0
        }


        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addLifeEventInput = this.addLifeEventInput.bind(this);
    }

    // handleChange(event) { this.setState({ name: event.target.value }); }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState(prevState => ({
            formData:{
                ...prevState.formData,
                [name]: value
            }
        }));
    }

    handleSubmit(event) {
        // alert('Podano następujące imię: ' + this.state.value);
        var data = JSON.stringify(this.state.formData)
        console.log(data)
        fetch('http://localhost:1234/form', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        })
            // .then((result) => result.text())
            .then((info) => { console.log(info); })

        // this.setState({
        //     // value: '', 
        //     name: '',
        //     surname: '',
        //     isAlive: '',
        //     description: '',
        //     mother: '',
        //     father: '',
        //     // children: [],
        //     phoneNumber: '',
        //     emailAddress: '',
        //     residencePlace: ''
        // });

        event.preventDefault();
    }

    addLifeEventInput(event) {
        console.log("click")
        this.setState(prevState => ({
            eventsNumber: prevState.eventsNumber+1
        }));

        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                Wprowadź dane osoby<br />
                <label>Imię: <input type="text" name="name" value={this.state.formData.name} onChange={this.handleInputChange} /></label><br />
                <label>Nazwisko: <input type="text" name="surname" value={this.state.formData.surname} onChange={this.handleInputChange} /></label><br />
                <label>Żyjąca: <input type="checkbox" name="isAlive" value={this.state.formData.isAlive} onChange={this.handleInputChange} /></label><br />
                <label>Opis: <textarea name="description" value={this.state.formData.description} onChange={this.handleInputChange} /></label><br />
                <label>Matka: <input type="text" name="mother" value={this.state.formData.mother} onChange={this.handleInputChange} /></label><br />
                <label>Ojciec: <input type="text" name="father" value={this.state.formData.father} onChange={this.handleInputChange} /></label><br />
                <label>Telefon: <input type="text" name="phoneNumber" value={this.state.formData.phoneNumber} onChange={this.handleInputChange} /></label><br />
                <label>E-mail: <input type="text" name="emailAddress" value={this.state.formData.emailAddress} onChange={this.handleInputChange} /></label><br />
                <label>Miejsce zamieszkania: <input type="text" name="residencePlace" value={this.state.formData.residencePlace} onChange={this.handleInputChange} /></label><br />
                <button onClick={this.addLifeEventInput}>Dodaj kolejne wydarzenie z życia: {this.state.eventsNumber}</button><br />
                <input type="submit" value="Wyślij" />
            </form>
        );
    }
}

export default Form;