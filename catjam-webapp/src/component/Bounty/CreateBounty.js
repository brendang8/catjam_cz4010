import React, { Component } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { Typography, Button, Divider, Tooltip, Slider, Grid, Menu, MenuItem, Select, FormControl, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Alert from '@material-ui/lab/Alert';
import TaskApi from "../../Service/TaskApi"

function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
};



class CreateBounty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskId: null,
            title: '',
            description: '',
            deliveryDays: null,
            price: null,
            postedBy: null,

            openDrawer: false,
            openCategory: false,

            anchorEl: null,

            message: null,
            taskAdded: false,
            showing: false,

        }
        this.root = {
            margin: 25
        }
        this.flex = {
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '20px'
        }
        this.customizeToolbar = {
            minHeight: '100px',
            maxHeight: '200px',
        }
        this.appbar = {
            flexGrow: 1,
            fontSize: '30px',
            textAlign: 'center',
        }
        this.text = {
            fontSize: '20px',
            marginTop: '10px',
            marginLeft: '10px',
        }
        this.image = {
            width: '50%',
            marginLeft: '170px',
        }
        this.container = {
            position: 'relative',
        }
        this.textAlignImage = {
            flex: 1,
            flexDirection: "column",
        }
        this.overlay = {
            position: 'absolute',
            top: '0%',
            left: '85%'
        }
        this.textFieldSize = {
            width: 370,
        }
        this.textFieldSizeL = {
            width: 370,
            height:200
        }
        this.formControl = {
            width: 370
        }

        this.printState = this.printState.bind(this);
    }

    handleToggle = () => { this.setState({ openDrawer: !this.state.openDrawer }) };

    handleChange = (event, newValue) => {
        this.setState({ completion: newValue });
    };

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleStatusChange = (event) => {
        this.setState({ status: event.target.value });
    };

    handleCategoryChange = (event) => {
        this.setState({ category: event.target.value });
    };

    handleClose = () => {
        this.setState({ openCategory: false });

    };

    handleAnchorClose = () => {
        this.setState({ anchorEl: null });
    }

    handleCategoryOpen = () => {
        this.setState({ openCategory: true });
    };

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    async addtask(task) {
    }

    saveTask = () => {
        let task = {
            taskId: Math.floor(Math.random() * 10000),
            title: this.state.title,
            description: this.state.description,
            deliveryDays: this.state.deliveryDays,
            price: this.state.price,
            postedBy: localStorage.getItem("user")
        };
        console.log(task)
        TaskApi.addTask(task).then(function (response) {
            if (response.status == 200)
            {
                alert("Bounty Created");
                //this.setState({ showing: true });
            }
        });
    };

    componentDidMount() {
    }

    printState(state) {
        console.log(state);
    }

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const { openCategory: openCategory } = this.state;
        const category = Boolean(openCategory);
        //console.log(this.state);
        return (
            <div style={this.root}>
                <form>
                    <div style={this.flex}>
                        <Typography style={this.text} align='left'>Task Name</Typography>
                        <TextField
                            required
                            label=""
                            variant="outlined"
                            style={this.textFieldSize}
                            name="title"
                            onChange={this.onChange}
                        />
                    </div>
                    
                    <div style={{ marginTop: '10px' }} />
                    
                    {/* =================== Description ===================== */}
                    <div style={this.flex}>
                        <Typography style={this.text} align='left'>Description</Typography>
                        <TextField
                            required
                            label=""
                            id="filled-size-small"
                            variant="outlined"
                            style={this.textFieldSize}
                            multiline
                            maxRows={4}
                            name="description"
                            onChange={this.onChange}
                        />
                    </div>

                    {/* =================== Delivery ===================== */}
                    <div style={this.flex}>
                        <Typography style={this.text} align='left'>Once you place your order, when would you like your service delivered?</Typography>
                        <TextField
                            required
                            label="Days"
                            id="filled-size-small"
                            variant="outlined"
                            type="number"
                            style={this.textFieldSize}
                            name="deliveryDays"
                            onChange={this.onChange}
                        />
                    </div>

                    {/* =================== Category ===================== */}
                    <div style={this.flex}>
                        <Typography style={this.text} align='left'>Category</Typography>
                        <FormControl style={this.formControl}>
                                <Select
                                    labelId="category"
                                    id="category"
                                    open={category}
                                    onClose={this.handleClose}
                                    onOpen={this.handleCategoryOpen}
                                    value={this.state.category}
                                    onChange={this.handleCategoryChange}
                                >
                                    <MenuItem value=""></MenuItem>
                                    <MenuItem value={'GraphicsDesign'}>Graphics & Design</MenuItem>
                                    <MenuItem value={'WritingTranslation'}>Writing & Translation</MenuItem>
                                    <MenuItem value={'MusicAudio'}>Music & Audio</MenuItem>
                                </Select>
                            </FormControl>
                    </div>

                    {/* =================== Price ===================== */}
                    <div style={this.flex}>
                        <Typography style={this.text} align='left'>Price ($)</Typography>
                        <TextField
                            required
                            label="SGD"
                            id="filled-size-small"
                            variant="outlined"
                            type="number"
                            style={this.textFieldSize}
                            name="price"
                            onChange={this.onChange}
                        />
                    </div>

                    <Button color="primary" variant="contained" style={{marginTop: '20px'}} onClick={this.saveTask}>
                        Create
                    </Button>

                </form>

                {this.state.taskAdded ?
                    <div style={{ position: 'absolute', top: '50%', left: '25%', right: '25%', bottom: '50%' }}>
                        <Alert
                            style={{ display: (this.state.showing ? 'block' : 'none') }}
                            severity="success"
                            onClose={() => this.setState({ showing: !this.state.showing })}>
                            Task created!
                        </Alert>
                    </div>
                    : null
                }


            </div>
        )
    }
}

export default CreateBounty;




/*
import React, { Component } from 'react';
import { Typography, TextField, Divider, Button, Menu, MenuItem, FormControl, Select} from '@material-ui/core'

class CreateBounty extends Component {
    constructor(props) {
        super(props);
        this.root = {
            margin: 25
        }
        this.formContainer = {
            marginTop: 25
        }
        this.header = {
            fontSize: '30px'
        }
        this.text = {
            fontSize: '1.2rem'
        }
    }
    render() {
        return (
            <div style={this.root}>
                <Typography style={this.header} align='left'>Create Bounty</Typography>
                <Divider style={{ backgroundColor: 'lightblue', flex: 1, marginBottom: '10px' }} />
                <form>
                    <div style={this.formContainer}>
                        <Typography style={this.text} align='left'>Task Name</Typography>
                        <TextField 
                            required 
                            label=""
                            variant="outlined"
                            name="taskName"
                        />
                        <Typography style={this.text} align='left'>Task Description</Typography>
                        <TextField
                            label=""
                            variant="outlined"
                            name="taskName"
                        />
                        
                        <div style={this.flex}>
                            <div style={{ position: 'absolute', top: '69%' }}>
                                <Typography style={this.text} align='left'>Category</Typography>
                            </div>
                            
                            <div style={{ position: 'absolute', top: '69%', left: '33%' }}>
                                <FormControl style={this.formControl}>
                                    <Select
                                        labelId="category"
                                        id="category"
                                    >
                                        <MenuItem value={'GraphicsDesign'}>Graphics & Design</MenuItem>
                                        <MenuItem value={'WritingTranslation'}>Writing & Translation</MenuItem>
                                        <MenuItem value={'MusicAudio'}>Music & Audio</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </form>
                <Button>Create</Button>
                
            </div>
        )
    }
}

export default CreateBounty

*/