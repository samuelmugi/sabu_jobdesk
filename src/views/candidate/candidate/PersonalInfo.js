import React from 'react';
// reactstrap components
import {Card, CardBody, Col, Row} from 'reactstrap';
import {Button, Divider, Form, Select} from 'semantic-ui-react';

import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useState from 'react-usestateref';
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from "react-spinners/PropagateLoader";
import DatePicker from "react-datepicker";
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
const optionsGender = [
    {key: 'm', text: 'Male', value: 'male'},
    {key: 'f', text: 'Female', value: 'female'},
    {key: 'o', text: 'Other', value: 'other'},
];
const optionsMarital = [
    {key: 'mar1', text: 'Single', value: 'Single'},
    {key: 'mar2', text: 'Married', value: 'Married'},
    {key: 'mar3', text: 'Divorced', value: 'Divorced'},
    {key: 'mar4', text: 'Widowed', value: 'Widowed'},
];
const optionsReligion = [
    {key: 'rel1', text: 'Christian', value: 'Single'},
    {key: 'rel2', text: 'Islam', value: 'Married'},
    {key: 'rel3', text: 'Hinduism', value: 'Hinduism'},
    {key: 'rel4', text: 'Other', value: 'Other'},
];
const optionsEthnicity = [
    {key: 'ethn1', text: 'Christian', value: 'Single'},
    {key: 'ethn2', text: 'Islam', value: 'Married'},
    {key: 'ethn3', text: 'Hinduism', value: 'Hinduism'},
    {key: 'ethn4', text: 'Other', value: 'Other'},
];
const optionsDisability = [
    {key: 'dis1', text: 'No', value: 'No'},
    {key: 'dis2', text: 'Yes', value: 'Yes'},
];
export default function PersonalInfo(props) {
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
                    <Row>
                        <Col>
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Input
                                        label="Title"
                                        placeholder="Mr/s."
                                        name="title"
                                    />

                                    <Form.Input
                                        label="First Name"
                                        placeholder="First Name"
                                        name="firstname"
                                    />

                                    <Form.Input
                                        label="Middle Name"
                                        placeholder="Middle Name"
                                        name="middlename"
                                    />

                                    <Form.Input
                                        label="Last Name"
                                        placeholder="Last Name"
                                        name="lastname"
                                    />

                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input
                                        label="National ID"
                                        placeholder="National ID"
                                        name="nationalid"
                                    />

                                    <Form.Field
                                        control={Select}
                                        label='Gender'
                                        options={optionsGender}
                                        placeholder='Gender'
                                    />
                                    <Form.Field>
                                        Date Of Birth <br/>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            showYearDropdown
                                            showMonthYearDropdown
                                            useShortMonthInDropdown
                                        />
                                    </Form.Field>

                                </Form.Group>

                                <Form.Group widths='equal'>
                                    <Form.Input
                                        label="email"
                                        placeholder="email address"
                                        name="emailaddress"
                                    />
                                    <Form.Input
                                        label="Mobile NUmber"
                                        placeholder="07********"
                                        name="mobile"
                                    />
                                    <Form.Input
                                        label="Postal Address"
                                        placeholder="Postal Address"
                                        name="postaladdress"
                                    /> <Form.Input
                                    label="Postal Code"
                                    placeholder="Postal Code"
                                    name="postalcode"
                                />
                                </Form.Group>

                                <Form.Group widths='equal'>
                                    <Form.Field
                                        control={Select}
                                        label='Marital Status'
                                        options={optionsMarital}
                                        placeholder='Marital Status'
                                    /> <Form.Field
                                    control={Select}
                                    label='Religion'
                                    options={optionsReligion}
                                    placeholder='Religion'
                                /> <Form.Field
                                    control={Select}
                                    label='Ethnicity'
                                    options={optionsEthnicity}
                                    placeholder='Ethnicity'
                                /> <Form.Field
                                    control={Select}
                                    label='Any Disability?'
                                    options={optionsDisability}
                                    placeholder='Any Disability?'
                                />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Field
                                        control={Select}
                                        label='Home County'
                                        options={optionsMarital}
                                        placeholder='Home County'
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='Home Sub County'
                                        options={optionsReligion}
                                        placeholder='Home Sub County'
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='Home Ward'
                                        options={optionsEthnicity}
                                        placeholder='Home Ward'
                                    />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Field
                                        control={Select}
                                        label='Residence County'
                                        options={optionsMarital}
                                        placeholder='Residence County'
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='Residence Sub County'
                                        options={optionsReligion}
                                        placeholder='Residence Sub County'
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='Residence Ward'
                                        options={optionsEthnicity}
                                        placeholder='Residence Ward'
                                    />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Divider/>
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
PersonalInfo.propTypes = {};

PersonalInfo.defaultProps = {};
