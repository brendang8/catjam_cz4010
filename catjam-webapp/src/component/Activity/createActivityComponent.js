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

import AddAssignee from "../../assets/addAssignee.png";
import SelectButton from "../../assets/selectButton.png";
import ExpandButton from "../../assets/open.png";


import ActivityApi from '../../Service/ActivityApi';
import UserApi from "../../Service/UserApi";
import OwnedByApi from "../../Service/OwnedByApi";
import AssignedToApi from "../../Service/AssignedToApi";
import RelatedToApi from "../../Service/RelatedToApi";
import HasContactApi from "../../Service/HasContactApi";

import AccountPopupComponent from "./accountPopupComponent";
import OwnerPopupComponent from './ownerPopupComponent';
import ContactPopupComponent from './contactPopupComponent';
import RelatedToPopupComponent from "./relatedToPopupComponent";

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



class createActivityComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskId: null,
            taskName: '',
            priority: 10,
            status: 10,
            completion: null,
            users: [],
            startDate: new Date(),
            endDate: new Date(),
            selectedUsers: [],
            description: '',
            selectedAccount: '',
            selectedOwner: '',
            selectedRelatedTo: '',
            selectedContact: '',

            openDrawer: false,
            openAssigneeMenu: false,
            openAccountPopup: false,
            openOwnerPopup: false,
            openContactPopup: false,
            openRelatedToPopup: false,
            openStatus: false,
            openPriority: false,

            anchorEl: null,

            message: null,
            taskAdded: false,
            showing: false,

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
            fontSize: '13px',
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
        this.formControl = {
            minWidth: 250,
        }

        this.printState = this.printState.bind(this);
        this.handleAccountPopup = this.handleAccountPopup.bind(this);
        this.handleOwnerPopup = this.handleOwnerPopup.bind(this);
        this.handleContactPopup = this.handleContactPopup.bind(this);
        this.handleRelatedToPopup = this.handleRelatedToPopup.bind(this);
        this.selectAccount = this.selectAccount.bind(this);
        this.selectOwner = this.selectOwner.bind(this);
        this.selectRelatedTo = this.selectRelatedTo.bind(this);
    }
    handleStartDateChange = (date) => {
        this.setState({ startDate: date })
    };
    handleEndDateChange = (date) => {
        this.setState({ endDate: date })
    };

    handleToggle = () => { this.setState({ openDrawer: !this.state.openDrawer }) };

    handleChange = (event, newValue) => {
        this.setState({ completion: newValue });
    };

    handleAssigneeMenu = () => { this.setState({ openAssigneeMenu: !this.state.openAssigneeMenu }) };

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleStatusChange = (event) => {
        this.setState({ status: event.target.value });
    };

    handlePriorityChange = (event) => {
        this.setState({ priority: event.target.value });
    };

    handleClose = () => {
        this.setState({ openStatus: false });
        this.setState({ openPriority: false });

    };

    handleAnchorClose = () => {
        this.setState({ anchorEl: null });
    }

    handleStatusOpen = () => {
        this.setState({ openStatus: true });
    };

    handlePriorityOpen = () => {
        this.setState({ openPriority: true });
    };

    handleAccountPopup() {
        this.setState({ openAccountPopup: !this.state.openAccountPopup });
    }

    handleContactPopup() {
        this.setState({ openContactPopup: !this.state.openContactPopup });
    }

    handleRelatedToPopup(){
        this.setState({ openRelatedToPopup: !this.state.openRelatedToPopup });
    }

    handleOwnerPopup() {
        this.setState({ openOwnerPopup: !this.state.openOwnerPopup });
    }

    handleAssigneeChange = (event) => {
        this.setState({
            selectedUsers: [...this.state.selectedUsers, event.target.value]
        })
        this.handleAnchorClose();
    };

    selectAccount = (event) => {
        const acc = event.currentTarget.value;
        this.setState({
            openAccountPopup: !this.state.openAccountPopup,
            selectedAccount: acc * 1,
        });
        console.log("==SELECT ACCOUNT==")
        console.log(acc);
    }

    selectOwner = (event) => {
        const owner = event.currentTarget.value;
        this.setState({
            openOwnerPopup: !this.state.openOwnerPopup,
            selectedOwner: owner * 1,
        });
        console.log("==SELECT OWNER==")
        console.log(owner);
    }

    selectContact = (event) => {
        const contact = event.currentTarget.value;
        this.setState({
            openContactPopup: !this.state.openContactPopup,
            selectedContact: contact*1,
        });
        console.log("==SELECT CONTACT==")
        console.log(contact);
    }

    selectRelatedTo = (event) => {
        const relatedTo = event.currentTarget.value;
        this.setState({
            openRelatedToPopup: !this.state.openRelatedToPopup,
            selectedRelatedTo: Number(relatedTo),
        });
        console.log("==SELECT RELATED TO==")
        console.log(relatedTo);
    }

    retrieveUserList() {
        UserApi.fetchUsers().then((res) => {
            this.setState({ users: res.data });
        });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    async addtask(task) {
        await ActivityApi.addTask(task)

        if (task.ownedBy !== "")
        await OwnedByApi.addOwnedBy(task.taskId, task.ownedBy);

        this.addAssign(task);
        if (task.relatedTo !== "")
            await RelatedToApi.addRelatedTo(task.taskId, task.relatedTo);

        if (task.HasContact !== "")
        await HasContactApi.addHasContact(task.taskId, task.HasContact);

        this.setState({ message: 'Task added successfully!' });
        this.setState({ taskAdded: true });
        console.log(this.state.message);
    }

    async addAssign(task) {
        for (var user of task.assignedTo) {
            await AssignedToApi.addAssignedTo(task.taskId, user)
        }
    }

    saveTask = (e) => {
        e.preventDefault();
        let task = {
            taskId: Math.floor(Math.random() * 10000),
            taskName: this.state.taskName,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            priority: this.state.priority,
            status: this.state.status,
            completion: this.state.completion,
            description: this.state.description,
            ownedBy: this.state.selectedOwner,
            HasAccount: this.state.selectedAccount,
            relatedTo: this.state.selectedRelatedTo,
            HasContact: this.state.selectedContact,
            assignedTo: this.state.selectedUsers,
        };
        console.log(task)
        this.addtask(task);
        this.setState({ showing: true });
    };

    componentDidMount() {
        this.retrieveUserList();
    }

    printState(state) {
        console.log(state);
    }

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const { openStatus } = this.state;
        const status = Boolean(openStatus);
        const { openPriority } = this.state;
        const priority = Boolean(openPriority);
        //console.log(this.state);
        return (
            <div>
                <Divider style={{ backgroundColor: 'lightblue', flex: 1, marginBottom: '10px' }} />
                <form>
                    <Typography style={this.text} align='left'>Task Name</Typography>
                    <TextField
                        label=""
                        variant="outlined"
                        style={this.textFieldSize}
                        name="taskName"
                        onChange={this.onChange}
                    />
                    <div style={{ marginTop: '10px' }} />
                    <Divider style={{ backgroundColor: 'lightblue', flex: 1, marginBottom: '10px' }} />

                    {/* =================== Assignee ===================== */}
                    <Typography style={this.text} align='left'>
                        Assignee (s)
                        </Typography>
                    <div style={{ marginTop: '10px' }}></div>
                    <TextField
                        label=""
                        value={this.state.selectedUsers}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                        style={this.textFieldSize}
                    ></TextField>
                    <Button onClick={this.handleClick} style={{ position: 'absolute', top: '19%', left: '88%', minWidth: '8px', padding: 3 }}>
                        <img src={AddAssignee} alt="Add Assignee"></img>
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={this.handleAnchorClose}
                    >
                        {this.state.users.map((el, i) => (
                            <MenuItem onClick={this.handleAssigneeChange} value={el.userId} key={i}>
                                {el.userId}
                            </MenuItem>
                        ))}
                    </Menu>


                    {/* =================== Account ===================== */}


                    <Typography style={this.text} align='left'>Account</Typography>
                    <div style={this.container}>
                        <img style={this.image} src={SelectButton} alt="select button"></img>
                        <div style={{ position: 'absolute', top: '0%', left: '50%' }}>
                            {this.state.selectedAccount}
                        </div>

                        <div component={'span'} style={this.overlay}>
                            <Button onClick={this.handleAccountPopup.bind(this)} style={{ elevation: 0, marginLeft: '7px', minWidth: '8px' }}>
                                <img src={ExpandButton} alt="expand button"></img>
                            </Button>
                        </div>
                    </div>



                    {/* =================== Contact ===================== */}
                    <Typography style={this.text} align='left'> Contact</Typography>
                    <div style={this.container}>
                        <img style={this.image} src={SelectButton} alt="select button"></img>
                        <div style={{ position: 'absolute', top: '10%', left: '50%' }}>{this.state.selectedContact}</div>
                        <div style={this.overlay}>
                            <Button onClick={this.handleContactPopup.bind(this)} style={{ elevation: 0, marginLeft: '7px', minWidth: '8px' }}>
                                <img src={ExpandButton} alt="expand button"></img>
                            </Button>
                        </div>
                    </div>


                    {/* =================== Owner ===================== */}
                    <Typography style={this.text} align='left'>Owner</Typography>
                    <div style={this.container}>
                        <img style={this.image} src={SelectButton} alt="select button"></img>
                        <div style={{ position: 'absolute', top: '10%', left: '50%' }}>{this.state.selectedOwner}</div>
                        <div style={this.overlay}>
                            <Button onClick={this.handleOwnerPopup.bind(this)} style={{ elevation: 0, marginLeft: '7px', minWidth: '8px' }}>
                                <img src={ExpandButton} alt="expand button"></img>
                            </Button>
                        </div>
                    </div>


                    {/* =================== Related To ===================== */}
                    <Typography style={this.text} align='left'>Related To</Typography>
                    <div style={this.container}>
                        <img style={this.image} src={SelectButton} alt="select button"></img>
                        <div style={{ position: 'absolute', top: '10%', left: '50%' }}>{this.state.selectedRelatedTo}</div>
                        <div style={this.overlay}>
                            <Button onClick={this.handleRelatedToPopup.bind(this)} style={{ elevation: 0, marginLeft: '7px', minWidth: '8px' }}>
                                <img src={ExpandButton} alt="expand button"></img>
                            </Button>
                        </div>
                    </div>


                    {/* =================== Start Date ===================== */}
                    <div style={{ position: 'absolute', top: '57%' }}>
                        <Typography style={this.text}>Start Date</Typography>
                    </div>

                    <div style={{ position: 'absolute', top: '56%', left: '33%' }}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    label=""
                                    value={this.state.startDate}
                                    onChange={this.handleStartDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </div>

                    {/* =================== End Date ===================== */}
                    <div style={{ position: 'absolute', top: '63%' }}>
                        <Typography style={this.text}>End Date</Typography>
                    </div>
                    <div style={{ position: 'absolute', top: '62%', left: '33%' }}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    label=""
                                    value={this.state.endDate}
                                    onChange={this.handleEndDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </div>

                    {/* =================== Priority ===================== */}
                    <div style={this.flex}>
                        <div style={{ position: 'absolute', top: '69%' }}>
                            <Typography style={this.text} align='left'>Priority</Typography>
                        </div>
                        <div style={{ position: 'absolute', top: '69%', left: '33%' }}>
                            <FormControl style={this.formControl}>
                                <Select
                                    labelId="priority"
                                    id="priority"
                                    open={priority}
                                    onClose={this.handleClose}
                                    onOpen={this.handlePriorityOpen}
                                    value={this.state.priority}
                                    onChange={this.handlePriorityChange}
                                >
                                    <MenuItem value="">
                                        <em>Priority - None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>10 - Low</MenuItem>
                                    <MenuItem value={20}>20 - Medium</MenuItem>
                                    <MenuItem value={30}>30 - High</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    {/* =================== Status ===================== */}
                    <Grid>
                        <Grid item>
                            <div style={{ position: 'absolute', top: '74%' }}>
                                <Typography style={this.text} align='left'>Status</Typography>
                            </div>
                        </Grid>
                        <Grid item xs>
                            <div style={{ position: 'absolute', top: '74%', left: '33%' }}>
                                <FormControl style={this.formControl}>
                                    <Select
                                        labelId="status"
                                        id="status"
                                        open={status}
                                        onClose={this.handleClose}
                                        onOpen={this.handleStatusOpen}
                                        value={this.state.status}
                                        onChange={this.handleStatusChange}
                                    >
                                        <MenuItem value="">
                                            <em>Status - None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>10 - New</MenuItem>
                                        <MenuItem value={20}>20 - In Process</MenuItem>
                                        <MenuItem value={30}>30 - At Risk</MenuItem>
                                        <MenuItem value={40}>40 - Blocked</MenuItem>
                                        <MenuItem value={50}>50 - Complete</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </Grid>
                    </Grid>

                    {/* =================== Completion ===================== */}
                    <Grid container spacing={1}>
                        <Grid item>
                            <div style={{ position: 'absolute', top: '80%' }}>
                                <Typography style={this.text} align='left'>Completion (%)</Typography>
                            </div>
                        </Grid>
                        <Grid item xs>
                            <div style={{ position: 'absolute', top: '80.5%', left: '33%' }}>
                                <FormControl style={this.formControl}>
                                    <Slider
                                        style={this.sliderSize}
                                        value={this.state.completion}
                                        onChange={this.handleChange}
                                        ValueLabelComponent={ValueLabelComponent}
                                        aria-label="custom thumb label"
                                    />
                                </FormControl>
                            </div>
                        </Grid>
                    </Grid>

                    {/* =================== Description ===================== */}
                    <div style={{ position: 'absolute', top: '84%' }}>
                        <Typography style={this.text} align='left'>Description</Typography>
                    </div>
                    <div style={{ position: 'absolute', top: '88%', left: '3%' }}>
                        <TextField
                            label=""
                            id="filled-size-small"
                            variant="outlined"
                            style={this.textFieldSize}
                            name="description"
                            onChange={this.onChange}
                        />
                    </div>
                    <Button style={{ position: 'absolute', top: '95%', left: '45%' }} color="primary" onClick={this.saveTask}>
                        Create
                    </Button>

                </form>
                {this.state.openAccountPopup ?
                    <AccountPopupComponent
                        text='Account'
                        closePopup={this.handleAccountPopup.bind(this)}
                        select={this.selectAccount.bind(this)}
                    />
                    : null
                }

                {this.state.openOwnerPopup ?
                    <OwnerPopupComponent
                        text='Owner'
                        closePopup={this.handleOwnerPopup.bind(this)}
                        select={this.selectOwner.bind(this)}
                    />
                    : null
                }

                {this.state.openContactPopup ?
                    <ContactPopupComponent
                        text='Contact'
                        closePopup={this.handleContactPopup.bind(this)}
                        select={this.selectContact.bind(this)}
                    />
                    : null
                }

                {this.state.openRelatedToPopup ?
                    <RelatedToPopupComponent
                        text='Related To'
                        closePopup={this.handleRelatedToPopup.bind(this)}
                        select={this.selectRelatedTo.bind(this)}
                    />
                    : null
                }

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

export default createActivityComponent;