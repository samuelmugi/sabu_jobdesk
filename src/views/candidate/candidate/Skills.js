import React, {useEffect} from 'react';
// reactstrap components
import {Form, Grid, Icon} from 'semantic-ui-react';
import {makeStyles} from "@material-ui/core/styles";
import useState from 'react-usestateref';
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from "react-spinners/PropagateLoader";
import "react-datepicker/dist/react-datepicker.css";
import BackendService from "services/APiCalls/BackendService";
import REST_APIS from "services/APiCalls/config/apiUrl";
import STORAGE from "services/APiCalls/config/storage";
import swal from "sweetalert";

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


export default function Skills(props) {
    const classes = useStyles();
    const user = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;
    const [color, setColor] = useState("#60991f");
    const [startDate, setStartDate] = useState(new Date());
    const [loading, setLoading, loadingRef] = useState(false);
    const [isMounted, setMounted, isMountedRef] = useState(false);
    const [isEdited, setEditing, isEditedRef] = useState(false);
    const [skillValues, setSkillValues, skillValuesRef] = useState({});
    const [skillValuesErrors, setSkillValuesErrors, skillValuesErrorsRef] = useState({});

    useEffect(() => {
        (async function () {
            if (!isMountedRef.current) {
                await initializeSkillValues;
                setMounted(true);
            }
        })();
    }, [isEdited]);


    const initializeSkillValues = async () => {

    }

    const setField = (e) => {
        setFieldValues(e.target.name, e.target.value);
    };
    const setFieldValues = (key, value) => {
        setSkillValues((prevValues) => {
            return {...prevValues, [key]: value};
        });
        if (!!skillValuesErrorsRef.current[key])
            setSkillValuesErrors((prevValues) => {
                return {...prevValues, [key]: null};
            });
    }
    const resetValues=()=>{
        setFieldValues('skill', '');
    }
    const validateValues = () => {
        let hasErrors = false;
        setEditing(true);

        const personalObj = skillValuesRef.current;
        if (personalObj.skill === null || personalObj.skill === '' || personalObj.skill === undefined) {
            setSkillValuesErrors((prevValues) => {
                return {...prevValues, skill: 'Skill is required'};
            });
            hasErrors = true;
        }
        return hasErrors;
    }


    const submitSkillValues = async () => {
        const hasErrors = validateValues();
        if (!hasErrors) {
            console.log('hasErrors', hasErrors)

            setLoading(true);
            let skillValues = skillValuesRef.current;
            skillValues.id = user.id;
            const url = REST_APIS.ADD_SKILL.replace('PROFILEID', user.id);
            await BackendService.postRequest(url, skillValues)
                .then((response) => {
                        const user = response.data?.payload;
                        props.refreshSkills(user);
                        resetValues();
                        BackendService.notifySuccess('Skill Added successfully')
                            .then(() => setLoading(false))
                            .finally(() => BackendService.refershUserDetails(props?.isJobApplication));
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
            if (skillValuesErrorsRef.current[key]) {
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
        const url = REST_APIS.DELETE_SKILL.replace('PROFILEID', user.id)+ props.skill?.id;
        await BackendService.deleteRequest(url)
            .then((response) => {
                    const user = response.data?.payload;
                    props.refreshSkills(user);
                    BackendService.notifySuccess('Skill deleted successfully')
                        .then(() => setLoading(false));
                    BackendService.refershUserDetails(true);
                },
                (error) => {
                    BackendService.notifyError('oops! error occured during personal data update. pLease try later ');
                    setLoading(false);
                }
            );
    }

    return (
        <>
            {props.delete ?
                <Icon onClick={handleDelete} name='delete' />
                : <LoadingOverlay
                    active={loadingRef.current}
                    spinner={<ClipLoader color={color} loading={loadingRef.current}/>}
                >

                    <Grid stackable>
                        <Grid.Column>

                            <Form>
                                <Form.Group>
                                    <Form.Input
                                        placeholder="Skill"
                                        name="skill"
                                        value={skillValuesRef.current.skill}
                                        onChange={setField}
                                        error={displayError('skill') ? {
                                            content: skillValuesErrorsRef.current?.skill
                                        } : false}
                                    />
                                    <Form.Button circular positive icon="add" onClick={submitSkillValues}/>
                                </Form.Group>
                            </Form>
                        </Grid.Column>
                    </Grid>


                </LoadingOverlay>}
        </>
    );

}
Skills.propTypes = {};

Skills.defaultProps = {};
