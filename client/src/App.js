import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.scss";
import PeopleList from "./components/People/PeopleList";
import PersonForm from "./components/People/PersonForm";
import PersonCard from "./components/PersonCard/PersonCard";
import GravesList from "./components/Graves/GravesList";
import GraveForm from "./components/Graves/GraveForm";
import CemeteriesList from "./components/Cemeteries/CemeteriesList";
import CemeteryForm from "./components/Cemeteries/CemeteryForm";
import Home from "./components/Home/Home";

export default function App() {
    return (
        <div className="app">
            <Router>
                <div className="navigation">
                <Link to="/">Start</Link>
                    <div className="navigation__category">
                        <div className="navigation__category-button">
                            Tabele
                        </div>
                        <div className="navigation__category-content">
                            <Link to="/people">Osoby</Link>
                            <Link to="/graves">Nagrobki</Link>
                            <Link to="/cemeteries">Cmentarze</Link>
                        </div>
                    </div>
                    
                </div>
                <div className="content">
                    <Switch>
                        
                        <Route path="/people" component={PeopleList} />
                        <Route path="/person/:id" component={PersonForm} />
                        <Route path="/personCard/:id" component={PersonCard} />
                        <Route path="/graves" component={GravesList} />
                        <Route path="/grave/:id" component={GraveForm} />
                        <Route path="/cemeteries" component={CemeteriesList} />
                        <Route path="/cemetery/:id" component={CemeteryForm} />
                        <Route path="/" component={Home} />
                    </Switch>
                </div>
                
            </Router>
        </div>
    );
}
