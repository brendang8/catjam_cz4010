import React, { Component } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Paper } from "@material-ui/core";
import AccountApi from "../../Service/AccountApi";
import { Button } from '@material-ui/core';

class ListAccountComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accounts: [],
            message: null
        }
        this.customizeToolbar= {
            minHeight: '100px',
            maxHeight: '200px',
        };
        this.appbar= {
            flexGrow: 1,
            fontSize: '30px',
            textAlign: 'center',
        };
        this.tabletop={
            fontSize: '13px',
            fontWeight:'bold',
            textAlign: 'center',
        }
        this.tablecontent={
            textAlign: 'center',
        }
        this.margin={
            margin: '50px',
        }
        this.deleteAccount = this.deleteAccount.bind(this);
        this.editAccount = this.editAccount.bind(this);
        this.addAccount = this.addAccount.bind(this);
        this.reloadAccList = this.reloadAccList.bind(this);
    }

    reloadAccList() {

        this.setState({accounts: AccountApi.fetchAllAccounts()})
    }

    componentDidMount() {
        this.reloadAccList();
    }

    deleteAccount(accountId) {
        AccountApi.deleteUser(accountId)
           .then(res => {
               this.setState({message : 'Account deleted successfully.'});
               this.setState({accounts: this.state.accounts.filter(account => account.accountId !== accountId)});
           })

    }

    editAccount(accountId) {
        window.localStorage.setItem("accountId", accountId);
        this.props.history.push('/edit-account');
    }

    addAccount() {
        window.localStorage.removeItem("accountId");
        this.props.history.push('/add-account');
    }

    render() {
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table className="table table-striped">
                        <TableHead>
                            <TableRow>
                                <TableCell className="hidden" style = {this.tabletop}>Id</TableCell>
                                <TableCell style = {this.tabletop}>Name</TableCell>
                                <TableCell style = {this.tabletop}>Contact</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.accounts.map(
                                    acc =>
                                        <Button onClick={this.props.closePopup} style={{width: '137%', height: '50px'}} value={acc.accountId} key={acc.accountId}>
                                            <div style={{position: 'absolute', left: '35%'}}>{acc.accountId}</div>
                                            <div style={{position: 'absolute', left: '70%'}}>{acc.name}</div>
                                            <div style={{position: 'absolute', left: '90%'}}>{acc.contact}</div>
                                        </Button>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                {/*
                <Button style={this.margin} variant="contained" color="primary" onClick={() => history.push('/accounts/create')}>Create Account</Button>
                <Button style={this.margin} variant="contained" color="primary" onClick={() => history.push('/')}>Back</Button>
                */}
                
            </div>
            
            
        );
    }

}

export default ListAccountComponent;
