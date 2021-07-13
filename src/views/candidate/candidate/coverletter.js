import React, {useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Button, Form, Grid, Icon, Label} from "semantic-ui-react";
import "react-datepicker/dist/react-datepicker.css";
import useState from "react-usestateref";
import CandidateConstants from "views/candidate/candidate/candidateconstants";
import BackendService from "services/APiCalls/BackendService";
import REST_APIS from "services/APiCalls/config/apiUrl";
import LoadingOverlay from "react-loading-overlay";
import ClipLoader from "react-spinners/PropagateLoader";
import STORAGE from "services/APiCalls/config/storage";


const coverLetterFields = CandidateConstants.coverLetterFields;


export default function CoverLetter(props) {
    const user = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [color, setColor] = useState("#60991f");
    const [loading, setLoading, loadingRef] = useState(false);
    const [isMounted, setMounted, isMountedRef] = useState(false);
    const [isEdited, setEditing, isEditedRef] = useState(false);
    const [coverLetterValues, setCoverLetterValues, coverLetterValuesRef] = useState({currentActive: false});
    const [coverLetterValuesErrors, setCoverLetterValuesErrors, coverLetterValuesErrorsRef] = useState({});


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        BackendService.refershUserDetails(props?.isJobApplication).then(() => {
            setOpen(false);
            setMounted(false);
        });
    };


    useEffect(() => {
        (async function () {
            if (!isMountedRef.current) {
                initializeCoverLetterValues();
                setMounted(true);
            }
        })();
    }, [isMounted, coverLetterValues, isEdited]);


    const initializeCoverLetterValues = () => {
        coverLetterFields.map(fieldObj => {
            setCoverLetterValues((prevValues) => {
                return {...prevValues, [fieldObj.field]: user[fieldObj.field]};
            });
        })

    }

    const setField = (e) => {
        setFieldValues(e.target.name, e.target.value);
    };
    const setFieldValues = (key, value) => {
        setCoverLetterValues((prevValues) => {
            return {...prevValues, [key]: value};
        });
        if (!!coverLetterValuesErrorsRef.current[key])
            setCoverLetterValuesErrors((prevValues) => {
                return {...prevValues, [key]: null};
            });
    }
    const validateValues = () => {
        let hasErrors = false;
        setEditing(true);

        const personalObj = coverLetterValuesRef.current;
        coverLetterFields.map((fieldObj) => {
            if (personalObj[fieldObj.field] === null || personalObj[fieldObj.field] === '' || personalObj[fieldObj.field] === undefined) {
                setCoverLetterValuesErrors((prevValues) => {
                    return {...prevValues, [fieldObj.field]: fieldObj.field + ' is required'};
                });
                hasErrors = true;
            }
        });

        return hasErrors;
    }


    const submitCoverLetterValues = async () => {
        const hasErrors = validateValues();
        console.log('hasErrors', hasErrors)
        let coverLetterValues = coverLetterValuesRef.current;
        if (!hasErrors) {
            setLoading(true);
            coverLetterValues.id = user.id;
            const url = REST_APIS.COVER_LETTER.replace('PROFILEID', user.id);
            await BackendService.postRequest(url, coverLetterValues)
                .then((response) => {
                    const user = response.data?.payload;
                    props.refreshUserDetails(user);
                    BackendService.notifySuccess('CoverLetter  Updated successfully')
                        .then(() => setLoading(false))
                        .finally(() => handleClose());
                    // delete coverLetterValues.coverLetter;
                    // delete coverLetterValues.id;
                    // const clearanceurl = REST_APIS.UPDATE_USER_DETAILS.replace('PROFILEID', user.id);
                    // BackendService.putRequest(clearanceurl, coverLetterValues)
                    //     .then((response) => {
                    //         const user =response.data?.payload;
                    //         props.refreshUserDetails(user);
                    //
                    //         BackendService.notifySuccess('CoverLetter  Updated successfully')
                    //             .then(() => setLoading(false))
                    //             .finally(() => handleClose());
                    //     },
                    //     (error) => {
                    //         BackendService.notifyError('oops! error occured during personal data update. pLease try later ');
                    //         setLoading(false);
                    //     }
                    // )
                    setMounted(false);
                }, (error) => {
                    BackendService.notifyError('oops! error occured during personal data update. pLease try later ');
                    setLoading(false);
                })
            ;

        }
    }
    const displayError = (key) => {
        if (isEditedRef.current) {
            if (coverLetterValuesErrorsRef.current[key]) {
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

            <Grid stackable>
                <Grid.Column>
                    <Button as='div' labelPosition='right'
                    >
                        <Button onClick={handleClickOpen} color='green'>
                            <Icon name='add'/>
                            Update
                        </Button>
                        <Label as='a' basic color='red' pointing='left'>
                            Cover Letter & Clearances
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
                    Cover Letter & Clearance</DialogTitle>
                <DialogContent>
                    <Form>

                        <Form.Group widths='equal'>
                            <Form.TextArea rows={20}
                                           label="Cover Letter"
                                           placeholder="Cover Letter"
                                           name="coverLetter"
                                           value={coverLetterValuesRef.current.coverLetter}
                                           onChange={setField}
                                           error={displayError('coverLetter') ? {
                                               content: coverLetterValuesErrorsRef.current?.coverLetter
                                           } : false}/>
                        </Form.Group>
                        <Form.Group widths='equal'>

                            <Form.Checkbox
                                label="KRA Clerance"
                                name="kraClearace"
                                checked={coverLetterValuesRef?.kraClearace}
                                onChange={(e, data) => {
                                    setFieldValues('kraClearace', data.checked);
                                }}
                                error={displayError('kraClearace') ? {
                                    content: coverLetterValuesErrorsRef.current?.kraClearace
                                } : false}/>


                            <Form.Checkbox
                                label="Helb CLearance"
                                name="helbClearance"
                                checked={coverLetterValuesRef?.helbClearance}
                                onChange={(e, data) => {
                                    setFieldValues('helbClearance', data.checked);
                                }}
                                error={displayError('helbClearance') ? {
                                    content: coverLetterValuesErrorsRef.current?.helbClearance
                                } : false}/>

                            <Form.Checkbox
                                label="EACC Clearance"
                                name="eaccClearance"
                                checked={coverLetterValuesRef?.eaccClearance}
                                onChange={(e, data) => {
                                    setFieldValues('eaccClearance', data.checked);
                                }}
                                error={displayError('eaccClearance') ? {
                                    content: coverLetterValuesErrorsRef.current?.eaccClearance
                                } : false}/>


                            <Form.Checkbox
                                label="CRB CLearance"
                                name="crbClearance"
                                checked={coverLetterValuesRef?.crbClearance}
                                onChange={(e, data) => {
                                    setFieldValues('crbClearance', data.checked);
                                }}
                                error={displayError('crbClearance') ? {
                                    content: coverLetterValuesErrorsRef.current?.crbClearance
                                } : false}/>

                            <Form.Checkbox
                                label="Good Conduct"
                                name="goodConductClearance"
                                checked={coverLetterValuesRef?.goodConductClearance}
                                onChange={(e, data) => {
                                    setFieldValues('goodConductClearance', data.checked);
                                }}
                                error={displayError('goodConductClearance') ? {
                                    content: coverLetterValuesErrorsRef.current?.goodConductClearance
                                } : false}/>


                        </Form.Group>
                        <Button onClick={submitCoverLetterValues} positive>
                            Save
                        </Button>
                        <Button onClick={handleClose} color="blue">
                            Close
                        </Button>

                    </Form>

                </DialogContent>
            </LoadingOverlay>
            </Dialog>
        </React.Fragment>
    );
}
