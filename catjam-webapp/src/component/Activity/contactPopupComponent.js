import React, { Component } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Paper, Button } from "@material-ui/core";

import ContactApi from '../../Service/ContactApi';

class ContactPopupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            message: null,
        }
        this.popup = {
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
            top: '25%',
            bottom: '25%',
            margin: 'auto',
            backgroundColor: 'white',
        }
        this.button = {
            marginLeft: '900px',
            position: 'absolute',
            right: '1%',
            top: '0%',
        }
        this.header = {
            backgroundColor: 'rgb(239,244,249)',
            flex: 1,
            width: '100%',
            height: '10%'
        }
        this.headerText = {
            position: 'absolute',
            left: '50%',
            top: '2%'
        }

        this.tabletop = {
            fontSize: '13px',
            fontWeight: 'bold',
            textAlign: 'left',
        }
    }


    reloadUserList() {
        ContactApi.fetchAllContacts().then(res => {
            this.setState({ contacts: res.data })
        })
    }

    componentDidMount() {
        this.reloadUserList();
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
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: "25%", fontWeight: 'bold' }} align="left">Name</TableCell>
                                    <TableCell style={{ width: "25%", fontWeight: 'bold' }} align="left" >First Name</TableCell>
                                    <TableCell style={{ width: "25%", fontWeight: 'bold' }} align="left" >Last Name</TableCell>
                                    <TableCell style={{ width: "25%", fontWeight: 'bold' }} align="left" >E-mail</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    Array.isArray(this.state.contacts) && this.state.contacts.length ?
                                        this.state.contacts.map(contacts =>
                                                <Button onClick={this.props.select} style={{ width: '400%', height: '50px' }} value={contacts.id} key={contacts.name}>
                                                    <div style={{ position: 'absolute', left: '2%' }}>{contacts.name}</div>
                                                    <div style={{ position: 'absolute', left: '27%' }}>{contacts.firstName}</div>
                                                    <div style={{ position: 'absolute', left: '52%' }}>{contacts.lastName}</div>
                                                    <div style={{ position: 'absolute', left: '77%' }}>{contacts.email}</div>
                                                </Button>
                                        )
                                        :
                                        <div style={{ width: '400%', height: '50px' }}>
                                            <TableCell style={{ position: 'absolute', left: '47%' }} > No Data </TableCell>
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

export default ContactPopupComponent;