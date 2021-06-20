import React, {useEffect} from 'react';
// reactstrap components
import {Card, CardBody, Col, Row} from 'reactstrap';
import {Button, Divider, Form} from 'semantic-ui-react';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useState from 'react-usestateref';
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from "react-spinners/PropagateLoader";
import "react-datepicker/dist/react-datepicker.css";
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


export default function Skills(props) {
    const classes = useStyles();
    const user = {username: 'mugi'};
    const [color, setColor] = useState("#60991f");
    const [startDate, setStartDate] = useState(new Date());
    const [loading, setLoading, loadingRef] = useState(false);
    const [isMounted, setMounted, isMountedRef] = useState(false);
    const [isEdited, setEditing, isEditedRef] = useState(false);
    const [skillValues, setSkillValues, skillValuesRef] = useState({});
    const [skillValuesErrors, setSkillValuesErrors, skillValuesErrorsRef] = useState({});

    useEffect(() => {
        (async function () {
            if (!isMountedRef.current) {
                await initializeSkillValues;
                setMounted(true);
            }
        })();
    }, [isEdited]);


    const initializeSkillValues = async () => {
        console.log(JSON.stringify(user));

    }
    const handleOtherSelects = (e, {name, value}) => {
        setFieldValues(name, value);
    }
    const setField = (e) => {
        setFieldValues(e.target.name, e.target.value);
    };
    const setFieldValues = (key, value) => {
        setSkillValues((prevValues) => {
            return {...prevValues, [key]: value};
        });
        if (!!skillValuesErrorsRef.current[key])
            setSkillValuesErrors((prevValues) => {
                return {...prevValues, [key]: null};
            });
    }
    const validateValues = () => {
        let hasErrors = false;
        setEditing(true);

        const personalObj = skillValuesRef.current;
        if (personalObj.skill === null || personalObj.skill === '' || personalObj.skill === undefined) {
            setSkillValuesErrors((prevValues) => {
                return {...prevValues, skill: 'Skill is required'};
            });
            hasErrors = true;
        }
        return hasErrors;
    }


    const submitSkillValues = async () => {
        const hasErrors = validateValues();
        console.log('hasErrors', hasErrors)
        if (!hasErrors) {
            setLoading(true);
            let skillValues = skillValuesRef.current;
            skillValues.id = user.id;
            const url = REST_APIS.ADD_SKILL.replace('PROFILEID', user.id);
            await BackendService.putRequest(url, skillValues)
                .then(() => {
                        props.handleComplete();
                        BackendService.notifySuccess('Personal Data updated successfully')
                        setLoading(false);
                    },
                    (error) => {
                        BackendService.notifySuccess('oops! error occured during personal data update. pLease try later ');
                        setLoading(false);
                    }
                );

        }
    }
    const displayError = (key) => {
        if (isEditedRef.current) {
            if (skillValuesErrorsRef.current[key]) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    return (
        <> <LoadingOverlay
            active={loadingRef.current}
            spinner={<ClipLoader color={color} loading={loadingRef.current}/>}
        >
            <Card className="bg-secondary shadow border-0">

                <CardBody className="px-lg-5 py-lg-5">
                    <Form>
                        <Form.Group>
                            <Form.Input
                                placeholder="Skill"
                                name="skill"
                                value={skillValuesRef.current.skill}
                                onChange={setField}
                                error={displayError('skill') ? {
                                    content: skillValuesErrorsRef.current?.skill
                                } : false}
                            />
                            <Form.Button circular positive icon="add" onClick={submitSkillValues}/>
                        </Form.Group>
                    </Form>
                    <Divider horizontal>Your Skills </Divider>
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
Skills.propTypes = {};

Skills.defaultProps = {};
