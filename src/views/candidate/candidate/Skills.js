import React, {useEffect} from 'react';
// reactstrap components
import {Form, Grid} from 'semantic-ui-react';
import {makeStyles} from "@material-ui/core/styles";
import useState from 'react-usestateref';
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from "react-spinners/PropagateLoader";
import "react-datepicker/dist/react-datepicker.css";
import BackendService from "services/APiCalls/BackendService";
import REST_APIS from "services/APiCalls/config/apiUrl";
import STORAGE from "services/APiCalls/config/storage";

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
    const handleOtherSelects = (e, {name, value}) => {
        setFieldValues(name, value);
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
                .then(() => {

                        BackendService.notifySuccess('Skill Added successfully')
                            .then(() => setLoading(false))
                            .finally(() =>  BackendService.refershUserDetails());
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

    return (
        <> <LoadingOverlay
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




        </LoadingOverlay>
        </>
    );

}
Skills.propTypes = {};

Skills.defaultProps = {};
