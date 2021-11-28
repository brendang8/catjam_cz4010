
import React from "react";
import { BrowserRouter as Router, Route, Switch , Link} from 'react-router-dom';

import { Drawer, List, ListItem, ListItemText, Divider, IconButton, Avatar, Menu, MenuItem ,AppBar, Toolbar, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

import Logo from "../../assets/catjam.png";

import history from './history';
import Home from '../Home/Home';
import CreateBounty from '../Bounty/CreateBounty'
import Browse from '../Bounty/Browse'

const menu = ['Home', 'Graphics & Design', 'Writing & Translation', 'Music & Audio', 'Video & Animation'];

const AppRouter = () => {
    const classes = style();
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [profileAnchor, setProfileAnchor] = React.useState(null);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    const handleProfileClick = (event) => {
        setProfileAnchor(event.currentTarget);
    };

    const handleProfileClose = () => {
        setProfileAnchor(null);
    };
    const handleLogout = () => {
        handleProfileClose();
        localStorage.clear();
        console.log("logout pressed")
        history.push('/');
        window.location.reload();
    }
    return (
        <div>
            <Router>
                <div className={classes.root}>
                    <AppBar className={classes.customizeAppBar} elevation={1} position="fixed">
                        <Toolbar className={classes.customizeToolbar}>
                            <img src={Logo} style={{ width: '2%', height: '2%' }} alt="company logo"/>
                            <span className="logo-text">catJAM</span>
                            <div className={classes.toolbarbutton}>
                                <IconButton component={Link} to={`/Home/CreateBounty`}>
                                    <AddIcon className={classes.small} />
                                </IconButton>
                                <IconButton>
                                    <NotificationsNoneIcon className={classes.small} />
                                </IconButton>

                                <IconButton onClick={handleProfileClick}>
                                    <Avatar src={Logo} className={classes.small} ></Avatar>
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={profileAnchor}
                                    keepMounted
                                    open={Boolean(profileAnchor)}
                                    onClose={handleProfileClose}
                                >
                                    <MenuItem onClick={handleProfileClose}>My Bounties</MenuItem>
                                    <MenuItem onClick={handleProfileClose}>My account</MenuItem>
                                    <MenuItem
                                        component={Link} to="/"
                                        onClick={handleLogout}>Logout
                                    </MenuItem>
                                </Menu>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Drawer classes={{ paper: classes.drawer }} variant="permanent">
                        <Toolbar />
                        <div className={classes.drawerContainer}>
                            <List>
                                {menu.map((text, index) => (
                                    <ListItem className={classes.listItemSize}
                                        selected={selectedIndex === index}
                                        button key={text}
                                        onClick={(event) => { handleListItemClick(event, index) }}
                                        component={Link} to={`/Home/${text}`}
                                    >
                                        <ListItemText classes={{ primary: classes.drawer_text }} primary={text} />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </Drawer>

                    <div className={classes.tab}>

                        <Switch>
                            <Route path={'/Home/Home'} component={Home}/>
                            <Route path={'/Home/Graphics & Design'} component={Browse}/>
                            <Route path={'/Home/CreateBounty'} component={CreateBounty}/>
                        </Switch>


                        <div>
                            <Divider style={{ backgroundColor: 'lightblue', flex: 1 }} />
                        </div>

                    </div>
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
        marginTop: '30px'
    },
    customizeAppBar: {
        display: 'flex',
        backgroundColor: '#313131',
        zIndex: theme.zIndex.drawer + 1,
    },
    customizeToolbar: {
        display: 'flex',
        minHeight: '100px',
    },
    drawer: {
        width: 360,
        flexShrink: 0,
        background: '#045476',
    },
    drawer_text: {
        color: 'white',
        fontSize: '1.2em',
    },
    listItemSize: {
        height: 50,
    },
    divider: {
        backgroundColor: 'lightblue',
    },
    marginTop: {
        marginTop: '150px',
    },
    tab: {
        marginTop: '100px',
        marginLeft: '360px',
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
    toolbarbutton: {
        marginLeft: 'auto'
    },
    small: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        color: 'white'
    },
}));

export default AppRouter;