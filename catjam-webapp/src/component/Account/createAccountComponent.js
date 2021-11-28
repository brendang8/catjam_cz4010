import React, { Component } from 'react';


import { TextField, AppBar, Toolbar, Typography, Button } from '@material-ui/core';


class CreateAccountComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            accountId:'',
            name:'',
            contact: '',
            message: null,
        }
        this.style={
            marginTop: '50px',
        };
        this.customizeToolbar= {
            minHeight: '100px',
            maxHeight: '200px',
        };
        this.appbar= {
            flexGrow: 1,
            fontSize: '30px',
            textAlign: 'center',
        };
        this.saveAccount = this.saveAccount.bind(this);
    }

    saveAccount = (e) =>{
        e.preventDefault();
        let acc = { accountId: this.state.accountId, name: this.state.name, contact: this.state.contact};
        AccountApi.addAccount(acc).then(res => {
            this.setState({message: 'Account added successfully!'});
            this.props.history.push('/accounts');
        });
    }

    onChange = (e) =>
        this.setState({[e.target.name]: e.target.value});


    render(){
        return (
            <div>
                <AppBar position="static">
                    <Toolbar style={this.customizeToolbar}>
                        <Typography style={this.appbar}>Create Account</Typography>
                    </Toolbar>
                </AppBar>
                <form autoComplete="off">
                    <div style={this.style}>
                        <TextField required id="standard-required" name="accountId" label="Id" onChange={this.onChange}/>
                    </div>
                    <div style={this.style}>
                        <TextField required id="standard-required" name="name" label="Name" onChange={this.onChange}/>
                    </div>
                    <div style={this.style}>
                        <TextField required id="standard-required" name="contact" label="Contact" onChange={this.onChange} />
                    </div>
                    <div style={this.style}>
                        <Button variant="contained" color="primary" onClick={this.saveAccount}>Create</Button>
                    </div>
                    
                </form>

                
            </div>
        )
    }
}

export default CreateAccountComponent;