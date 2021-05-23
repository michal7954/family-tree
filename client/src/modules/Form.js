import React, { Component } from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) { this.setState({ value: event.target.value }); }
    handleSubmit(event) {
        // alert('Podano następujące imię: ' + this.state.value);
        var data = JSON.stringify(this.state)
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

        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>        <label>
                Imię:
            <input type="text" value={this.state.value} onChange={this.handleChange} />        </label>
                <input type="submit" value="Wyślij" />
            </form>
        );
    }
}

export default Form;