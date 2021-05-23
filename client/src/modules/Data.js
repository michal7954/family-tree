import React, { Component, AppHeader, ContactsList } from 'react';

class Data extends React.Component {
    state = {
        contacts: []
    };

    componentDidMount() {
        // fetch("https://randomuser.me/api/?format=json&results=10")
        fetch("http://localhost:1234")
            .then(res => res.json())
            .then(json => {
                console.log(json.results)
                this.setState({ contacts: json.results })
            });
    }

    render() {
        return (
            <div>
                data block
                {this.state.contacts}
            </div>
        );
    }
}

export default Data;