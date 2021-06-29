import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import {Divider, Feed, Grid, Label} from 'semantic-ui-react'
import STORAGE from "services/APiCalls/config/storage";
import {Card} from "reactstrap";
import ProfileConstants from "views/candidate/profile/profileconstants";

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
    return ['Personal Info', 'Academic Details', 'Experience', 'Skills'];
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
            console.log('noOfRows=', noOfRows)
            const events = [
                {
                    date: '4 Likes',
                    summary: 'Elliot Fu added you as a friend',
                }
            ]
            let col = 0;
            return <Card className="bg-secondary shadow  ">
                <Paper variant="outlined" circle>
                    <Box m={4}>
                        <Grid columns='equal'>
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
                            {     (user!== 'NA' && user?.homeCounty!==null) && (<Grid.Row>
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
                            {(user!== 'NA' && user?.countyOfResidence!==null) && ( <Grid.Row>
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
                <Paper variant="outlined" circle>
                    <Box m={4}>
                        <Grid columns='equal'>
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
                <Paper variant="outlined" circle>
                    <Box m={4}>
                        <Grid columns='equal'>
                            {
                                [...Array(noOfRows).keys()].map((row) => {
                                        return (<Grid.Row>
                                            {
                                                [...Array(4).keys()].map((coll) => {
                                                    const skill = skills[col];
                                                    col++;
                                                    return (
                                                        <Grid.Column>
                                                            <Label as='a' color='red' tag>
                                                                {skill}
                                                            </Label>
                                                        </Grid.Column>
                                                    )
                                                })

                                            }
                                        </Grid.Row>)

                                    }
                                )
                            }

                        </Grid>
                    </Box>
                </Paper>
            </Card>

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
    const steps = getSteps();

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if(activeStep===getSteps().length-1){
            setActiveStep(0);
        }
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <>
            {user !== 'NA' && <div className={classes.root}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = <Typography variant="caption">Optional</Typography>;
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>

                    <div>
                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
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
