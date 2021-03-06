import React, { Component } from 'react';
import { Paper, Typography, Button, TextField, Chip} from '@material-ui/core'
import UploadApi from '../../Service/UploadApi';

class AcceptedBountyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
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

    handleFileSelect = (e) => {
        this.setState({file: e.target.files[0]})
    }

    fileUpload = () => {
        const fd = new FormData();
        fd.append('image', this.state.file, this.state.file.name);
        UploadApi.upload(fd);
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
                    <input type="file" onChange={this.handleFileSelect}/>
                    <Button onClick={this.fileUpload} color="primary" variant="contained" style={{marginBottom: '20px'}}>Upload File</Button> 
                </Paper>
            </div>
        )
    }
}
export default AcceptedBountyComponent