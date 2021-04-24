import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profile from './Components/Profile/Profile';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';


const App = () => {
    return (
        <div className="container">
            <Router>
            
            <Switch>
                <Route path="/" exact>
                    <Profile />
                </Route>

                <Route path="/login" exact>
                    <Login />
                </Route>

                <Route path="/register" exact>
                    <Register  />
                </Route>

                <Route>
                    <NotFound />
                </Route>
            </Switch>
            </Router>
        </div>
    )
}

export default App