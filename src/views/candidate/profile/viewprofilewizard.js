import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import {Button, Divider, Feed, Grid, Label} from 'semantic-ui-react'
import STORAGE from "services/APiCalls/config/storage";
import {Card} from "reactstrap";
import ProfileConstants from "views/candidate/profile/profileconstants";
import useState from "react-usestateref";
 import StepButton from "@material-ui/core/StepButton";
 import PostSecondary from "views/candidate/candidate/postsecondary";
import EmploymentHistory from "views/candidate/candidate/employmenthistory";
import Skills from "views/candidate/candidate/Skills";
import UploadFiles from "components/fileupload/upload-files";
import PersonalInfoDialog from "views/candidate/candidate/personaldialog";
import SecondarySchoolDialog from "views/candidate/candidate/secondarydialog";

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
    return ['Personal Info', 'Academic Details', 'Experience', 'Skills', 'Upload Cv'];
}

function getStepContent(step) {
    switch (step) {
        case 0: {
            const personalInfoFields = ProfileConstants.personalInfoFields;
            const sizeOfFields = personalInfoFields.length;
            const rowModulus = +sizeOfFields % 4;
            let noOfRows = 0;
            if (+rowModulus > 0) {
                noOfRows = ((+sizeOfFields - rowModulus) / 4) + 1;
            } else {
                noOfRows = +sizeOfFields / 4;
            }
            const events = [
                {
                    date: '4 Likes',
                    summary: 'Elliot Fu added you as a friend',
                }
            ]
            let col = 0;
            return <Card className="bg-secondary shadow  ">
                <PersonalInfoDialog/>
                <Paper variant="outlined">

                    <Box m={4}>
                        <Grid stackable columns='equal'>
                            {
                                [...Array(noOfRows).keys()].map((row) => {
                                        return (<Grid.Row>
                                            {
                                                [...Array(4).keys()].map((coll) => {
                                                    const field = personalInfoFields[col];
                                                    const fieldFeed = [
                                                        {
                                                            date: field?.field,
                                                            summary: user[field?.field],
                                                        }
                                                    ];
                                                    col++;
                                                    return (
                                                        <Grid.Column>
                                                            <Feed events={fieldFeed}/>
                                                        </Grid.Column>
                                                    )
                                                })

                                            }
                                        </Grid.Row>)

                                    }
                                )
                            }
                            {(user !== 'NA' && user?.homeCounty !== null) && (<Grid.Row>
                                    <Grid.Column>
                                        <Feed events={[
                                            {
                                                date: 'homeCounty',
                                                summary: user?.homeCounty.name,
                                            }
                                        ]}/>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Feed events={[
                                            {
                                                date: 'homeSubCounty',
                                                summary: user?.homeSubCounty.name,
                                            }
                                        ]}/>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Feed events={[
                                            {
                                                date: 'homeWard',
                                                summary: user?.homeWard.wardName,
                                            }
                                        ]}/>
                                    </Grid.Column>
                                </Grid.Row>
                            )}
                            {(user !== 'NA' && user?.countyOfResidence !== null) && (<Grid.Row>
                                    <Grid.Column>
                                        <Feed events={[
                                            {
                                                date: 'county Of Residence',
                                                summary: user?.countyOfResidence.name,
                                            }
                                        ]}/>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Feed events={[
                                            {
                                                date: 'Residence sub County',
                                                summary: user?.subCountyOfResidence.name,
                                            }
                                        ]}/>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Feed events={[
                                            {
                                                date: 'Residence Ward',
                                                summary: user?.countyOfResidenceWard.wardName,
                                            }
                                        ]}/>
                                    </Grid.Column>
                                </Grid.Row>
                            )}
                        </Grid>
                    </Box>


                </Paper>
            </Card>


        }

        case 1: {
            const academicValuesFields = ProfileConstants.academicValuesFields;
            const sizeOfFields = academicValuesFields.length;
            const rowModulus = +sizeOfFields % 4;
            let noOfRows = 0;
            if (+rowModulus > 0) {
                noOfRows = ((+sizeOfFields - rowModulus) / 4) + 1;
            } else {
                noOfRows = +sizeOfFields / 4;
            }
            console.log('noOfRows=', noOfRows)
            const events = [
                {
                    date: '4 Likes',
                    summary: 'Elliot Fu added you as a friend',
                }
            ]
            let col = 0;
            const academicQualifications = user?.academicQualifications;

            return <Card className="bg-secondary shadow border-left-4">
                <SecondarySchoolDialog/>
                <Paper variant="outlined" circle>
                    <Box m={4}>
                        <Grid stackable columns='equal'>
                            {
                                [...Array(noOfRows).keys()].map((row) => {
                                        return (<Grid.Row>
                                            {
                                                [...Array(4).keys()].map((coll) => {
                                                    const field = academicValuesFields[col];
                                                    const fieldFeed = [
                                                        {
                                                            date: field?.field,
                                                            summary: user[field?.field],
                                                        }
                                                    ];
                                                    col++;
                                                    return (
                                                        <Grid.Column>
                                                            <Feed events={fieldFeed}/>
                                                        </Grid.Column>
                                                    )
                                                })

                                            }
                                        </Grid.Row>)

                                    }
                                )
                            }
                            <Divider horizontal>Academic Qualifications</Divider>
                            <Grid.Row>
                                <Grid.Column>
                                    <PostSecondary/>
                                </Grid.Column>
                            </Grid.Row>
                            {
                                academicQualifications.map((val, key) => {

                                        return (<>
                                                <Grid.Row>
                                                    <Grid.Column>
                                                        <Feed events={[
                                                            {
                                                                date: 'Qualification',
                                                                summary: val?.educationLevel,
                                                            }
                                                        ]}/>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <Feed events={[
                                                            {
                                                                date: 'School',
                                                                summary: val?.schoolName,
                                                            }
                                                        ]}/>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <Feed events={[
                                                            {
                                                                date: 'Course',
                                                                summary: val?.courseName,
                                                            }
                                                        ]}/>
                                                    </Grid.Column>

                                                    <Grid.Column>
                                                        <Feed events={[
                                                            {
                                                                date: 'start',
                                                                summary: val?.start,
                                                            }
                                                        ]}/>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <Feed events={[
                                                            {
                                                                date: 'end',
                                                                summary: val?.end,
                                                            }
                                                        ]}/>
                                                    </Grid.Column>
                                                </Grid.Row>

                                            </>
                                        )

                                    }
                                )
                            }
                        </Grid>
                    </Box>
                </Paper>
            </Card>
                ;
        }
        case 2: {

            const workExperiences = user?.workExperiences;

            return <Card className="bg-secondary shadow border-left-4">
                <EmploymentHistory/>
                <Paper variant="outlined" circle>
                    <Box m={4}>
                        <Grid columns='equal'>

                            {
                                workExperiences.map((val, key) => {

                                        return (<>
                                                <Grid.Row>
                                                    <Grid.Column>
                                                        <Feed events={[
                                                            {
                                                                date: 'companyName',
                                                                summary: val?.companyName,
                                                            }
                                                        ]}/>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <Feed events={[
                                                            {
                                                                date: 'jobTitle',
                                                                summary: val?.jobTitle,
                                                            }
                                                        ]}/>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <Feed events={[
                                                            {
                                                                date: 'currentActive',
                                                                summary: val?.currentActive,
                                                            }
                                                        ]}/>
                                                    </Grid.Column>

                                                    <Grid.Column>
                                                        <Feed events={[
                                                            {
                                                                date: 'startDate',
                                                                summary: val?.startDate,
                                                            }
                                                        ]}/>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <Feed events={[
                                                            {
                                                                date: 'endDate',
                                                                summary: val?.endDate,
                                                            }
                                                        ]}/>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Grid.Column>
                                                        <Feed events={[
                                                            {
                                                                date: 'description',
                                                                summary: val?.description,
                                                            }
                                                        ]}/>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Divider></Divider>

                                            </>
                                        )

                                    }
                                )
                            }
                        </Grid>
                    </Box>
                </Paper>
            </Card>
                ;
        }

        case 3 : {
            const skills = user?.skills;
            const sizeOfFields = skills.length;
            const rowModulus = +sizeOfFields % 5;
            let noOfRows = 0;
            if (+rowModulus > 0) {
                noOfRows = ((+sizeOfFields - rowModulus) / 5) + 1;
            } else {
                noOfRows = +sizeOfFields / 5;
            }
            console.log('noOfRows=', noOfRows)

            let col = 0;
            return <Card className="bg-secondary shadow  ">
                <Skills/>
                <Paper variant="outlined" circle>
                    <Box m={4}>
                        <Grid columns='equal'>
                            {
                                [...Array(noOfRows).keys()].map((row) => {
                                        const colNos = skills.length > 4 ? 4 : skills.length;
                                        return (<Grid.Row>
                                            {
                                                [...Array(colNos).keys()].map((coll) => {
                                                    if (skills.length > col) {
                                                        const skill = JSON.parse(skills[col]);
                                                        col++;
                                                        return (
                                                            <Grid.Column>
                                                                <Label as='a' color='teal' tag>
                                                                    {skill?.skill}
                                                                </Label>
                                                            </Grid.Column>
                                                        )
                                                    } else {
                                                        return <Grid.Column></Grid.Column>
                                                    }
                                                })

                                            }
                                        </Grid.Row>);
                                        col++;

                                    }
                                )
                            }

                        </Grid>
                    </Box>
                </Paper>
            </Card>

        }
        case 4: {
            return <UploadFiles/>;

        }
            ;
        default:
            return 'Unknown step';
    }
}

export default function ViewProfileStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [isMounted, setMounted, isMountedRef] = useState(false);
    const [completed, setCompleted] = React.useState({});


    useEffect(() => {
        (async function () {
            if (!isMountedRef.current) {
                setMounted(true);
            }
        })();
    }, []);

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
        <>
            {(user !== 'NA' && isMountedRef.current) && <div className={classes.root}>
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
                        <div className={classes.instructions}>{getStepContent(activeStep)}</div>
                        <div>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                Back
                            </Button>

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                            >
                                Next
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
            }
        </>
    );
}
