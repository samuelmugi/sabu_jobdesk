import React, {useEffect} from 'react';
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
import BackendService from "services/APiCalls/BackendService";
import REST_APIS from "services/APiCalls/config/apiUrl";
import STORAGE from "services/APiCalls/config/storage";
import CandidateConstants from "views/candidate/candidate/candidateconstants";

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

const academicValuesFields = CandidateConstants.academicValuesFields;


export default function AcademicDetails(props) {
    const classes = useStyles();
    const user = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;
    const [color, setColor] = useState("#60991f");
    const [startDate, setStartDate] = useState(new Date());
    const [loading, setLoading, loadingRef] = useState(false);
    const [isMounted, setMounted, isMountedRef] = useState(false);
    const [isEdited, setEditing, isEditedRef] = useState(false);
    const [academicValues, setAcademicValues, academicValuesRef] = useState({});
    const [academicValuesErrors, setAcademicValuesErrors, academicValuesErrorsRef] = useState({});


    useEffect(() => {
        (async function () {
            if (!isMountedRef.current) {
                await initializeAcademicValues;
                setMounted(true);
            }
        })();
    }, [isEdited]);


    const initializeAcademicValues = async () => {
        console.log(JSON.stringify(user));
        academicValuesFields.map(fieldObj => {
            setAcademicValues((prevValues) => {
                return {...prevValues, [fieldObj.field]: user[fieldObj.field]};
            });
        })
    }
    const handleOtherSelects = (e, {name, value}) => {
        setFieldValues(name, value);
    }
    const setField = (e) => {
        setFieldValues(e.target.name, e.target.value);
    };
    const setFieldValues = (key, value) => {
        setAcademicValues((prevValues) => {
            return {...prevValues, [key]: value};
        });
        if (!!academicValuesErrorsRef.current[key])
            setAcademicValuesErrors((prevValues) => {
                return {...prevValues, [key]: null};
            });
    }
    const validateValues = () => {
        let hasErrors = false;
        setEditing(true);

        const personalObj = academicValuesRef.current;
        academicValuesFields.map((fieldObj) => {
            if (personalObj[fieldObj.field] === null || personalObj[fieldObj.field] === '' || personalObj[fieldObj.field] === undefined) {
                setAcademicValuesErrors((prevValues) => {
                    return {...prevValues, [fieldObj.field]: fieldObj.field + ' is required'};
                });
                hasErrors = true;
            }
        });
        if (!!academicValuesErrorsRef.current?.dateOfBirth) {
            BackendService.notifyError('PLease select date of birth');
        }

        console.log(JSON.stringify(academicValuesErrorsRef.current))
        return hasErrors;
    }


    const submitAcademicValues = async () => {
        const hasErrors = validateValues();
        console.log('hasErrors', hasErrors)
        if (!hasErrors) {
            setLoading(true);
            let academicValues = academicValuesRef.current;
            academicValues.id = user.id;
            const url = REST_APIS.ADD_SECONDARY_SCHOOL.replace('PROFILEID', user.id);
            await BackendService.putRequest(url, academicValues)
                .then(() => {
                        BackendService.notifySuccess('Personal Data updated successfully')
                        setLoading(false);
                        props.handleComplete();
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
            if (academicValuesErrorsRef.current[key]) {
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
                    <Row>
                        <Col>
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Input
                                        label="Secondary School"
                                        placeholder="Secondary School"
                                        name="secondarySchoolName"
                                        value={academicValuesRef.current.secondarySchoolName}
                                        onChange={setField}
                                        error={displayError('secondarySchoolName') ? {
                                            content: academicValuesErrorsRef.current?.secondarySchoolName
                                        } : false}
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='Grade'
                                        options={optionsGrades}
                                        placeholder='Grade'
                                        name='secondaryOverallGrade'
                                        onChange={handleOtherSelects}
                                        error={displayError('secondaryOverallGrade') ? {
                                            content: academicValuesErrorsRef.current?.secondaryOverallGrade
                                        } : false}
                                    />
                                    <Form.Field error={displayError('secondarySchoolYearOfCompletion') ? {
                                        content: academicValuesErrorsRef.current?.secondarySchoolYearOfCompletion
                                    } : false}>
                                        Year Of Completion<br/>
                                        <DatePicker
                                            selected={startDate}
                                            name='secondarySchoolYearOfCompletion'
                                            onChange={(date) => {
                                                setFieldValues('secondarySchoolYearOfCompletion', date);
                                                setStartDate(date);
                                            }} showYearPicker
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
                                        name='mathGrade'
                                        onChange={handleOtherSelects}
                                        error={displayError('mathGrade') ? {
                                            content: academicValuesErrorsRef.current?.mathGrade
                                        } : false}
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='English'
                                        options={optionsGrades}
                                        placeholder='English'
                                        name='englishGrade'
                                        onChange={handleOtherSelects}
                                        error={displayError('englishGrade') ? {
                                            content: academicValuesErrorsRef.current?.englishGrade
                                        } : false}
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='Kiswahili'
                                        options={optionsGrades}
                                        name='kiswahiliGrade'
                                        onChange={handleOtherSelects}
                                        error={displayError('kiswahiliGrade') ? {
                                            content: academicValuesErrorsRef.current?.kiswahiliGrade
                                        } : false}
                                        placeholder='Kiswahili'
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='Biology'
                                        options={optionsGrades}
                                        placeholder='Biology'
                                        name='biologyGrade'
                                        onChange={handleOtherSelects}
                                        error={displayError('biologyGrade') ? {
                                            content: academicValuesErrorsRef.current?.biologyGrade
                                        } : false}
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='Physics'
                                        options={optionsGrades}
                                        placeholder='Physics'
                                        name='physicsGrade'
                                        onChange={handleOtherSelects}
                                        error={displayError('physicsGrade') ? {
                                            content: academicValuesErrorsRef.current?.physicsGrade
                                        } : false}
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='Chemistry'
                                        options={optionsGrades}
                                        placeholder='Chemistry'
                                        name='chemistryGrade'
                                        onChange={handleOtherSelects}
                                        error={displayError('chemistryGrade') ? {
                                            content: academicValuesErrorsRef.current?.chemistryGrade
                                        } : false}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Field
                                        control={Select}
                                        label='Attach Certificate (pdf or image)'
                                        placeholder='Attach Certificate (pdf or image'
                                        type="file"
                                        name='salutation'
                                        onChange={handleOtherSelects}
                                        error={displayError('salutation') ? {
                                            content: academicValuesErrorsRef.current?.salutation
                                        } : false}
                                    />
                                </Form.Group>
                                <Divider horizontal>Post Secondary School Qualification eg Diploma, Bachelors,
                                    Masters.</Divider>
                                <PostSecondary/>
                                {/*<Divider horizontal>Professional Qualification/Membership eg CPA, CCNA, Nursing Council*/}
                                {/*    of Kenya..</Divider>*/}
                                {/*<ProfessionalQualification/>*/}

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
                            {props.activeStep !== props.steps.length &&
                            (props.completed[props.activeStep] ? (
                                <Typography variant="caption" className={classes.completed}>
                                    Step: Academic Data already completed
                                </Typography>
                            ) : (
                                <Button variant="contained" positive
                                        onClick={submitAcademicValues}>
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
AcademicDetails.propTypes = {};

AcademicDetails.defaultProps = {};
