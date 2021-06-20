import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Button, Form, Select} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useState from "react-usestateref";
import BackendService from "services/APiCalls/BackendService";
import REST_APIS from "services/APiCalls/config/apiUrl";
import STORAGE from "services/APiCalls/config/storage";
import CandidateConstants from "views/candidate/candidate/candidateconstants";
import ClipLoader from "react-spinners/PropagateLoader";
import LoadingOverlay from "react-loading-overlay";

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
const optionsQualification = [
    {key: 'Certificate', text: 'Certificate', value: 'Certificate'},
    {key: 'Diploma', text: 'Diploma', value: 'Diploma'},
    {key: 'Degree', text: 'Degree', value: 'Degree'},
    {key: 'Masters', text: 'Masters', value: 'Masters'},
    {key: 'PHD', text: 'PHD', value: 'PHD'},
    {key: 'Other', text: 'Other', value: 'Other'}
];
const postSecondaryValuesFields = CandidateConstants.postSecondaryValuesFields;

export default function PostSecondary() {
    const user = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;
    const [startDate, setStartDate] = useState(new Date());
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [color, setColor] = useState("#60991f");
    const [loading, setLoading, loadingRef] = useState(false);
    const [isMounted, setMounted, isMountedRef] = useState(false);
    const [isEdited, setEditing, isEditedRef] = useState(false);
    const [postSecondaryValues, setPostSecondaryValues, postSecondaryValuesRef] = useState({});
    const [postSecondaryValuesErrors, setPostSecondaryValuesErrors, postSecondaryValuesErrorsRef] = useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        (async function () {
            if (!isMountedRef.current) {
                await initializePostSecondaryValues;
                setMounted(true);
            }
        })();
    }, [isEdited]);


    const initializePostSecondaryValues = async () => {
        console.log(JSON.stringify(user));
        postSecondaryValuesFields.map(fieldObj => {
            setPostSecondaryValues((prevValues) => {
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
        setPostSecondaryValues((prevValues) => {
            return {...prevValues, [key]: value};
        });
        if (!!postSecondaryValuesErrorsRef.current[key])
            setPostSecondaryValuesErrors((prevValues) => {
                return {...prevValues, [key]: null};
            });
    }
    const validateValues = () => {
        let hasErrors = false;
        setEditing(true);

        const personalObj = postSecondaryValuesRef.current;
        postSecondaryValuesFields.map((fieldObj) => {
            if (personalObj[fieldObj.field] === null || personalObj[fieldObj.field] === '' || personalObj[fieldObj.field] === undefined) {
                setPostSecondaryValuesErrors((prevValues) => {
                    return {...prevValues, [fieldObj.field]: fieldObj.field + ' is required'};
                });
                hasErrors = true;
            }
        });
        if (!!postSecondaryValuesErrorsRef.current?.dateOfBirth) {
            BackendService.notifyError('PLease select date of birth');
        }

        console.log(JSON.stringify(postSecondaryValuesErrorsRef.current))
        return hasErrors;
    }


    const submitPostSecondaryValues = async () => {
        const hasErrors = validateValues();
        console.log('hasErrors', hasErrors)
        if (!hasErrors) {
            setLoading(true);
            let postSecondaryValues = postSecondaryValuesRef.current;
            postSecondaryValues.id = user.id;
            const url = REST_APIS.ADD_POST_SECONDARY_SCHOOL.replace('PROFILEID', user.id);
            await BackendService.putRequest(url, postSecondaryValues)
                .then(() => {
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
            if (postSecondaryValuesErrorsRef.current[key]) {
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
            <a
                className="text-warning"
                href="#uploadcv" onClick={handleClickOpen}
            >
                <i className="fa fa-plus" aria-hidden="true"></i>
                &nbsp; Add PostSecondary Qualification
            </a>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
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
                    <DialogTitle id="max-width-dialog-title">
                        Post Secondary School Qualification eg Diploma, Bachelors,
                        Masters.</DialogTitle>
                    <DialogContent>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Select}
                                    label='Status'
                                    options={optionsQualification}
                                    placeholder='Education Level'
                                    name='educationLevel'
                                    onChange={handleOtherSelects}
                                    error={displayError('educationLevel') ? {
                                        content: postSecondaryValuesErrorsRef.current?.educationLevel
                                    } : false}
                                />
                                <Form.Input
                                    label="Institution"
                                    placeholder="Institution"
                                    name="schoolName"
                                    value={postSecondaryValuesRef.current.schoolName}
                                    onChange={setField}
                                    error={displayError('schoolName') ? {
                                        content: postSecondaryValuesErrorsRef.current?.schoolName
                                    } : false}/>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    label="Course Name"
                                    placeholder="Course Name"
                                    name="courseName"
                                    value={postSecondaryValuesRef.current.courseName}
                                    onChange={setField}
                                    error={displayError('courseName') ? {
                                        content: postSecondaryValuesErrorsRef.current?.courseName
                                    } : false}/>


                            </Form.Group>
                            <Form.Group>
                                <Form.Field error={displayError('start') ? {
                                    content: postSecondaryValuesErrorsRef.current?.start
                                } : false}
                                >
                                    Year Of Start<br/>
                                    <DatePicker
                                        selected={startDate}
                                        name='start'
                                        onChange={(date) => {
                                            setFieldValues('start', date);
                                            setStartDate(date);
                                        }}
                                        showYearPicker
                                        dateFormat="yyyy"
                                    />
                                </Form.Field>
                                <Form.Field error={displayError('end') ? {
                                    content: postSecondaryValuesErrorsRef.current?.end
                                } : false}
                                >
                                    Year Of Completion<br/>
                                    <DatePicker
                                        selected={startDate}
                                        name='end'
                                        onChange={(date) => {
                                            setFieldValues('end', date);
                                            setStartDate(date);
                                        }}
                                        showYearPicker
                                        dateFormat="yyyy"
                                    />
                                </Form.Field>
                            </Form.Group>

                            <Form.Group>
                                <Form.Field
                                    control={Select}
                                    label='Attach Certificate (pdf or image)'
                                    placeholder='Attach Certificate (pdf or image'
                                    type="file"
                                />
                            </Form.Group>
                            <Button onClick={submitPostSecondaryValues} positive>
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
