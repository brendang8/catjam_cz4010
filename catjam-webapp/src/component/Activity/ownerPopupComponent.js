import React, { Component } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { Table, Button, TableContainer, TableHead, TableRow, TableBody, TableCell, Paper} from "@material-ui/core";

import UserApi from "../../Service/UserApi";

class OwnerPopupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
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
    

    reloadUserList() {

        UserApi.fetchUsers().then(res => {
            console.log(res);
            this.setState({users: res.data})
        });
    }

    componentDidMount(){
        this.reloadUserList();
        console.log(this.state.users);
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
                                    <TableCell style={{ width: "50%", fontWeight: 'bold' }} align="left">User Id</TableCell>
                                    <TableCell style={{ width: "50%", fontWeight: 'bold' }} align="left" >Username</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                Array.isArray(this.state.users) && this.state.users.length ?
                                    this.state.users.map(user => 
                                        <Button onClick={this.props.select} style={{width: '200%', height: '50px'}} value={user.userId} key={user.userId}>
                                            <div style={{position: 'absolute', left: '2%'}}>{user.userId}</div>
                                            <div style={{position: 'absolute', left: '52%'}}>{user.username}</div>
                                        </Button>
                                    )
                                :
                      
                                    <TableCell style={{position: 'absolute', left: '47%'}} > No Data </TableCell>
                      
                                
                                
                            }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        )
    }
}

export default OwnerPopupComponent;