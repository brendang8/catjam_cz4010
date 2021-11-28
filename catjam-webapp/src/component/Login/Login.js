import React, { Component } from 'react';
import { Typography, TextField, Button, Paper} from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch , Link} from 'react-router-dom';

import LoginPic from "../../assets/freelancer-office.jpg";
import Logo from "../../assets/catjam.png"

import SignUp from '../SignUp/SignUp'
import AuthApi from '../../Service/AuthApi'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            invalidCredentials: false,
            showSignup: false
        }
        this.outer = {
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: 'auto',
            backgroundColor: '#fafaff'
        }
        this.inner = {
            position: 'absolute',
            left: '5%',
            right: '5%',
            top: '10%',
            bottom: '10%',
            margin: 'auto',
            backgroundColor: 'white',
        }
        this.left = {
            position: 'absolute',
            right: '30%',
            left: '0%',
            top: '0%',
            bottom: '0%',
            margin: 'auto',
        }
        this.right = {
            position: 'absolute',
            left: '70%',
            top: '0%',
            right: '0%',
            bottom: '0%',
            margin: 'auto',
        }
        this.logo = {
            position: 'absolute',
            top: '10%',
            left: '0%',
        }
        this.form = {
            position: 'absolute',
            top: '42%',
            left: '20%',
            right: '20%',
            bottom: '5%',
        }
        this.buttons = {
            position: 'absolute',
            top: '55%',
            left: '0%',
            right: '0%',
        }
    }

    loginButton = () => {
        let userdetails = {
            "username": this.state.username,
            "password": this.state.password
        }
        this.setState({ invalidCredentials: false });
        AuthApi.login(userdetails, (a => {
            console.log(a.access_token)
            if (a.access_token != null) {
                localStorage.setItem("user", this.state.username);
                localStorage.setItem("access_token", a.access_token);
                localStorage.setItem("refresh_token", a.refresh_token);
                localStorage.setItem("expireDate", new Date().getTime() + (1000 * a.expires_in));
                console.log("go to home page");
                this.props.history.push('/Home');
            }
            else if (a === "Invalid credentials") {
                this.setState({ invalidCredentials: true });
                console.log("403 - Invalid credentials");
                console.log(this.state.invalidCredentials)
            }
            else {
                console.log("error")
            }
        }));
    }

    signupButton = () => {
        this.setState({ [this.state.showSignup]: true });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
                <Router>
                    <Paper style={this.outer}>
                        <Paper style={this.inner} elevation={6}>
                            <div style={this.left}>
                                <img src={LoginPic} style={{ width: '100%', height: '100%' }} alt="login pic" />
                            </div>
                            <div style={this.right}>
                                <div style={this.logo}>
                                    <img src={Logo} style={{ width: '30%', height: '30%' }} alt="company pic" />
                                </div>
                                <div style={this.form}>
                                    <Typography align='left' style={{ color: '#427caa' }}>Welcome Back.</Typography>
                                    <form style={{ marginTop: '10px' }}>
                                        <TextField
                                            id="outlined-basic1"
                                            label="Username"
                                            variant="outlined"
                                            name="username"
                                            onChange={this.handleChange}
                                            style={{ marginTop: '10px', marginBottom: '20px', width: '100%' }}
                                        />
                                        <div />
                                        <TextField
                                            id="outlined-basic2"
                                            label="Password"
                                            type="password"
                                            variant="outlined"
                                            name="password"
                                            onChange={this.handleChange}
                                            style={{ marginBottom: '20px', width: '100%' }}
                                        />
                                    </form>
                                    {this.state.invalidCredentials ? 
                                    <Typography
                                        align='right'
                                        style={{ color: 'red', marginTop: '-10px' }}
                                    > Invalid Credentials!
                                            </Typography> : null}
                                    <div style={this.buttons}>
                                        <Button onClick={this.loginButton} variant="contained" color="primary" style={{ width: '100%', marginTop: '10px' }}> Login </Button>
                                        <Button component={Link} to={`/signup`} variant="contained" color="secondary" style={{ width: '100%', marginTop: '100px' }}> Sign up </Button>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    </Paper>
                    <Switch>
                        <Route path={'/signup'} component={SignUp}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Login;