import EmploymentHistory from "views/candidate/candidate/employmenthistory";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import {Divider, Feed, Grid} from "semantic-ui-react";
import React, {useEffect} from "react";
import STORAGE from "services/APiCalls/config/storage";
import {Card} from "reactstrap";
import useState from "react-usestateref";

const USERDATA = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;

const ExperienceStepper = (props) => {
    const [isMounted, setMounted, isMountedRef] = useState(false);
    const [user, setUser, userRef] = useState(USERDATA);
    const [workExperiences, setworkExperiences, workExperiencesRef] = useState(USERDATA?.workExperiences);

    useEffect(() => {
        (async function () {
            if (!isMountedRef.current) {
                setMounted(true);
                initializeAcademicDetails();
            }
        })();
    }, [isMounted, user]);
    const initializeAcademicDetails = () => {
        setworkExperiences(userRef.current?.workExperiences);
    }
    const refreshUserDetails = (user) => {
        setUser(user)
        setMounted(false);
    }
    return <Card className="bg-secondary shadow border-left-4">
        <EmploymentHistory refreshUserDetails={refreshUserDetails} isJobApplication={props.isJobApplication}/>
        <Paper variant="outlined" circle="true">
            <Box m={4}>
                <Grid stackable columns='equal'>

                    {
                        workExperiencesRef.current.map((val, key) => {

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
                                            <Grid.Column>
                                                <EmploymentHistory refreshUserDetails={refreshUserDetails}
                                                                   isJobApplication={props.isJobApplication}
                                                                   experience={val} edit={true}/>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <EmploymentHistory refreshUserDetails={refreshUserDetails}
                                                                   isJobApplication={props.isJobApplication}
                                                                   experience={val} delete={true}/>
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

export default ExperienceStepper;