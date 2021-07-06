import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Button, Form, Icon, Label} from "semantic-ui-react";
import useState from "react-usestateref";
import CandidateConstants from "views/candidate/candidate/candidateconstants";
import BackendService from "services/APiCalls/BackendService";
import REST_APIS from "services/APiCalls/config/apiUrl";
import LoadingOverlay from "react-loading-overlay";
import ClipLoader from "react-spinners/PropagateLoader";
import STORAGE from "services/APiCalls/config/storage";
import moment from 'moment';
import swal from "sweetalert";
import TextField from "@material-ui/core/TextField";

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


export default function EmploymentHistory(props) {
    const user = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;
    const [startDate, setStartDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [color, setColor] = useState("#60991f");
    const [loading, setLoading, loadingRef] = useState(false);
    const [isMounted, setMounted, isMountedRef] = useState(false);
    const [isEdited, setEditing, isEditedRef] = useState(false);
    const [employmentValues, setEmploymentValues, employmentValuesRef] = useState({currentActive: false});
    const [employmentValuesErrors, setEmploymentValuesErrors, employmentValuesErrorsRef] = useState({});


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        BackendService.refershUserDetails(props?.isJobApplication).then(() => setOpen(false));
    };


    useEffect(() => {
        (async function () {
            if (!isMountedRef.current) {
                initializeEmploymentValues();
                setMounted(true);
            }
        })();
    }, [employmentValues, isEdited]);


    const initializeEmploymentValues = () => {
        const experience = props.experience;
        if (props.edit) {
            setStartDate(moment(experience?.startDate + ' 01').toDate());
            setEndDate(moment(experience?.endDate + ' 01').toDate());
            employmentValuesFields.map(fieldObj => {
                setEmploymentValues((prevValues) => {
                    return {...prevValues, [fieldObj.field]: experience[fieldObj.field]};
                });
            })
        }
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

        const start = moment(personalObj.startDate).format("YYYY-MM-DD")
        const isAfter = moment(startDate).isAfter();

        if (isAfter) {
            setEmploymentValuesErrors((prevValues) => {
                return {...prevValues, startDate: 'Start Year  is in the future'};
            });
            hasErrors = true;
        }
        const endDate = moment(personalObj.endDate).format("YYYY-MM-DD")
        const isEndAfter = moment(endDate).isAfter();

        if (isEndAfter) {
            setEmploymentValuesErrors((prevValues) => {
                return {...prevValues, endDate: 'End Year  is in the future'};
            });
            hasErrors = true;
        }

        const checkStartAndEnd = moment(endDate).isAfter(start);
        if (checkStartAndEnd) {
            setEmploymentValuesErrors((prevValues) => {
                return {...prevValues, endDate: 'End Year  is before start'};
            });
            setEmploymentValuesErrors((prevValues) => {
                return {...prevValues, startDate: 'Start Year  is after  end year'};
            });
            hasErrors = true;
        }
        return hasErrors;
    }
    const resetValues = () => {
        employmentValuesFields.map((fieldObj) => {
            setEmploymentValues((prevValues) => {
                return {...prevValues, [fieldObj.field]: ''};
            });

        });
    }


    const submitEmploymentValues = async () => {
        const hasErrors = validateValues();
        console.log('hasErrors', hasErrors)
        if (!hasErrors) {
            setLoading(true);
            let employmentValues = employmentValuesRef.current;
            employmentValues.id = props.edit ? props.experience?.id : user.id;
            const url = props.edit ? REST_APIS.UPDATE_EXPERIENCE.replace('PROFILEID', user.id) + props.experience?.id
                : REST_APIS.ADD_EXPERIENCE.replace('PROFILEID', user.id);
            if (props.edit) {
                await BackendService.putRequest(url, employmentValues)
                    .then((response) => {
                            const user = response.data?.payload;
                            props.refreshUserDetails(user);
                            BackendService.notifySuccess('Employment history Updated successfully')
                                .then(() => setLoading(false))
                                .finally(() => handleClose());
                            resetValues();
                        },
                        (error) => {
                            BackendService.notifyError('oops! error occured during personal data update. pLease try later ');
                            setLoading(false);
                        }
                    );
            } else {
                await BackendService.postRequest(url, employmentValues)
                    .then((response) => {
                            const user = response.data?.payload;
                            props.refreshUserDetails(user);
                            BackendService.notifySuccess('Employment history added successfully')
                                .then(() => setLoading(false));
                            resetValues();
                        },
                        (error) => {
                            BackendService.notifyError('oops! error occured during personal data update. pLease try later ');
                            setLoading(false);
                        }
                    );
            }


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
    const handleDelete = async () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("data has been deleted!", {
                        icon: "success",
                    });
                    deleteExperience();
                } else {
                    swal("Deletion not done!");
                }
            });

    }
    const deleteExperience = async () => {
        const url = REST_APIS.DELETE_EXPERIENCE.replace('PROFILEID', user.id) + props.experience?.id;
        await BackendService.deleteRequest(url)
            .then(() => {
                    BackendService.notifySuccess('Post Secondary deleted successfully')
                        .then(() => setLoading(false))
                        .finally(() => handleClose());
                },
                (error) => {
                    BackendService.notifyError('oops! error occured during personal data update. pLease try later ');
                    setLoading(false);
                }
            );
    }
    return (
        <React.Fragment>
            {props.delete ?
                <a
                    className="text-danger"
                    href="#uploadcv" onClick={handleDelete}
                >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                    &nbsp; Delete
                </a>


                : (
                    props.edit ?
                        <a
                            className="text-warning"
                            href="#uploadcv" onClick={handleClickOpen}
                        >
                            <i className="fa fa-edit" aria-hidden="true"></i>
                            &nbsp; Edit
                        </a>
                        : <Button as='div' labelPosition='right'>
                            <Button onClick={handleClickOpen} color='green'>
                                <Icon name='add'/>
                                Add
                            </Button>
                            <Label as='a' basic color='red' pointing='left'>
                                Employment History
                            </Label>
                        </Button>

                )}

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
                            <Form.Field>
                                <TextField
                                    error={displayError('startDate')}
                                    id="startDate"
                                    label="Period From"
                                    type="date"
                                    onChange={(e) => {
                                        setFieldValues('startDate', moment(e.target.value).format("YYYY-MM-DD"));
                                        setStartDate(e.target.value);
                                    }}
                                    defaultValue={moment(employmentValuesRef.current?.startDate).format("YYYY-MM-DD")}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />{displayError('startDate') &&
                            <>
                                <br/> <Label basic color='red' pointing='above'>
                                {employmentValuesErrorsRef.current?.startDate}
                            </Label>
                            </>}
                            </Form.Field>

                            <Form.Field>

                                <TextField
                                    error={displayError('endDate')}
                                    id="endDate"
                                    label="Period To"
                                    type="date"
                                    onChange={(e) => {
                                        setFieldValues('endDate', moment(e.target.value).format("YYYY-MM-DD"));
                                        setStartDate(e.target.value);
                                    }}
                                    defaultValue={moment(employmentValuesRef.current?.endDate).format("YYYY-MM-DD")}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />{displayError('endDate') &&
                            <>
                                <br/> <Label basic color='red' pointing='above'>
                                {employmentValuesErrorsRef.current?.endDate}
                            </Label>
                            </>}
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
