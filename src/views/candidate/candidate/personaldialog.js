import React, {useEffect} from 'react';
import useState from 'react-usestateref';
// reactstrap components
import {Card, CardBody, Col, Row} from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import REST_APIS from 'services/APiCalls/config/apiUrl'
import BackendService from 'services/APiCalls/BackendService';
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from "react-spinners/PropagateLoader";
import {Button, Divider, Form, Grid, Icon, Label, Select} from "semantic-ui-react";
import moment from "moment";
import STORAGE from "services/APiCalls/config/storage";
import * as CandidateConstants from "views/candidate/candidate/candidateconstants";
import {makeStyles} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import TextField from '@material-ui/core/TextField';

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
const PersonalInfoDialog = (props) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const user = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;
    const [settings, setSettings, settingsRef] = useState(dropDownConstants);
    const [color, setColor] = useState("#60991f");
    const [startDate, setStartDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [loading, setLoading, loadingRef] = useState(false);
    const [isMounted, setMounted, isMountedRef] = useState(false);
    const [isEdited, setEditing, isEditedRef] = useState(false);
    const [personalInfoValues, setPersonalInfoValues, personalInfoValuesRef] = useState({});
    const [personalInfoValuesErrors, setPersonalInfoValuesErrors, personalInfoValuesErrorsRef] = useState({});

    const handleClickOpen = () => {
        setOpen(!open);
    };
    const handleClose = () => {
        BackendService.refershUserDetails(props?.isJobApplication).then(() => setOpen(false));

    };

    useEffect(() => {
        (async function () {
            if (!isMountedRef.current) {
                BackendService.getAllSetings()
                    .then(data => setSettings(data))
                    .then(() => initializePersonalInfo());
                setMounted(true);
            }
        })();
    }, [settings, isEdited, personalInfoValues]);


    const initializePersonalInfo = () => {
        initializeDefaultData()
            .finally(() => {
                initializeCountySelect();
            })
    }
    const initializeDefaultData = async () => {
        personalInfoFields.map(fieldObj => {
            const value = user[fieldObj.field];
            setPersonalInfoValues((prevValues) => {
                return {...prevValues, [fieldObj.field]: !value ? '' : value};
            });
        });
    }

    const initializeCountySelect = () => {
        if (user?.homeCounty !== null) {
            const homeCounty = user?.homeCounty;
            const homeSubCounty = user?.homeSubCounty;
            fetchSubCounties('homeCounty', homeCounty)
                .finally(() => {
                    fetchWard('homeSubCounty', homeSubCounty);
                })
            const countyOfResidence = user?.countyOfResidence;
            const subCountyOfResidence = user?.subCountyOfResidence;
            fetchSubCounties('countyOfResidence', countyOfResidence)
                .finally(() => {
                    fetchWard('subCountyOfResidence', subCountyOfResidence);
                })
        }
    }
    const fetchSubCounties = async (name, value) => {
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
    const handleCounties = (e, {name, value}) => {
        setFieldValues(name, JSON.parse(value));
        fetchSubCounties(name, JSON.parse(value));
    }
    const fetchWard = (name, value) => {
        if (name === 'homeSubCounty') {
            const county = personalInfoValuesRef.current?.homeCounty;
            BackendService.getWards(county, value).then(wards => {
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
    const handleSubCounties = (e, {name, value}) => {
        setFieldValues(name, JSON.parse(value));
        fetchWard(name, JSON.parse(value));

    }
    const handleWards = (e, {name, value}) => {
        setFieldValues(name, JSON.parse(value));
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

        if (!personalObj.mobileNumber || personalObj.mobileNumber !== '') {
            var pattern = new RegExp(/^([0-9]{10}$)/);
            if (!pattern.test(personalObj.mobileNumber)) {
                // isValid = false;
                setPersonalInfoValuesErrors((prevValues) => {
                    return {...prevValues, mobileNumber: 'Please enter valid mobile number.'};
                });
                hasErrors = true;
            }
        }

        if (!personalObj.emailAddress || personalObj.emailAddress !== '') {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(personalObj.emailAddress)) {
                // isValid = false;
                setPersonalInfoValuesErrors((prevValues) => {
                    return {...prevValues, emailAddress: 'Please enter valid email address.'};
                });
                hasErrors = true;
            }
        }
        const isId = isNumeric(personalObj.nationalID);
        if (!isId) {
            setPersonalInfoValuesErrors((prevValues) => {
                return {...prevValues, nationalID: 'Please enter a valid id number'};
            });
            setPersonalInfoValues((prevValues) => {
                return {...prevValues, nationalID: ''};
            });
            hasErrors = true;
        }
        const dateOfBirth = moment(personalObj.dateOfBirth).format("YYYY-MM-DD")
        const isAfter = moment(dateOfBirth).isAfter();

        if (isAfter) {
            setPersonalInfoValuesErrors((prevValues) => {
                return {...prevValues, dateOfBirth: 'Date of birth is in the future'};
            });
            hasErrors = true;
            BackendService.notifyError('Date of birth is in the future');
        }
        const yearsDiff = moment().diff(dateOfBirth, 'years');
        if (yearsDiff < 18) {
            setPersonalInfoValuesErrors((prevValues) => {
                return {...prevValues, dateOfBirth: 'You must be above 18 years!'};
            });
            hasErrors = true;
            BackendService.notifyError('You must be above 18 years!');
        }
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
                .then((response) => {
                        const user = response.data?.payload;
                        props.refreshUserDetails(user);
                        BackendService.notifySuccess('Personal Data updated successfully')
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
            if (personalInfoValuesErrorsRef.current[key]) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    function isNumeric(value) {
        return /^-?\d+$/.test(value);
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
                            Profile
                        </Label>
                    </Button>

                </Grid.Column>
            </Grid>

            <Dialog
                fullWidth={true}
                maxWidth={'xl'}
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <LoadingOverlay
                    active={loadingRef.current}
                    spinner={<ClipLoader color={color} loading={loadingRef.current}/>}
                >
                    <div className="modal-body p-0">
                        <Card className="bg-secondary shadow border-0">
                            <h3 className="h4 text-warning text-center font-weight-bold mb-4">

                                Update Personal Profile
                                <button
                                    aria-label="Close"
                                    className="close"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={handleClose}
                                >
                                    <span aria-hidden={true}>??</span>
                                </button>
                            </h3>


                            <CardBody className="px-lg-5 py-lg-5">
                                <Form>
                                    <Form.Group widths='equal'>

                                        <Form.Field
                                            control={Select}
                                            label='Salutation'
                                            placeholder='Salutation'
                                            value={personalInfoValuesRef.current.salutation}
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
                                            readOnly
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
                                            value={personalInfoValuesRef.current.gender}
                                            options={optionsGender}
                                            placeholder='Gender'
                                            error={displayError('gender') ? {
                                                content: personalInfoValuesErrorsRef.current?.gender
                                            } : false}
                                        />
                                        <Form.Field error={displayError('dateOfBirth')}>
                                            {displayError('dateOfBirth') &&
                                            <>
                                                <Label basic color='red' pointing='below'>
                                                    {personalInfoValuesErrorsRef.current?.dateOfBirth}
                                                </Label><br/>
                                            </>}
                                            <TextField

                                                id="date"
                                                label="Date Of Birth"
                                                type="date"
                                                onChange={(e) => {
                                                    console.log('date=', e.target.value);
                                                    setFieldValues('dateOfBirth', moment(e.target.value).format("YYYY-MM-DD"));
                                                    setStartDate(e.target.value);
                                                }}
                                                defaultValue={moment(personalInfoValuesRef.current?.dateOfBirth).format("YYYY-MM-DD")}
                                                className={classes.textField}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />

                                        </Form.Field>

                                    </Form.Group>

                                    <Form.Group widths='equal'>
                                        <Form.Input
                                            label="email"
                                            placeholder="email address"
                                            name="emailAddress"
                                            readOnly
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
                                            type="number"
                                            readOnly
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
                                            type="number"
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
                                            value={personalInfoValuesRef.current.maritalStatus}
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
                                            value={personalInfoValuesRef.current.religion}
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
                                            value={personalInfoValuesRef.current.ethnicity}
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
                                            value={personalInfoValuesRef.current.disabled}
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
                                            value={JSON.stringify(personalInfoValuesRef.current.homeCounty)}
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
                                            value={JSON.stringify(personalInfoValuesRef.current.homeSubCounty)}
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
                                            value={JSON.stringify(personalInfoValuesRef.current.homeWard)}
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
                                            value={JSON.stringify(personalInfoValuesRef.current.countyOfResidence)}
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
                                            value={JSON.stringify(personalInfoValuesRef.current.subCountyOfResidence)}
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
                                            value={JSON.stringify(personalInfoValuesRef.current.countyOfResidenceWard)}
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

                                        <Button variant="contained" positive
                                                onClick={submitPersonalInfo}>
                                            Save Personal Data
                                        </Button>
                                        <Button onClick={handleClose} color="blue">
                                            Close
                                        </Button></Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </div>
                </LoadingOverlay>
            </Dialog>


        </>
    );
}

export default PersonalInfoDialog;