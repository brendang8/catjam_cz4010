import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect, useHistory, Link } from 'react-router-dom'
import ListActivityComponent from "../Activity/listActivityComponent";
import React from "react";
import { AppBar, Toolbar, Typography, Button, Tabs, Tab } from '@material-ui/core';
import { Drawer, List, ListItem, ListItemText, Divider, IconButton, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CompanyLogo from "../../assets/logo.png";
import history from './history';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import SearchIcon from '@material-ui/icons/Search';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import customUI from '../../assets/customUI.png'

const menu = ['Home', 'Inbox', 'Insights', 'Accounts', 'Activities', 'Opportunities', 'Quotes', 'Products', 'Administration', 'System Processes', 'Model', 'Lookup', 'Pricing'];
const allTabs = ["/Activities/ActivityTask", "/Activities/ActivityMeeting", "/Activities/ActivityPhoneCall", "/Activities/ActivityEmails"]


const Layout = () => {
    const classes = style();
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        console.log(index);
    };
    return (
        <div>
            <Router>
                <div className={classes.root}>
                    <AppBar className={classes.customizeAppBar} elevation={1} position="fixed">
                        <Toolbar className={classes.customizeToolbar}>
                            <img src={CompanyLogo} />
                            <div className = {classes.toolbarbutton}>
                            <Button style={{ elevation: 0, minWidth: '8px' }}>
                                <img src={customUI} className={classes.small}></img>
                            </Button>
                            <IconButton>
                                <StarBorderIcon className={classes.small}/>
                            </IconButton>
                            <IconButton>
                                <SearchIcon className={classes.small}/>
                            </IconButton>
                            <IconButton>
                                <NotificationsNoneIcon className={classes.small}/>
                            </IconButton>
                            <IconButton >
                                <Avatar src={CompanyLogo} className={classes.small} ></Avatar>
                            </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Drawer classes={{ paper: classes.drawer }} variant="permanent">
                        <Toolbar />
                        <div className={classes.drawerContainer}>
                            <List>
                                {menu.map((text, index) => (
                                    <ListItem className={classes.listItemSize}
                                        selected={selectedIndex === index }
                                        button key={text}
                                        onClick={(event) => { handleListItemClick(event, index) }}
                                        component={Link} to={`/${text}`}
                                    >
                                        <ListItemText classes={{ primary: classes.drawer_text }} primary={text} />
                                    </ListItem>
                                ))}
                            </List>
                            <div className={classes.margin}>
                                <Divider className={classes.divider} />
                            </div>

                            <List>
                                {['Create Account', 'Create Contact', 'Create Lead', 'Create Opportunity', 'Create Quote'].map((text, index) => (
                                    <ListItem className={classes.listItemSize} button key={text}>
                                        <ListItemText classes={{ primary: classes.drawer_text }} primary={text} />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </Drawer>
                    
                </div>
            </Router>
        </div>
    )
}

const style = makeStyles(theme => ({
    color: 'red',
    margin: '10px',
    root: {
        display: 'flex',
    },
    drawerContainer: {
        overflow: 'auto',
    },
    customizeAppBar: {
        display: 'flex',
        backgroundColor: 'white',
        zIndex: theme.zIndex.drawer + 1,
    },
    customizeToolbar: {
        display: 'flex',
        minHeight: '40px',
    },
    drawer: {
        width: 240,
        flexShrink: 0,
        background: '#045476',
    },
    drawer_text: {
        color: 'white',
        fontSize: '0.8em',
    },
    listItemSize: {
        height: 35,
    },
    divider: {
        backgroundColor: 'lightblue',
    },

    margin: {
        marginTop: '150px',
    },

    tab: {
        marginTop: '40px',
        marginLeft: '240px',
        flex: 1
    },
    tabText: {
        textTransform: 'none',
        fontSize: "0.8em",
        color: 'grey',
    },
    drawerTabText: {
        textTransform: 'none',
        fontSize: "0.8em",
        color: 'white',
        textAlign: 'right',
    },
    indicator: {
        backgroundColor: '#0abaec',
    },
    typo: {
        color: 'black',
        textTransform: 'none',
    },
    appbar: {
        flexGrow: 1,
        fontSize: '30px',
        textAlign: 'center',

    },

    button: {
        backgroundColor: 'steelblue',
        minHeight: '100px',
        minWidth: '150px',
        maxHeight: '200px',
        maxWidth: '300px',
        margin: '100px',
    },
    toolbarbutton: {
        marginLeft: 'auto'
    },
    small: {
        width: theme.spacing(2.5),
        height: theme.spacing(2.5),
      },
}));

export default Layout;