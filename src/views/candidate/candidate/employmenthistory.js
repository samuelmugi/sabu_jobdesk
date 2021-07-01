import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Button, Form, Grid, Icon, Label} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useState from "react-usestateref";
import CandidateConstants from "views/candidate/candidate/candidateconstants";
import BackendService from "services/APiCalls/BackendService";
import REST_APIS from "services/APiCalls/config/apiUrl";
import LoadingOverlay from "react-loading-overlay";
import ClipLoader from "react-spinners/PropagateLoader";
import STORAGE from "services/APiCalls/config/storage";
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));
const employmentValuesFields = CandidateConstants.experienceValuesFields;


export default function EmploymentHistory() {
    const user = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [color, setColor] = useState("#60991f");
    const [loading, setLoading, loadingRef] = useState(false);
    const [isMounted, setMounted, isMountedRef] = useState(false);
    const [isEdited, setEditing, isEditedRef] = useState(false);
    const [employmentValues, setEmploymentValues, employmentValuesRef] = useState({currentActive:false});
    const [employmentValuesErrors, setEmploymentValuesErrors, employmentValuesErrorsRef] = useState({});


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        BackendService.refershUserDetails().then(() => setOpen(false));
    };


    useEffect(() => {
        (async function () {
            if (!isMountedRef.current) {
                await initializeEmploymentValues;
                setMounted(true);
            }
        })();
    }, [isEdited]);


    const initializeEmploymentValues = async () => {
        console.log(JSON.stringify(user));
        employmentValuesFields.map(fieldObj => {
            setEmploymentValues((prevValues) => {
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
        setEmploymentValues((prevValues) => {
            return {...prevValues, [key]: value};
        });
        if (!!employmentValuesErrorsRef.current[key])
            setEmploymentValuesErrors((prevValues) => {
                return {...prevValues, [key]: null};
            });
    }
    const validateValues = () => {
        let hasErrors = false;
        setEditing(true);

        const personalObj = employmentValuesRef.current;
        employmentValuesFields.map((fieldObj) => {
            if (personalObj[fieldObj.field] === null || personalObj[fieldObj.field] === '' || personalObj[fieldObj.field] === undefined) {
                setEmploymentValuesErrors((prevValues) => {
                    return {...prevValues, [fieldObj.field]: fieldObj.field + ' is required'};
                });
                hasErrors = true;
            }
        });


        console.log(JSON.stringify(employmentValuesErrorsRef.current))
        return hasErrors;
    }


    const submitEmploymentValues = async () => {
        const hasErrors = validateValues();
        console.log('hasErrors', hasErrors)
        if (!hasErrors) {
            setLoading(true);
            let employmentValues = employmentValuesRef.current;
            employmentValues.id = user.id;
            const url = REST_APIS.ADD_EXPERIENCE.replace('PROFILEID', user.id);
            await BackendService.postRequest(url, employmentValues)
                .then(() => {

                        BackendService.notifySuccess('Employment history added successfully')
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
            if (employmentValuesErrorsRef.current[key]) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    return (
        <React.Fragment>
            {/*<a*/}
            {/*    className="text-warning"*/}
            {/*    href="#uploadcv" onClick={handleClickOpen}*/}
            {/*>*/}
            {/*    <i className="fa fa-plus" aria-hidden="true"></i>*/}
            {/*    &nbsp; Add Employment History*/}
            {/*</a>*/}
            <Grid stackable>
                <Grid.Column>
                    <Button as='div' labelPosition='right'
                    >
                        <Button onClick={handleClickOpen} color='green'>
                            <Icon name='add'/>
                            Add
                        </Button>
                        <Label as='a' basic color='red' pointing='left'>
                            Employment History
                        </Label>
                    </Button>

                </Grid.Column>
            </Grid>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            > <LoadingOverlay
                active={loadingRef.current}
                spinner={<ClipLoader color={color} loading={loadingRef.current}/>}
            >
                <DialogTitle id="max-width-dialog-title">
                    Employment History</DialogTitle>
                <DialogContent>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input
                                label="Employer Name"
                                placeholder="Employer Name"
                                name="companyName"
                                value={employmentValuesRef.current.companyName}
                                onChange={setField}
                                error={displayError('companyName') ? {
                                    content: employmentValuesErrorsRef.current?.companyName
                                } : false}/>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Input
                                label="Job Title"
                                placeholder="Job Title"
                                name="jobTitle"
                                value={employmentValuesRef.current.jobTitle}
                                onChange={setField}
                                error={displayError('jobTitle') ? {
                                    content: employmentValuesErrorsRef.current?.jobTitle
                                } : false}/>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.TextArea rows={2}
                                           label="Job Description"
                                           placeholder="Job Description"
                                           name="description"
                                           value={employmentValuesRef.current.description}
                                           onChange={setField}
                                           error={displayError('description') ? {
                                               content: employmentValuesErrorsRef.current?.description
                                           } : false}/>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Checkbox
                                label="Current Job"
                                name="currentActive"
                                checked={employmentValuesRef.current.currentActive}
                                onChange={(e, data) => {
                                    setFieldValues('currentActive', data.checked);
                                }}
                                error={displayError('currentActive') ? {
                                    content: employmentValuesErrorsRef.current?.currentActive
                                } : false}/>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field error={displayError('startDate') ? {
                                content: employmentValuesErrorsRef.current?.startDate
                            } : false}
                            >
                                Period From<br/>
                                <DatePicker
                                    selected={startDate}
                                    name='startDate'
                                    onChange={(date) => {
                                        setFieldValues('startDate', moment(date).format("YYYY-MM-DD"));
                                        setStartDate(date);
                                    }} showYearDropdown
                                    showMonthYearDropdown
                                    useShortMonthInDropdown
                                />
                            </Form.Field>

                            <Form.Field error={displayError('endDate') ? {
                                content: employmentValuesErrorsRef.current?.endDate
                            } : false}
                            >
                                To<br/>
                                <DatePicker
                                    selected={endDate}
                                    name='endDate'
                                    onChange={(date) => {
                                        setFieldValues('endDate', moment(date).format("YYYY-MM-DD"));
                                        setEndDate(date);
                                    }} showYearDropdown
                                    showMonthYearDropdown
                                    useShortMonthInDropdown
                                />
                            </Form.Field>
                        </Form.Group>
                        <Button onClick={submitEmploymentValues} positive>
                            Save
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>

                    </Form>

                </DialogContent>
            </LoadingOverlay>
            </Dialog>
        </React.Fragment>
    );
}
