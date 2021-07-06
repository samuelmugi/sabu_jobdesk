import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Button, Form, Icon, Label, Select} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useState from "react-usestateref";
import BackendService from "services/APiCalls/BackendService";
import REST_APIS from "services/APiCalls/config/apiUrl";
import STORAGE from "services/APiCalls/config/storage";
import CandidateConstants from "views/candidate/candidate/candidateconstants";
import ClipLoader from "react-spinners/PropagateLoader";
import LoadingOverlay from "react-loading-overlay";
import moment from "moment";
import swal from 'sweetalert';

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

export default function PostSecondary(props) {
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
    const [postSecondaryValues, setPostSecondaryValues, postSecondaryValuesRef] = useState({});
    const [postSecondaryValuesErrors, setPostSecondaryValuesErrors, postSecondaryValuesErrorsRef] = useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        BackendService.refershUserDetails(props?.isJobApplication).then(() => setOpen(false));
    };


    useEffect(() => {
        (async function () {
            if (!isMountedRef.current) {
                initializePostSecondaryValues();
                setMounted(true);
            }
        })();
    }, [postSecondaryValues, isEdited]);


    const initializePostSecondaryValues = () => {
        const qualification = props.qualification;
        if (props.edit) {
            setStartDate(moment(qualification?.start + '-01-01').toDate());
            setEndDate(moment(qualification?.end + '-01-01').toDate());
            postSecondaryValuesFields.map(fieldObj => {
                setPostSecondaryValues((prevValues) => {
                    return {...prevValues, [fieldObj.field]: qualification[fieldObj.field]};
                });
            })
        }
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
        const start = moment(personalObj.start).format("YYYY")
        const isAfter = moment(start).isAfter();

        if (isAfter) {
            setPostSecondaryValuesErrors((prevValues) => {
                return {...prevValues, start: 'Start Year  is in the future'};
            });
            hasErrors = true;
        }
        const end = moment(personalObj.end).format("YYYY")
        const isEndAfter = moment(end).isAfter();

        if (isEndAfter) {
            setPostSecondaryValuesErrors((prevValues) => {
                return {...prevValues, end: 'End Year  is in the future'};
            });
            hasErrors = true;
        }

        const checkStartAndEnd=moment(end).isAfter(start);
        if (checkStartAndEnd) {
            setPostSecondaryValuesErrors((prevValues) => {
                return {...prevValues, end: 'End Year  is before start'};
            });
            setPostSecondaryValuesErrors((prevValues) => {
                return {...prevValues, start: 'Start Year  is after  end year'};
            });
            hasErrors = true;
        }
  return hasErrors;
    }

    const resetValues=()=>{
         postSecondaryValuesFields.map((fieldObj) => {
            setPostSecondaryValues((prevValues) => {
                    return {...prevValues, [fieldObj.field]:''};
                });

        });
    }


    const submitPostSecondaryValues = async () => {
        const hasErrors = validateValues();
        console.log('hasErrors', hasErrors)
        if (!hasErrors) {
            setLoading(true);
            let postSecondaryValues = postSecondaryValuesRef.current;
            postSecondaryValues.id = props.edit ? props.qualification?.id : user.id;
            const url = props.edit ? REST_APIS.UPDATE_POST_SECONDARY_SCHOOL.replace('PROFILEID', user.id) + props.qualification?.id
                : REST_APIS.ADD_POST_SECONDARY_SCHOOL.replace('PROFILEID', user.id);
            if (props.edit) {
                await BackendService.putRequest(url, postSecondaryValues)
                    .then((response) => {
                            const user = response.data?.payload;
                            props.refreshUserDetails(user);
                            BackendService.notifySuccess('Post Secondary added successfully')
                                .then(() => setLoading(false)).finally(() => handleClose()) ;
                            resetValues();
                        },
                        (error) => {
                            BackendService.notifyError('oops! error occured during personal data update. pLease try later ');
                            setLoading(false);
                        }
                    );
            } else {
                await BackendService.postRequest(url, postSecondaryValues)
                    .then((response) => {
                            const user = response.data?.payload;
                            props.refreshUserDetails(user);
                            BackendService.notifySuccess('Post Secondary added successfully')
                                .then(() => setLoading(false)) ;
                            resetValues()
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
            if (postSecondaryValuesErrorsRef.current[key]) {
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
                    deleteAcademic();
                } else {
                    swal("Deletion not done!");
                }
            });

    }
    const deleteAcademic = async () => {
        const url = REST_APIS.DELETE_POST_SECONDARY_SCHOOL.replace('PROFILEID', user.id) + props.qualification?.id;
        await BackendService.deleteRequest(url)
            .then((response) => {
                    const user = response.data?.payload;
                    props.refreshUserDetails(user);
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
                                PostSecondary Qualification
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
                                    value={postSecondaryValuesRef.current.educationLevel}
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
                                <Form.Field error={displayError('start')  }
                                >
                                    Year Of Start<br/>
                                    <DatePicker
                                        selected={startDate}
                                        name='start'
                                        onChange={(date) => {
                                            setFieldValues('start', moment(date).format("YYYY"));
                                            console.log('date==', date)
                                            setStartDate(date);
                                        }}
                                        showYearPicker
                                        dateFormat="yyyy"
                                    /> {displayError('start') &&
                                <>
                                    <br/> <Label basic color='red' pointing='above'>
                                    {postSecondaryValuesErrorsRef.current?.start}
                                </Label>
                                </>}
                                </Form.Field>
                                <Form.Field error={displayError('end')  }
                                >
                                    Year Of Completion<br/>
                                    <DatePicker
                                        selected={endDate}
                                        name='end'
                                        onChange={(date) => {
                                            setFieldValues('end', moment(date).format("YYYY"));
                                            setEndDate(date);
                                        }}
                                        showYearPicker
                                        dateFormat="yyyy"
                                    /> {displayError('end') &&
                                <>
                                    <br/>   <Label basic color='red' pointing='above'>
                                    {postSecondaryValuesErrorsRef.current?.end}
                                </Label>
                                </>}
                                </Form.Field>
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
