import React, { Component, AppHeader, ContactsList } from 'react';

class Data extends React.Component {
    state = {
        contacts: []
    };

    componentDidMount() {

        fetch('http://localhost:1234/')
            .then(response => response.text())
            .then(data => {
                console.log(data)
                this.setState({ contacts: data })
            });


    }

    render() {
        return (
            <div>
                data block:<br/>
                {this.state.contacts}
            </div>
        );
    }
}

export default Data;