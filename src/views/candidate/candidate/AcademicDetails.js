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
import PostSecondary from './postsecondary';
import ProfessionalQualification from './professionalqualification';

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

const optionsGrades = [
    {key: 'A', text: 'A', value: 'A'},
    {key: 'A-', text: 'A-', value: 'A-'},
    {key: 'B+', text: 'B+', value: 'B+'},
    {key: 'B', text: 'B', value: 'B'},
    {key: 'B-', text: 'B-', value: 'B-'},
    {key: 'C+', text: 'C+', value: 'C+'},
    {key: 'C', text: 'C', value: 'C'},
    {key: 'C-', text: 'C-', value: 'C-'},
    {key: 'D+', text: 'D+', value: 'D+'},
    {key: 'D', text: 'D', value: 'D'},
    {key: 'D-', text: 'D-', value: 'D-'},
    {key: 'E', text: 'E', value: 'E'},
];
export default function AcademicDetails(props) {
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
                                        label="Secondary School"
                                        placeholder="Secondary School"
                                        name="secondaryschool"
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='Grade'
                                        options={optionsGrades}
                                        placeholder='Grade'
                                    />
                                    <Form.Field>
                                        Year Of Completion<br/>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            showYearPicker
                                            dateFormat="yyyy"
                                        />
                                    </Form.Field>


                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Field
                                        control={Select}
                                        label='Mathematics'
                                        options={optionsGrades}
                                        placeholder='Mathematics'
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='English'
                                        options={optionsGrades}
                                        placeholder='English'
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='Kiswahili'
                                        options={optionsGrades}
                                        placeholder='Kiswahili'
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='Biology'
                                        options={optionsGrades}
                                        placeholder='Biology'
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='Physics'
                                        options={optionsGrades}
                                        placeholder='Physics'
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='Chemistry'
                                        options={optionsGrades}
                                        placeholder='Chemistry'
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Field
                                        control={Select}
                                        label='Attach Certificate (pdf or image)'
                                        placeholder='Attach Certificate (pdf or image'
                                        type="file"
                                    />
                                </Form.Group>
                                <Divider horizontal>Post Secondary School Qualification eg Diploma, Bachelors,
                                    Masters.</Divider>
                                <PostSecondary/>
                                <Divider horizontal>Professional Qualification/Membership eg CPA, CCNA, Nursing Council
                                    of Kenya..</Divider>
                                <ProfessionalQualification/>

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
AcademicDetails.propTypes = {};

AcademicDetails.defaultProps = {};
