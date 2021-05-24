import './App.css';
import Form from './modules/Form'
import PeopleList  from './modules/PeopleList'
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

                        <div>
                            <nav>
                                <Link to="/">Home</Link>   <Link to="/personForm">Person Form</Link>   <Link to="/peopleList">People List</Link>
                            </nav>


                        </div>

                    </header>
                    <body>
                        <Switch>

                            <Route path="/personForm">
                                <Form />
                            </Route>
                            <Route path="/peopleList">
                                <PeopleList />
                            </Route>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </body>
                </Router>
            </div>

        </div>
    );
}

function Home() {
    return <h2>Welcome!</h2>;
}