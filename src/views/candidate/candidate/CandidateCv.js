import React from 'react';
// reactstrap components
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, InputGroup, Row} from 'reactstrap';
import {Divider} from 'semantic-ui-react'

import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import UploadFiles from "components/fileupload/upload-files";

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
export default function CandidateCv(props) {
    const classes = useStyles();

    return (
        <>
            <Row>
                <Col>
                    <div className="modal-body p-0">
                        <Card className="bg-secondary shadow border-0">
                            <CardHeader className="bg-transparent pb-5">

                            </CardHeader>
                            <CardBody className="px-lg-5 py-lg-5">
                                <Form role="form">
                                     <UploadFiles />


                                    <Divider/>
                                    <div>
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
                                            <Button variant="contained" color="primary" onClick={props.handleComplete}>
                                                {props.completedSteps() === props.totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                                            </Button>
                                        ))}

                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </>
    );

}
CandidateCv.propTypes = {};

CandidateCv.defaultProps = {};
