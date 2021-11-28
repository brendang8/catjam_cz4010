import React, { Component } from 'react';
import bcrypt from 'bcryptjs';

import { Typography, TextField, Button, Paper} from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch , Link} from 'react-router-dom';

import LoginPic from "../../assets/freelancer-office.jpg";
import Logo from "../../assets/catjam.png"
import history from '../router/history';
import UserApi from '../../Service/UserApi'
import AuthApi from '../../Service/AuthApi'

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
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
            bottom: '0%',
            left: '0%',
            right: '0%',
        }
    }

    handleSignup = () => {
        const bcrypt = require("bcryptjs")
        let id = '';
        for(var i=0; i<18; ++i) id += Math.floor(Math.random() * 10);
        bcrypt.genSalt().then(salt => {
            bcrypt.hash(this.state.password, salt).then(hash => {
                console.log(hash)
                
            });
        })

        let userdetails = {
            "userId": id,
            "username": this.state.username,
            "email": this.state.email,
            "password": this.state.password
        }
        let logindetails = {
            "username": this.state.username,
            "password": this.state.password
        }
        UserApi.addUser(userdetails).then(function(response) {
            alert("Account created");
            history.push('/');
        })
        
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
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
                                <Typography align='left' style={{ color: '#427caa' }}>Sign Up</Typography>
                                <form style={{ marginTop: '10px' }}>
                                    <TextField
                                        id="outlined-basic1"
                                        label="Email"
                                        variant="outlined"
                                        name="email"
                                        onChange={this.handleChange}
                                        style={{ marginTop: '10px', marginBottom: '20px', width: '100%', height: '50px' }}
                                    />
                                    <TextField
                                        id="outlined-basic1"
                                        label="Username"
                                        variant="outlined"
                                        name="username"
                                        onChange={this.handleChange}
                                        style={{ marginBottom: '20px', width: '100%' }}
                                    />
                                    <TextField
                                        id="outlined-basic1"
                                        label="Password"
                                        variant="outlined"
                                        name="password"
                                        type="password"
                                        onChange={this.handleChange}
                                        style={{ marginBottom: '20px', width: '100%', height: '50px' }}
                                    />
                                </form>
                                <div style={this.buttons}>
                                    <Button onClick={this.handleSignup} variant="contained" color="secondary" style={{ width: '100%' }}> Sign up </Button>
                                </div>
                            </div>
                        </div>
                    </Paper>
                </Paper>
            </div>
        )

    }
}

export default SignUp;