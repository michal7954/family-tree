import './App.css';
import Form from './modules/Form'
import PeopleList from './modules/PeopleList'
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

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
                        <Route path="/personForm/:id" component={Form} />
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