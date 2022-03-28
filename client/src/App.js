import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import PeopleList from "./components/People/PeopleList";
import PersonForm from "./components/People/PersonForm";
import GravesList from "./components/Graves/GravesList";
import GraveForm from "./components/Graves/GraveForm";
import CemeteriesList from "./components/Cemeteries/CemeteriesList";
import CemeteryForm from "./components/Cemeteries/CemeteryForm";
import Home from "./components/Home/Home";

export default function App() {
    return (
        <div className="App">
            <div className="App-header">
                <Router>
                    <header className="my-header">
                        <nav>
                            <Link to="/">Home</Link>
                            <Link to="/people">Osoby</Link>
                            <Link to="/graves">Nagrobki</Link>
                            <Link to="/cemeteries">Cmentarze</Link>
                        </nav>
                    </header>
                    <Switch>
                        <Route path="/people" component={PeopleList} />
                        <Route path="/person/:id" component={PersonForm} />
                        <Route path="/graves" component={GravesList} />
                        <Route path="/grave/:id" component={GraveForm} />
                        <Route path="/cemeteries" component={CemeteriesList} />
                        <Route path="/cemetery/:id" component={CemeteryForm} />
                        <Route path="/" component={Home} />
                    </Switch>
                </Router>
            </div>
        </div>
    );
}