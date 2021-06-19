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
import CandidateConstants from './candidateconstants';
import REST_APIS from 'services/APiCalls/config/apiUrl'
import BackendService from 'services/APiCalls/BackendService';
import STORAGE from 'services/APiCalls/config/storage'

const personalInfoFields = CandidateConstants.personalInfoFields;
const dropDownConstants = CandidateConstants.dropDownConstants;
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

const optionsDisability = [
    {key: 'dis1', text: 'No', value: false},
    {key: 'dis2', text: 'Yes', value: true},
];
export default function PersonalInfo(props) {
    const classes = useStyles();
    const user = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;
    const [settings, setSettings, settingsRef] = useState(dropDownConstants);
    const [color, setColor] = useState("#60991f");
    const [startDate, setStartDate] = useState(new Date());
    const [loading, setLoading, loadingRef] = useState(false);
    const [isMounted, setMounted, isMountedRef] = useState(false);
    const [isEdited, setEditing, isEditedRef] = useState(false);
    const [personalInfoValues, setPersonalInfoValues, personalInfoValuesRef] = useState({});
    const [personalInfoValuesErrors, setPersonalInfoValuesErrors, personalInfoValuesErrorsRef] = useState({});

    useEffect(() => {
        (async function () {
            if (!isMountedRef.current) {
                await BackendService.getAllSetings().then(data => setSettings(data));
                await initializePersonalInfo;
                setMounted(true);
            }
        })();
    }, [settings, isEdited,personalInfoValues]);


    const initializePersonalInfo = async () => {
        console.log(JSON.stringify(user));
        personalInfoFields.map(fieldObj => {
            setPersonalInfoValues((prevValues) => {
                return {...prevValues, [fieldObj.field]: user[fieldObj.field]};
            });
        })
    }

    const handleCounties = (e, {name, value}) => {
        setFieldValues(name, value);

        if (name === 'homeCounty') {
            BackendService.getSubCounty(value).then(subCounties => {
                setSettings((prevValues) => {
                    return {...prevValues, homeSubCounties: subCounties};
                });
            });

        } else if (name === 'countyOfResidence') {
            BackendService.getSubCounty(value).then(subCounties => {
                setSettings((prevValues) => {
                    return {...prevValues, residentSubCounties: subCounties};
                });
            });
        }

    }
    const handleSubCounties = (e, {name, value}) => {
        setFieldValues(name, value);
        if (name === 'homeSubCounty') {
            const county = personalInfoValuesRef.current?.homeCounty;
            BackendService.getWards(county, value).then(wards => {
                console.log('wards' + JSON.stringify(wards));
                setSettings((prevValues) => {
                    return {...prevValues, homeWards: wards};
                });
            })
        } else if (name === 'subCountyOfResidence') {
            const county = personalInfoValuesRef.current?.countyOfResidence;
            BackendService.getWards(county, value).then(wards => {
                setSettings((prevValues) => {
                    return {...prevValues, residentWards: wards};
                });
            });
        }
    }
    const handleWards = (e, {name, value}) => {
        setFieldValues(name, value);
    }
    const handleOtherSelects = (e, {name, value}) => {
        setFieldValues(name, value);
    }
    const setField = (e) => {
        setFieldValues(e.target.name, e.target.value);
    };
    const setFieldValues = (key, value) => {
        setPersonalInfoValues((prevValues) => {
            return {...prevValues, [key]: value};
        });
        if (!!personalInfoValuesErrorsRef.current[key])
            setPersonalInfoValuesErrors((prevValues) => {
                return {...prevValues, [key]: null};
            });
    }
    const validateValues = () => {
        let hasErrors = false;
        setEditing(true);

        const personalObj = personalInfoValuesRef.current;
        personalInfoFields.map((fieldObj) => {
            if (personalObj[fieldObj.field] === null || personalObj[fieldObj.field] === '' || personalObj[fieldObj.field] === undefined) {
                setPersonalInfoValuesErrors((prevValues) => {
                    return {...prevValues, [fieldObj.field]: fieldObj.field + ' is required'};
                });
                hasErrors = true;
            }
        });
        if (!!personalInfoValuesErrorsRef.current?.dateOfBirth) {
            BackendService.notifyError('PLease select date of birth');
        }

        console.log(JSON.stringify(personalInfoValuesErrorsRef.current))
        return hasErrors;
    }


    const submitPersonalInfo = async () => {
        const hasErrors = validateValues();
        console.log('hasErrors', hasErrors)
        if (!hasErrors) {
            setLoading(true);
            let personalInfo = personalInfoValuesRef.current;
            personalInfo.id = user.id;
            const url = REST_APIS.UPDATE_USER_DETAILS.replace('PROFILEID', user.id);
            await BackendService.putRequest(url, personalInfo)
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
            if (personalInfoValuesErrorsRef.current[key]) {
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
                        <Form.Group widths='equal'>

                            <Form.Field
                                control={Select}
                                label='Salutation'
                                placeholder='Salutation'
                                options={settingsRef.current?.salutations}
                                name='salutation'
                                onChange={handleOtherSelects}
                                error={displayError('salutation') ? {
                                    content: personalInfoValuesErrorsRef.current?.salutation
                                } : false}
                            />
                            <Form.Input
                                label="First Name"
                                placeholder="First Name"
                                name="firstName"
                                value={personalInfoValuesRef.current.firstName}
                                onChange={setField}
                                error={displayError('firstName') ? {
                                    content: personalInfoValuesErrorsRef.current?.firstName
                                } : false}
                            />

                            <Form.Input
                                label="Middle Name"
                                placeholder="Middle Name"
                                name="middleName"
                                value={personalInfoValuesRef.current.middleName}
                                onChange={setField}
                                error={displayError('middleName') ? {
                                    content: personalInfoValuesErrorsRef.current?.middleName
                                } : false}
                            />

                            <Form.Input
                                label="Last Name"
                                placeholder="Last Name"
                                name="lastName"
                                value={personalInfoValuesRef.current.lastName}
                                onChange={setField}
                                error={displayError('lastName') ? {
                                    content: personalInfoValuesErrorsRef.current?.lastName
                                } : false}
                            />

                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Input
                                label="National ID"
                                placeholder="National ID"
                                name="nationalID"
                                value={personalInfoValuesRef.current.nationalID}
                                onChange={setField}
                                error={displayError('nationalID') ? {
                                    content: personalInfoValuesErrorsRef.current?.nationalID
                                } : false}
                            />

                            <Form.Field
                                control={Select}
                                label='Gender'
                                name='gender'
                                onChange={handleOtherSelects}
                                options={optionsGender}
                                placeholder='Gender'
                                error={displayError('gender') ? {
                                    content: personalInfoValuesErrorsRef.current?.gender
                                } : false}
                            />
                            <Form.Field
                                error={displayError('dateOfBirth') ? {
                                    content: personalInfoValuesErrorsRef.current?.dateOfBirth
                                } : false}>
                                Date Of Birth <br/>
                                <DatePicker
                                    name='dateOfBirth'
                                    selected={startDate}
                                    onChange={(date) => {
                                        setFieldValues('dateOfBirth', date);
                                        setStartDate(date);
                                    }}
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
                                name="emailAddress"
                                value={personalInfoValuesRef.current.emailAddress}
                                onChange={setField}
                                error={displayError('emailAddress') ? {
                                    content: personalInfoValuesErrorsRef.current?.emailAddress
                                } : false}
                            />
                            <Form.Input
                                label="Mobile NUmber"
                                placeholder="07********"
                                name="mobileNumber"
                                value={personalInfoValuesRef.current.mobileNumber}
                                onChange={setField}
                                error={displayError('mobileNumber') ? {
                                    content: personalInfoValuesErrorsRef.current?.mobileNumber
                                } : false}
                            />
                            <Form.Input
                                label="Postal Address"
                                placeholder="Postal Address"
                                name="postalAddress"
                                value={personalInfoValuesRef.current.postalAddress}
                                onChange={setField}
                                error={displayError('postalAddress') ? {
                                    content: personalInfoValuesErrorsRef.current?.postalAddress
                                } : false}
                            />
                            <Form.Input
                                label="Postal Code"
                                placeholder="Postal Code"
                                name="postalCode"
                                value={personalInfoValuesRef.current.postalCode}
                                onChange={setField}
                                error={displayError('postalCode') ? {
                                    content: personalInfoValuesErrorsRef.current?.postalCode
                                } : false}
                            />
                        </Form.Group>

                        <Form.Group widths='equal'>
                            <Form.Field
                                control={Select}
                                label='Marital Status'
                                name='maritalStatus'
                                onChange={handleOtherSelects}
                                options={settingsRef.current?.maritals}
                                placeholder='Marital Status'
                                error={displayError('maritalStatus') ? {
                                    content: personalInfoValuesErrorsRef.current?.maritalStatus
                                } : false}
                            />
                            <Form.Field
                                control={Select}
                                label='Religion'
                                name='religion'
                                onChange={handleOtherSelects}
                                options={settingsRef.current?.religions}
                                placeholder='Religion'
                                error={displayError('religion') ? {
                                    content: personalInfoValuesErrorsRef.current?.religion
                                } : false}
                            />
                            <Form.Field
                                control={Select}
                                label='Ethnicity'
                                name='ethnicity'
                                onChange={handleOtherSelects}
                                options={settingsRef.current?.tribes}
                                placeholder='Ethnicity'
                                error={displayError('ethnicity') ? {
                                    content: personalInfoValuesErrorsRef.current?.ethnicity
                                } : false}
                            />
                            <Form.Field
                                control={Select}
                                label='Any Disability?'
                                name='disabled'
                                onChange={handleOtherSelects}
                                options={optionsDisability}
                                placeholder='Any Disability?'
                                error={displayError('disabled') ? {
                                    content: personalInfoValuesErrorsRef.current?.disabled
                                } : false}
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field
                                control={Select}
                                label='Home County'
                                name='homeCounty'
                                onChange={handleCounties}
                                options={settingsRef.current?.homeCounties}
                                placeholder='Home County'
                                error={displayError('homeCounty') ? {
                                    content: personalInfoValuesErrorsRef.current?.homeCounty
                                } : false}
                            />
                            <Form.Field
                                control={Select}
                                label='Home Sub County'
                                name='homeSubCounty'
                                onChange={handleSubCounties}
                                options={settingsRef.current?.homeSubCounties}
                                placeholder='Home Sub County'
                                error={displayError('homeSubCounty') ? {
                                    content: personalInfoValuesErrorsRef.current?.homeSubCounty
                                } : false}
                            />
                            <Form.Field
                                control={Select}
                                label='Home Ward'
                                name='homeWard'
                                onChange={handleWards}
                                options={settingsRef.current?.homeWards}
                                placeholder='Home Ward'
                                error={displayError('homeWard') ? {
                                    content: personalInfoValuesErrorsRef.current?.homeWard
                                } : false}
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field
                                control={Select}
                                label='Residence County'
                                name='countyOfResidence'
                                onChange={handleCounties}
                                options={settingsRef.current?.residentCounties}
                                placeholder='Residence County'
                                error={displayError('countyOfResidence') ? {
                                    content: personalInfoValuesErrorsRef.current?.countyOfResidence
                                } : false}
                            />
                            <Form.Field
                                control={Select}
                                label='Residence Sub County'
                                name='subCountyOfResidence'
                                onChange={handleSubCounties}
                                options={settingsRef.current?.residentSubCounties}
                                placeholder='Residence Sub County'
                                error={displayError('subCountyOfResidence') ? {
                                    content: personalInfoValuesErrorsRef.current?.subCountyOfResidence
                                } : false}
                            />
                            <Form.Field
                                control={Select}
                                name='countyOfResidenceWard'
                                label='Residence Ward'
                                onChange={handleWards}
                                options={settingsRef.current?.residentWards}
                                placeholder='Residence Ward'
                                error={displayError('countyOfResidenceWard') ? {
                                    content: personalInfoValuesErrorsRef.current?.countyOfResidenceWard
                                } : false}
                            />
                        </Form.Group>
                    </Form>

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
                                    Step: Personal Data already completed
                                </Typography>
                            ) : (
                                <Button variant="contained" positive
                                        onClick={submitPersonalInfo}>
                                    Save Personal Data
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
PersonalInfo.propTypes = {};

PersonalInfo.defaultProps = {};
