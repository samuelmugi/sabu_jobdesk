import React, {useEffect} from "react";
import {Grid, Label} from "semantic-ui-react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import STORAGE from "services/APiCalls/config/storage";
import {Card} from "reactstrap";
import useState from "react-usestateref";
import Skills from "views/candidate/candidate/Skills";

const USERDATA = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;

const SkillStepper = (props) => {
    let col = 0;
    const [isMounted, setMounted, isMountedRef] = useState(false);
    const [user, setUser, userRef] = useState(USERDATA);
    const [noOfRows, setnoOfRows, noOfRowsRef] = useState(0);
    const [skills, setskills, skillsRef] = useState({});

    useEffect(() => {
        (async function () {
            if (!isMountedRef.current) {
                setMounted(true);
                initializeSkills();
            }
        })();
    }, [isMounted, user, skills]);

    const refreshSkills = (user) => {
        setUser(user)
        setMounted(false);
    }

    const initializeSkills = () => {
        col = 0;
        let noOfRows = 0;
        const skills = userRef.current?.skills;
        const sizeOfFields = skills.length;
        const rowModulus = +sizeOfFields % 5;
        setskills(skills);
        if (+rowModulus > 0) {
            noOfRows = ((+sizeOfFields - rowModulus) / 5) + 1;
        } else {
            noOfRows = +sizeOfFields / 5;
        }
        if (+rowModulus > 0) {
            noOfRows = ((+sizeOfFields - rowModulus) / 4) + 1;
            setnoOfRows(noOfRows)
        } else {
            noOfRows = +sizeOfFields / 4;
            setnoOfRows(noOfRows)
        }

    }


    return <Card className="bg-secondary shadow  ">
        <Skills refreshSkills={refreshSkills} isJobApplication={props.isJobApplication}/>
        <Paper variant="outlined" circle>
            <Box m={4}>
                <Grid stackable columns='equal'>
                    {
                        [...Array(noOfRows).keys()].map((row) => {
                                const colNos = skillsRef.current.length > 4 ? 4 : skillsRef.current.length;
                                return (<Grid.Row>
                                    {
                                        [...Array(colNos).keys()].map((coll) => {
                                            if (skillsRef.current.length > col) {
                                                const skill = JSON.parse(skillsRef.current[col]);
                                                col++;
                                                return (
                                                    <Grid.Column>
                                                        <Label   color='red' tag>
                                                            <strong>{skill?.skill}</strong> &nbsp;&nbsp; <Skills skill={skill} refreshSkills={refreshSkills} delete={true}/>
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


export default SkillStepper;