import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import JobAccordion from "views/jobs/jobs/jobcomponents/JobAccordion";

const useJobStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    }
}));

const Alljobs = () => {
    const classes = useJobStyles();


    return (
        <div className={classes.root}>
            <JobAccordion/>

        </div>
    );
}

export default Alljobs;