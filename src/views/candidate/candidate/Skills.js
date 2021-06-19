import React from 'react';
// reactstrap components
import {Card, CardBody, Col, Row} from 'reactstrap';
import {Button, Divider, Form} from 'semantic-ui-react';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useState from 'react-usestateref';
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from "react-spinners/PropagateLoader";
import "react-datepicker/dist/react-datepicker.css";

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
    const [issueValues, setIssueValues, issueValuesRef] = useState({
        id: '',
        createdBy: user?.username,
        title: '',
        issue: '',
        bankSystem: ''
    });
    const [issueValuesErrors, setIssueValuesErrors, issueValuesErrorsRef] = useState({
        title: '',
        issue: '',
        bankSystem: ''
    });
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
                            />
                            <Form.Button circular positive icon="add"/>
                        </Form.Group>
                    </Form>
                    <Divider horizontal>Your Skills </Divider>
                    <Row>
                        <Col>
                            <Button disabled={props.activeStep === 0} onClick={props.handleBack}
                                    className={classes.button}>
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={props.handleNext}
                                className={classes.button}
                            >
                                Next
                            </Button>

                            {props.activeStep !== props.steps.length &&
                            (props.completed[props.activeStep] ? (
                                <Typography variant="caption" className={classes.completed}>
                                    Step {props.activeStep + 1} already completed
                                </Typography>
                            ) : (
                                <Button variant="contained" color="primary"
                                        onClick={props.handleComplete}>
                                    {props.completedSteps() === props.totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                                </Button>
                            ))}

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
