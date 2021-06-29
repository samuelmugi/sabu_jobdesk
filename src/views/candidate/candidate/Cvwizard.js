import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CandidateCv from './CandidateCv';
import PersonalInfo from "./PersonalInfo";
import Experience from "./Experience";
import Skills from "./Skills";
import Testimonial from "./Testimonials";
import AcademicDetails from "./AcademicDetails";

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

function getSteps() {
    return ['Upload CV', 'Personal Info', 'Academic Details', 'Experience', 'Skills'];
}

function getStepContent(activeStep, completed, steps, handleNext, handleBack, completedSteps, totalSteps, handleComplete) {
    switch (activeStep) {
        case 0:
            return <CandidateCv
                activeStep={activeStep} completed={completed} steps={steps}
                completedSteps={completedSteps}
                totalSteps={totalSteps} handleBack={handleBack} handleNext={handleNext}
                handleComplete={handleComplete}
            />;
        case 1:
            return <PersonalInfo
                activeStep={activeStep} completed={completed} steps={steps}
                completedSteps={completedSteps}
                totalSteps={totalSteps} handleBack={handleBack} handleNext={handleNext}
                handleComplete={handleComplete}
            />;
        case 2:
            return <AcademicDetails
                activeStep={activeStep} completed={completed} steps={steps}
                completedSteps={completedSteps}
                totalSteps={totalSteps} handleBack={handleBack} handleNext={handleNext}
                handleComplete={handleComplete}
            />;
        case 3:
            return <Experience
                activeStep={activeStep} completed={completed} steps={steps}
                completedSteps={completedSteps}
                totalSteps={totalSteps} handleBack={handleBack} handleNext={handleNext}
                handleComplete={handleComplete}
            />;
        case 4:
            return <Skills
                activeStep={activeStep} completed={completed} steps={steps}
                completedSteps={completedSteps}
                totalSteps={totalSteps} handleBack={handleBack} handleNext={handleNext}
                handleComplete={handleComplete}
            />;

    }
}

export default function Cvwizard() {
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

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    return (
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
                {allStepsCompleted() ? (
                    <div>
                        <Typography className={classes.instructions}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                ) : (
                    <div>
                        <div className={classes.instructions}>{
                            getStepContent(activeStep, completed, steps, handleNext, handleBack, completedSteps, totalSteps, handleComplete)
                        }
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
Cvwizard.propTypes = {};
