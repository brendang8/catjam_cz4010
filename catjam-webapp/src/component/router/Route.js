import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from "react-router-dom";

import Home from "../Home/Home"

import history from './history';
import PrivateRoute from "./PrivateRoute";
import Login from "../Login/Login"
import Signup from "../SignUp/SignUp"
import Base from "./RouterComponent";
import CreateBounty from "../Bounty/CreateBounty"

export default class Routes extends Component {

    render() {
        const isAuthenticated = localStorage.getItem("access_token");
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/">
                        {isAuthenticated ? 
                            <Redirect to = "/Home"/>
                            :
                            <Redirect to = "/login"/>
                        }
                        <Redirect to = "/login"/>
                    </Route>
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={Signup}/>
                    <PrivateRoute path="/Home" component={Base} />
                    <PrivateRoute path="/Home/CreateBounty" component={CreateBounty} />
                </Switch>
            </Router>
        )
    }
}