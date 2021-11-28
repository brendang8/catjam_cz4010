import React, { Component } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { Table, Button, TableContainer, TableHead, TableRow, TableBody, TableCell, Paper } from "@material-ui/core";
import AccountApi from "../../Service/AccountApi";

class AccountPopupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            message:null,
        }
        this.popup={
            position: 'fixed',
            width: '100%',
            height: '100%',  
            top: 0,  
            left: 0,  
            right: 0,  
            bottom: 0,  
            margin: 'auto',  
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }
        this.popupInner = {
            position: 'absolute',
            left: '25%',
            right: '25%',
            top:'25%',
            bottom: '25%',
            margin: 'auto', 
            backgroundColor: 'white',  
        }
        this.button = {
            marginLeft: '900px',
            position: 'absolute',
            right: '1%',
            top:'0%',
        }
        this.header = {
            backgroundColor: 'rgb(239,244,249)',
            flex:1,
            width: '100%',
            height: '10%'
        }
        this.headerText = {
            position: 'absolute',
            left: '50%',
            top: '2%'
        }
        
        this.tabletop={
            fontSize: '13px',
            fontWeight:'bold',
            textAlign: 'left',
        }
    }
    

    reloadAccList() {
        AccountApi.fetchAllAccounts().then(res => {
            this.setState({accounts: res.data})
        });
    }

    componentDidMount(){
        this.reloadAccList();
    }

    render() {
        return (
            <div style={this.popup}>
                <div style={this.popupInner}>
                        <div style={this.header}>
                            <div style={this.headerText}>
                                {this.props.text}
                            </div>
                            <IconButton style={this.button} onClick={this.props.closePopup}>
                                <CloseIcon/>
                            </IconButton>    
                        </div>              
                        <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: "35%", fontWeight: 'bold' }} align="left">Id</TableCell>
                                    <TableCell style={{ width: "35%", fontWeight: 'bold' }} align="left" >Name</TableCell>
                                    <TableCell style={{ width: "30%", fontWeight: 'bold' }} align="left">Contact</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                Array.isArray(this.state.accounts) && this.state.accounts.length ?
                                    this.state.accounts.map(acc => 
                                        <Button onClick={this.props.select} style={{width: '285%', height: '50px'}} key={acc.id} value={acc.accountId}>
                                            <div style={{position: 'absolute', left: '2%'}}>{acc.accountId}</div>
                                            <div style={{position: 'absolute', left: '37%'}}>{acc.name}</div>
                                            <div style={{position: 'absolute', left: '72%'}}>{acc.contact}</div>
                                        </Button>
                                    )
                                :
                                <div style={{width: '285%', height: '50px'}}>
                                    <TableCell style={{position: 'absolute', left: '47%'}} > No Data </TableCell>
                                </div>
                            }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        )
    }
}

export default AccountPopupComponent;