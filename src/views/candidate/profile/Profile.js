import React from 'react';
// reactstrap components
import {Col, Row} from 'reactstrap';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ViewProfileStepper from "views/candidate/profile/viewprofilewizard";
import REST_APIS from "services/APiCalls/config/apiUrl";
import BackendService from "services/APiCalls/BackendService";
import useState from "react-usestateref";
import STORAGE from "services/APiCalls/config/storage";
import {Button} from "semantic-ui-react";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }, appBar: {
        position: 'relative',
        background: '#e0d8ca'
    }, profileVIew: {
        'overflow-y': 'scroll',
        height: '100vh',
        paddingtop: '50px',
        paddingRight: '30px',
        paddingBottom: '50px',
        paddingLeft: '80px'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

export default function MyProfile(props) {
    const user = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading, loadingRef] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const submitApplication = async () => {
        setLoading(true);
        if (user.hasOwnProperty('id')) {
            const jobApplication = {
                jobApplicantProfileId: user.id,
                jobVacancyId: props.job?.id
            };
            const url = REST_APIS.APPLY_JOB_VACANCY.replace('PROFILEID', user.id);
            await BackendService.postRequest(url, jobApplication)
                .then(() => {
                        BackendService.notifySuccess('Application Submitted successfully')

                        setTimeout(function () {
                            setLoading(false);
                            window.location.reload();
                        }, 4000);


                    },
                    (error) => {
                        BackendService.notifyError('oops! error occured during personal data update. pLease try later ');
                        setLoading(false);
                        window.location.reload();

                    }
                );

        } else {
            BackendService.notifyError('Please log in to apply for the Job.');
            setLoading(false);

        }
    }

    return (
        <>
            <Row>
                <Col>


                    <Button onClick={handleClickOpen} positive>Apply</Button>

                    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                        <AppBar position="sticky" className={classes.appBar}>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                    <CloseIcon/>
                                </IconButton>
                                <Typography variant="h6" className={classes.title}>
                                    <strong style={{color: 'red'}}> Review Profile Before submitting
                                        application</strong>
                                </Typography>
                                {props.job &&
                                <Button onClick={submitApplication} color="green">
                                    <strong>Submit Application {props.job.title}</strong>
                                </Button>
                                }
                            </Toolbar>
                        </AppBar>
                        <div className={classes.profileVIew}>

                            <ViewProfileStepper/>

                        </div>
                    </Dialog>
                </Col>
            </Row>
        </>
    );

}

