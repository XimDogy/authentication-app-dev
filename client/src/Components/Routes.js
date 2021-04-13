import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Footer from '../Components/Footer/Footer';
import Home from '../Components/Home/Home.js';
import Login from '../Components/Login/Login';
import Register from '../Components/Register/Register';
import NotFound from '../Components/NotFound/NotFound';

const Routes = () => {
    return (
        <Router>
                   
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>

                <Route path="/login" exact>
                    <Login />
                </Route>

                <Route path="/register" exact>
                    <Register />
                </Route>

                <Route>
                    <NotFound />
                </Route>
            </Switch>


                <Footer />   

            </Router>
    )
}

export default Routes
