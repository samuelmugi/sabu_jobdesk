import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import Cvwizard from './Cvwizard';
import { Button } from 'semantic-ui-react'


const useStyles = makeStyles((theme) => ({
    appBar: {
        color: !'yellow',
        position: 'relative',
        background: '#e0d8ca'

    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Uploadcv() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <React.Fragment>


            <Button   onClick={handleClickOpen} positive>
                Create or Update profile...
            </Button>


            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="secondary" onClick={handleClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Build my profile
                        </Typography>
                        <Button autoFocus  onClick={handleClose}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>
                <Cvwizard/>
            </Dialog>

        </React.Fragment>
    );
}
