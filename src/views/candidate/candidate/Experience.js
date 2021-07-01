import React, {useEffect} from 'react';
// reactstrap components
import {Card, CardBody, Col, Row} from 'reactstrap';
import {Button, Divider, Form} from 'semantic-ui-react';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useState from 'react-usestateref';
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from "react-spinners/PropagateLoader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EmploymentHistory from './employmenthistory';
import CandidateConstants from "views/candidate/candidate/candidateconstants";
import STORAGE from "services/APiCalls/config/storage";
import BackendService from "services/APiCalls/BackendService";
import REST_APIS from "services/APiCalls/config/apiUrl";
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
    },
}));


export default function Experience(props) {
    const classes = useStyles();
    const user = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;
    const [color, setColor] = useState("#60991f");
    const [startDate, setStartDate] = useState(new Date());
    const [loading, setLoading, loadingRef] = useState(false);
    const [isMounted, setMounted, isMountedRef] = useState(false);
    const [isEdited, setEditing, isEditedRef] = useState(false);
    const [experienceValues, setExperienceValues, experienceValuesRef] = useState({});
    const [experienceValuesErrors, setExperienceValuesErrors, experienceValuesErrorsRef] = useState({});


    useEffect(() => {
        (async function () {
            if (!isMountedRef.current) {
                await initializeExperienceValues;
                setMounted(true);
            }
        })();
    }, [isEdited]);


    const initializeExperienceValues = async () => {

    }

    return (
        <> <LoadingOverlay
            active={loadingRef.current}
            spinner={<ClipLoader color={color} loading={loadingRef.current}/>}
        >
            <Card className="bg-secondary shadow border-0">

                <CardBody className="px-lg-5 py-lg-5">
                    <Row>
                        <Col>
                            <EmploymentHistory/>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row>
                        <Col>
                            <Button disabled={props.activeStep === 0} onClick={props.handleBack}
                                    className={classes.button}>
                                Back
                            </Button>
                            {props.activeStep !== props.steps.length &&
                            (props.completed[props.activeStep] ? (
                                <Typography variant="caption" className={classes.completed}>
                                    Step: Experience Data already completed
                                </Typography>
                            ) : (
                                <Button variant="contained" positive
                                        onClick={props.handleComplete}>
                                    Save Academic Data
                                </Button>
                            ))}
                            <Button
                                variant="contained"
                                color="yellow"
                                onClick={props.handleNext}
                                className={classes.button}
                            >
                                Next
                            </Button>

                        </Col>
                    </Row>
                </CardBody>
            </Card>

        </LoadingOverlay>
        </>
    );

}
Experience.propTypes = {};

Experience.defaultProps = {};
