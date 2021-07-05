import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import {Button} from 'semantic-ui-react'
import STORAGE from "services/APiCalls/config/storage";
import StepButton from "@material-ui/core/StepButton";
import UploadFiles from "components/fileupload/upload-files";
import AcademicStepper from "views/candidate/profile/academicstepper";
import ExperienceStepper from "views/candidate/profile/experiencestepper";
import CoverLetterStepper from "views/candidate/profile/coverletterstepper";
import PersonalInfoStepper from "views/candidate/profile/personalstepper";
import SkillStepper from "views/candidate/profile/skillstepper";

const user = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Personal Info', 'Academic Details', 'Experience', 'Skills', 'Cover Letter', 'Upload Cv'];
}

function getStepContent(step, props) {
    switch (step) {
        case 0: {
            return <PersonalInfoStepper/>
        }

        case 1: {
            return <AcademicStepper {...props}/>
        }
        case 2: {
            return <ExperienceStepper/>
        }

        case 3 : {
            return <SkillStepper/>
        }
        case 4: {
            return <CoverLetterStepper/>;
        }
        case 5: {
            return <UploadFiles isJobApplication={props.isJobApplication}/>;

        }
            ;
        default:
            return 'Unknown step';
    }
}

export default function ViewProfileStepper(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});


    const steps = getSteps();

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };


    return (
        <>
            {user !== 'NA' &&
            <div className={classes.root}>
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepButton onClick={handleStep(index)} completed={completed[index]}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <div>

                    <div>
                        <div
                            className={classes.instructions}>{getStepContent(activeStep, {isJobApplication: props?.isJobApplication})}</div>
                        <div>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                Back
                            </Button>
                            {(isLastStep() && props.isJobApplication) ?
                                <Button onClick={props.submitApplication} color="green">
                                    <strong>Submit Application {props.title}</strong>
                                </Button> : <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                >
                                    Next
                                </Button>}
                        </div>
                    </div>

                </div>
            </div>
            }
        </>
    );
}
