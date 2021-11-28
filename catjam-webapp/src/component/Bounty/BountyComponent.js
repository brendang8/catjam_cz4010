import React, { Component } from 'react';
import { Paper, Typography, Button, TextField, Chip} from '@material-ui/core'
import TaskApi from "../../Service/TaskApi"
import history from '../router/history';

class BountyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accepted: false
        }
        this.root = {
            width: 400,
            height: 'auto',
            margin: 25
        }
        this.text = {
            fontSize: '16px',
            marginTop: '10px',
        }
        this.textField = {
            fontSize: '16px',
            marginTop: '10px',
            marginLeft: '10px',
            background: '#e6e6e6',
        }

        this.flex = {
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '20px',
            margin: 20
        }
    }

    handleAccept = () => {
        const user = localStorage.getItem("user");
        TaskApi.updateAssignedTo(this.props.taskId, user).then(function (response) {
            if (response.status == 200)
            {
                alert("Bounty Accepted");
            }
        });
    }

    render() {
        const user = localStorage.getItem("user")
        return (
            <div>
                <Paper style={this.root} elevation={6}>
                    <div style={this.flex}>
                        <Typography align='left' style={this.text}>Posted By</Typography>
                        <TextField
                            id="outlined-read-only-input"
                            defaultValue={this.props.postedBy}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>
                    <div style={this.flex}>
                        <Typography align='left' style={this.text}>Title</Typography>
                        <TextField
                            id="outlined-read-only-input"
                            defaultValue={this.props.title}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>
                    <div style={this.flex}>
                        <Typography align='left' style={this.text}>Description</Typography>
                        <TextField
                            id="outlined-read-only-input"
                            defaultValue={this.props.description}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>
                    <div style={this.flex}>
                        <Typography align='left' style={this.text}>Category</Typography>
                        <TextField
                            id="outlined-read-only-input"
                            defaultValue={this.props.category}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>
                    <div style={this.flex}>
                        <Typography align='left' style={this.text}>Delivery Days</Typography>
                        <TextField
                            id="outlined-read-only-input"
                            defaultValue={this.props.deliveryDays}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>
                    <div style={this.flex}>
                        <Typography align='left' style={this.text}>Price</Typography>
                        <TextField
                            id="outlined-read-only-input"
                            defaultValue={this.props.price}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>
                    {user != this.props.postedBy ? (
                        <Button color="primary" variant="contained" style={{marginBottom: '20px'}} onClick={this.handleAccept}>Accept</Button>
                        )
                        :
                        <div/>
                    }   
                </Paper>
            </div>
        )
    }
}
export default BountyComponent