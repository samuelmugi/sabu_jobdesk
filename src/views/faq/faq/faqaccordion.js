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
import {Button, Divider, Header, Icon} from 'semantic-ui-react'
import Box from '@material-ui/core/Box';
import REST_APIS from "services/APiCalls/config/apiUrl";
import BackendService from "services/APiCalls/BackendService";
import STORAGE from "services/APiCalls/config/storage";
import useState from "react-usestateref";
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from "react-spinners/PropagateLoader";
import ApplyJob from "views/jobs/jobs/jobcomponents/applyjob";
import faqConstants from "views/faq/faq/faqconstant";

const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        headingAvatar: {
            fontSize: theme.typography.pxToRem(13),
            fontWeight: theme.typography.fontWeightBold,
            flexBasis: '5%',
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
const faqConstantsFields=faqConstants.faqConstantsFields;

const FaqAccordion = (props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const user = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;
    const [loading, setLoading, loadingRef] = useState(false);
    const [color, setColor] = useState("#60991f");

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            {(faqConstantsFields !== undefined && faqConstantsFields.length > 0) && faqConstantsFields.map((faq) => {
                return (
                    <>
                        <LoadingOverlay
                            active={loadingRef.current}
                            spinner={<ClipLoader color={color} loading={loadingRef.current}/>}
                        >
                            <Accordion expanded={expanded === 'panel1' + faq?.index}
                                       onChange={handleChange('panel1' + faq?.index)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography className={classes.headingAvatar}>
                                        <Icon circular inverted name='help' />

                                    </Typography>

                                    <Typography className={classes.headingJOb}>
                                        {faq?.title}
                                    </Typography>

                                </AccordionSummary>
                                <Divider/>
                                <AccordionDetails>
                                    <Box width={'100%'}>
                                      
                                         <Typography paragraph style={{whiteSpace: "pre-line"}}>
                                            {faq?.faqVal.split("\n").join("\n")}
                                        </Typography>
                                        
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                            <Divider/>
                        </LoadingOverlay>
                    </>
                )
            })}

        </div>
    );
}

export default FaqAccordion;