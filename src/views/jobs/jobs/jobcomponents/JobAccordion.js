import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {grey} from '@material-ui/core/colors';
import {Badge} from 'reactstrap';
import {Button, Divider, Header} from 'semantic-ui-react'
import Box from '@material-ui/core/Box';
import REST_APIS from "services/APiCalls/config/apiUrl";
import BackendService from "services/APiCalls/BackendService";
import STORAGE from "services/APiCalls/config/storage";
import useState from "react-usestateref";
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from "react-spinners/PropagateLoader";
import ApplyJob from "views/jobs/jobs/jobcomponents/applyjob";

const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        headingAvatar: {
            fontSize: theme.typography.pxToRem(13),
            fontWeight: theme.typography.fontWeightBold,
            flexBasis: '10%',
            flexShrink: 0,
        },
        headingCompany: {
            fontSize: theme.typography.pxToRem(14),
            fontWeight: theme.typography.fontWeightBold,
            flexBasis: '20%',
            flexShrink: 0,
        },
        headingJOb: {
            fontSize: theme.typography.pxToRem(14),
            fontWeight: theme.typography.fontWeightBold,
            flexBasis: '75%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(12),
            color: theme.palette.text.secondary,
            flexBasis: '12%',
            flexShrink: 0,

        }, lineBreak: {
            'white-space': 'pre -line'
        },
        avatar: {
            backgroundColor: grey[500],
        }
        ,
    }))
;

const JobAccordion = (props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const user = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;
    const [loading, setLoading, loadingRef] = useState(true);
    const [color, setColor] = useState("#60991f");

    setTimeout(()=>setLoading(false),3000)
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const submitApplication = async (jobid) => {
        setLoading(true);
        if (user.hasOwnProperty('id')) {
            const jobApplication = {
                jobApplicantProfileId: user.id,
                jobVacancyId: jobid.id
            };
            const url = REST_APIS.APPLY_JOB_VACANCY.replace('PROFILEID', user.id);
            await BackendService.postRequest(url, jobApplication)
                .then(() => {
                        BackendService.notifySuccess('Job Applied successfully')
                        setLoading(false);
                    },
                    (error) => {
                        BackendService.notifyError('oops! error occured during personal data update. pLease try later ');
                        setLoading(false);
                    }
                );

        } else {
            BackendService.notifyError('Please log in to apply for the Job.');
            setLoading(false);

        }
    }

    return (
        <div className={classes.root}>
            <LoadingOverlay
                active={loadingRef.current}
                spinner={<ClipLoader color={color} loading={loadingRef.current}/>}
            >    {(props?.jobs !== undefined && props?.jobs.length > 0) && props?.jobs.map((item) => {
                return (
                    <>

                            <Accordion expanded={expanded === 'panel1' + item?.id}
                                       onChange={handleChange('panel1' + item?.id)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography className={classes.headingAvatar}>
                                        <Avatar alt="Remy Sharp" src={require('assets/img/icons8-work.png')}
                                                className={classes.avatar}>
                                        </Avatar>
                                    </Typography>

                                    <Typography className={classes.headingJOb}>
                                        {item?.title}
                                    </Typography>

                                    <Typography className={classes.secondaryHeading}>
                                        <div>
                                            <Badge color="primary" pill className="mr-1">
                                                {item?.location}
                                            </Badge>
                                            <Badge color="primary" pill className="mr-1">
                                                {item?.contractType}
                                            </Badge>

                                        </div>
                                    </Typography>
                                    <Typography className={classes.secondaryHeading}>
                                        {item?.applicationDeadline}
                                    </Typography>

                                </AccordionSummary>
                                <Divider/>
                                <AccordionDetails>
                                    <Box width={'100%'}>
                                             <ApplyJob job={item}/>


                                        <Header as='h3'>Job Requirements</Header>
                                        <Typography paragraph style={{whiteSpace: "pre-line"}}>
                                            {item?.jobRequirements.split("\n").join("\n")}
                                        </Typography>
                                        <Header as='h3'>Job Description</Header>
                                        <Typography paragraph style={{whiteSpace: "pre-line"}}>
                                            {item?.jobDescription.split("\n").join("\n")}
                                        </Typography>

                                        <ApplyJob job={item}/>

                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                            <Divider/>

                    </>
                )
            })}
            </LoadingOverlay>
        </div>
    );
}

export default JobAccordion;