import React, {useEffect} from 'react';
import useState from 'react-usestateref';
// reactstrap components
import {Card, CardBody, Col, Modal, Row} from 'reactstrap';
import {useHistory} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import REST_APIS from 'services/APiCalls/config/apiUrl'
import BackendService from 'services/APiCalls/BackendService';
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from "react-spinners/PropagateLoader";
import {Button, Divider, Form, Grid, Icon, Label, Select} from "semantic-ui-react";
import moment from "moment";
import STORAGE from "services/APiCalls/config/storage";
import {makeStyles} from "@material-ui/core";
import DatePicker from "react-datepicker";
import * as CandidateConstants from "views/candidate/candidate/candidateconstants";

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

const SecondarySchoolDialog = () => {
    const {push} = useHistory();
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const user = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;
    const [color, setColor] = useState("#60991f");
    const [startDate, setStartDate] = useState(new Date());
    const [loading, setLoading, loadingRef] = useState(false);
    const [isMounted, setMounted, isMountedRef] = useState(false);
    const [isEdited, setEditing, isEditedRef] = useState(false);
    const [academicValues, setAcademicValues, academicValuesRef] = useState({});
    const [academicValuesErrors, setAcademicValuesErrors, academicValuesErrorsRef] = useState({});

    const handleClickOpen = () => {
        setOpen(!open);
    };
    const handleClose = () => {
             BackendService.refershUserDetails().then(() => setOpen(false));
     };


    useEffect(() => {
        (async function () {
            if (!isMountedRef.current) {
                await initializeAcademicValues();
                setMounted(true);
            }
        })();
    }, [isEdited]);


    const initializeAcademicValues = async () => {
        academicValuesFields.map(fieldObj => {
            setAcademicValues((prevValues) => {
                return {...prevValues, [fieldObj.field]: user[fieldObj.field]};
            });
            setEditing(true);
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

                        BackendService.notifySuccess('Secondary school Data updated successfully')
                            .then(() => setLoading(false))
                            .finally(() => handleClose());
                    },
                    (error) => {
                        BackendService.notifyError('oops! error occured during personal data update. pLease try later ');
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
        <>
            <Grid stackable>
                <Grid.Column>
                    <Button as='div' labelPosition='right'
                    >
                        <Button onClick={handleClickOpen} color='green'>
                            <Icon name='edit'/>
                            Update
                        </Button>
                        <Label as='a' basic color='red' pointing='left'>
                            Secondary Details
                        </Label>
                    </Button>

                </Grid.Column>
            </Grid>

            <Modal
                className="modal-dialog-centered"
                size="xl"
                backdrop={'static'}
                isOpen={open}
                toggle={handleClickOpen}
            >
                <LoadingOverlay
                    active={loadingRef.current}
                    spinner={<ClipLoader color={color} loading={loadingRef.current}/>}
                >
                    <div className="modal-body p-0">
                        <Card className="bg-secondary shadow border-0">
                            <h3 className="h4 text-warning text-center font-weight-bold mb-4">

                                Update Secondary School Academic Details
                                <button
                                    aria-label="Close"
                                    className="close"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={handleClose}
                                >
                                    <span aria-hidden={true}>×</span>
                                </button>
                            </h3>

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
                                                    fluid selection
                                                    options={optionsGrades}
                                                    value={academicValuesRef.current?.secondaryOverallGrade}
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
                                                            setFieldValues('secondarySchoolYearOfCompletion', moment(date).format("YYYY"));
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
                                                    value={academicValuesRef.current?.mathGrade}
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
                                                    value={academicValuesRef.current?.englishGrade}
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
                                                    value={academicValuesRef.current?.kiswahiliGrade}
                                                    onChange={handleOtherSelects}
                                                    error={displayError('kiswahiliGrade') ? {
                                                        content: academicValuesErrorsRef.current?.kiswahiliGrade
                                                    } : false}
                                                    placeholder='Kiswahili'
                                                />
                                            </Form.Group>
                                            <Form.Group widths='equal'>
                                                <Form.Field
                                                    control={Select}
                                                    label='Biology'
                                                    options={optionsGrades}
                                                    value={academicValuesRef.current?.biologyGrade}
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
                                                    value={academicValuesRef.current?.physicsGrade}
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
                                                    value={academicValuesRef.current?.chemistryGrade}
                                                    placeholder='Chemistry'
                                                    name='chemistryGrade'
                                                    onChange={handleOtherSelects}
                                                    error={displayError('chemistryGrade') ? {
                                                        content: academicValuesErrorsRef.current?.chemistryGrade
                                                    } : false}
                                                />
                                            </Form.Group>



                                        </Form>
                                    </Col>
                                </Row>
                                <Divider/>
                                <Row>
                                    <Col>
                                        <Button variant="contained" positive
                                                onClick={submitAcademicValues}>
                                            Save Academic Data
                                        </Button>


                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </div>
                </LoadingOverlay>
            </Modal>


        </>
    );
}

export default SecondarySchoolDialog;