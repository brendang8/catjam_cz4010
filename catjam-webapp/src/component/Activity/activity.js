import React from 'react';
import { BrowserRouter as Router, Route, Switch , Link} from 'react-router-dom';
import { Tab, Tabs, AppBar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import ListActivityComponent from './listActivityComponent'

const allTabs = ["/POC/Activities/ActivityTask", "/POC/Activities/ActivityMeeting", "/POC/Activities/ActivityPhoneCall", "/POC/Activities/ActivityEmails"]
const Activity = () => {
    const classes = style();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <Router>
                <AppBar style={{ backgroundColor: 'white' }} position="static" elevation={0}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab component={Link} to={allTabs[0]} className={classes.tabText} label="All Tasks" />
                        <Tab component={Link} to={allTabs[1]} className={classes.tabText} label="All Meetings" />
                        <Tab component={Link} to={allTabs[2]} className={classes.tabText} label="Upcoming Phone Calls" />
                        <Tab component={Link} to={allTabs[3]} className={classes.tabText} label="All Emails" />
                    </Tabs>
                </AppBar>
                <div style={{ backgroundColor: 'grey', height: '2px', opacity: 0.2 }} />

                <div>
                    <Switch>
                        <Route path={allTabs[0]} component={ListActivityComponent} />
                        <Route path={allTabs[1]} render={() => <div>Tab 2</div>} />
                        <Route path={allTabs[2]} render={() => <div>Tab 3</div>} />
                        <Route path={allTabs[3]} render={() => <div>Tab 4</div>} />
                    </Switch>
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
}));

export default Activity;