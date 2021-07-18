import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import './App.css';
import PersonForm from './components/People/PersonForm'
import PeopleList from './components/People/PeopleList'


export default function App() {
    return (
        <div className="App">
            <div className="App-header">
                <Router>
                    <header className="my-header">
                        <nav>
                            <Link to="/">Home</Link> <Link to="/peopleList">Osoby</Link>
                        </nav>
                    </header>
                    <Switch>
                        <Route path="/personForm/:id" component={PersonForm} />
                        <Route path="/peopleList" component={PeopleList} />
                        <Route path="/" component={Home} />
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

function Home() {
    return <h2>Witaj!</h2>;
}