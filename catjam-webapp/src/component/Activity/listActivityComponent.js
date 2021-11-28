import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel,
    Toolbar, Drawer, Typography, Paper, Checkbox, IconButton, Tooltip,
    Button
} from '@material-ui/core'
import FilterListIcon from '@material-ui/icons/FilterList';
import Alert from '@material-ui/lab/Alert';


import CloseButton from "../../assets/close.png";
import CreateButton from "../../assets/create.png";
import DeleteIcon1 from '../../assets/delete.png';

import ActivityApi from "../../Service/ActivityApi";
import CreateActivity from './createActivityComponent';

const drawerWidth = 400;

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function deleteTasks(selected) {
    var i;
    console.log("Delete Triggered")
    console.log(selected)
    for (i = 0; i < selected.length; i++) {
        console.log("Deleting ... " + selected[i])
        ActivityApi.deleteTask(selected[i]);
    }
}

const headCells = [
    { id: 'status', numeric: false, disablePadding: true, label: 'Status' },
    { id: 'taskName', numeric: false, disablePadding: true, label: 'Task Name' },
    { id: 'startDate', numeric: false, disablePadding: true, label: 'Start Date' },
    { id: 'endDate', numeric: false, disablePadding: true, label: 'Due Date' },
    { id: 'relatedTo', numeric: false, disablePadding: true, label: 'Reference' },
    { id: 'ownedBy', numeric: false, disablePadding: true, label: 'Owner' },
    { id: 'priority', numeric: false, disablePadding: true, label: 'Priority' },
];


const useToolbarStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1)
    },
    highlight:
        theme.palette.type === "light"
            ? {
                color: theme.palette.primary.main,
                backgroundColor: lighten(theme.palette.primary.light, 0.85)
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.primary.dark
            },
    title: {
        flex: "1 1 100%",
        fontSize: "18px",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        background: '#045476',
    },
    drawerPaper: {
        width: drawerWidth
    },

}));

const EnhancedTableToolbar = props => {

    const [deletedAlert, setDeletedAlert] = React.useState(false);
    const classes = useToolbarStyles();
    const { numSelected } = props;
    const { selected } = props;


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleCloseAlert = () => {
        setDeletedAlert(false);
    };
    const handleOpenAlert = () => {
        setDeletedAlert(true);
    };

    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <Toolbar
                className={clsx(classes.root, {
                    [classes.highlight]: numSelected > 0
                })}
                style={{ minHeight: '25px' }}
            >
                <Tooltip component={'span'} title="Add Tasks">
                    <Button style={{ minWidth: '8px' }} onClick={handleDrawerOpen}>
                        <img src={CreateButton} alt="create button" />
                    </Button>
                </Tooltip>

                <Tooltip component={'span'} title="Delete">
                    <Button
                        aria-label="delete"
                        onClick={() => { deleteTasks(selected); handleOpenAlert() }}
                        disabled={(numSelected > 0) ? false : true}
                        style={{ marginLeft: '10px', minWidth: '8px' }}
                    >
                        <img style={{ opacity: numSelected > 0 ? 1 : 0.2 }} src={DeleteIcon1} alt="delete icon" />
                    </Button>
                </Tooltip>

                <Typography
                    className={classes.title}
                    variant="h6"
                    id="tableTitle"
                    component={'span'}
                >
                    Tasks
                    </Typography>
                <Typography
                    className={classes.title}
                    color="inherit"
                    variant="subtitle1"
                    component={'span'}
                >
                    {numSelected} selected
                </Typography>

                <Tooltip component={'span'} title="Filter list">
                    <IconButton style={{ padding: 5 }} aria-label="filter list">
                        <FilterListIcon color="primary" />
                    </IconButton>
                </Tooltip>

                {deletedAlert ?
                    <div style={{ position: 'absolute', top: '50%', left: '25%', right: '25%', bottom: '50%' ,zIndex: 1 }}>
                        <Alert
                            style={{ display: (deletedAlert ? 'block' : 'none') }}
                            severity="success"
                            onClose={handleCloseAlert}>
                            Task(s) Deleted!</Alert>
                    </div>
                    : null
                }


            </Toolbar>
            <div style={{ backgroundColor: 'grey', height: '2px', opacity: 0.2 }} />
            <Drawer className={classes.drawer} anchor="right" variant="persistent" open={open} classes={{
                paper: classes.drawerPaper
            }}>
                <Button onClick={handleDrawerClose} style={{ marginRight: '360px', marginTop: '40px', elevation: 0, minWidth: '3px' }}>
                    <img src={CloseButton} alt="close button"></img>
                </Button>
                <CreateActivity />
            </Drawer>
        </div>

    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    selected: PropTypes.array
};


function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all tasks' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    customizeToolbar: {
        minHeight: '40px',
    },
    icon: {
        width: 50,
        height: 50,
        fontSize: '20px',
    },

    selected: {
        color: "#64b5f6"
    },

    tableRow: {
        "&$selected:selected": {
            backgroundColor: "blue"
        }
    },
}));


const getData = () => {
    const rows = []
    ActivityApi.fetchAllTask((tasks => {
        tasks.forEach(v => {
            rows.push(v)
        })
    }));
    return rows
}

export default function EnhancedTable() {
    const classes = useStyles();
    const [rows, setTaskData] = React.useState(getData);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('Task Name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    //const [, updateState] = React.useState();
    //const forceUpdate = React.useCallback(() => updateState({}), []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.taskId);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>

            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} selected={selected} setTaskData={setTaskData} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.taskId);
                                    const labelId = `enhanced-table-checkbox-${index}`;


                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.taskId)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.taskName}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell>{row.status}</TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none">
                                                {row.taskName}
                                            </TableCell>
                                            <TableCell align="left">{row.startDateString}</TableCell>
                                            <TableCell align="left">{row.endDateString}</TableCell>
                                            <TableCell align="left">{row.relatedTo}</TableCell>
                                            <TableCell align="left">{row.ownedBy}</TableCell>
                                            <TableCell align="left">{row.priority}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
