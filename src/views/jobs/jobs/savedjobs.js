import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import JobAccordion from "views/jobs/jobs/jobcomponents/JobAccordion";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    }
}));

const Savedjobs = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <JobAccordion/>
        </div>
    );
}

export default Savedjobs;