import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import {Grid, GridColumn, GridRow, Label, List} from "semantic-ui-react";
import React, {useEffect} from "react";
import STORAGE from "services/APiCalls/config/storage";
import {Card} from "reactstrap";
import useState from "react-usestateref";
import CoverLetter from "views/candidate/candidate/coverletter";
import Typography from "@material-ui/core/Typography";

const USERDATA = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;

const CoverLetterStepper = (props) => {
    const [isMounted, setMounted, isMountedRef] = useState(false);
    const [user, setUser, userRef] = useState(USERDATA);

    useEffect(() => {
        (async function () {
            if (!isMountedRef.current) {
                refreshUserDetails(userRef?.current);
                setMounted(true);
            }
        })();
    }, [isMounted, user]);

    const refreshUserDetails = (user) => {
        console.log(user);
        setUser(user)
        setMounted(false);
    }
    return <Card className="bg-secondary shadow  ">
        <CoverLetter refreshUserDetails={refreshUserDetails} isJobApplication={props.isJobApplication}/>
        <Paper variant="outlined" circle="true">
            <Box m={4}>
                <Grid stackable columns='equal'>
                    <GridRow>
                        <GridColumn>
                            <Label>Cover Letter.</Label>
                            {userRef.current?.coverLetter !==null &&
                            <Typography  paragraph style={{whiteSpace: "pre-line"}}>
                                {userRef.current?.coverLetter.split("\n").join("\n")}
                            </Typography>}
                        </GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn>
                            <List horizontal>
                                {userRef.current?.kraClearace &&
                                <List.Item>
                                    <List.Icon name='check'/>
                                    <List.Content>KRA Clerance</List.Content>
                                </List.Item>}
                                {userRef.current?.helbClearance &&
                                <List.Item>
                                    <List.Icon name='check'/>
                                    <List.Content>HELB Clerance</List.Content>
                                </List.Item>}
                                {userRef.current?.eaccClearance &&
                                <List.Item>
                                    <List.Icon name='check'/>
                                    <List.Content>EACC Clerance</List.Content>
                                </List.Item>}
                                {userRef.current?.crbClearance &&
                                <List.Item>
                                    <List.Icon name='check'/>
                                    <List.Content>CRB Clerance</List.Content>
                                </List.Item>}
                                {userRef.current?.goodConductClearance &&
                                <List.Item>
                                    <List.Icon name='check'/>
                                    <List.Content>Good Conduct</List.Content>
                                </List.Item>}

                            </List>

                        </GridColumn>
                    </GridRow>
                </Grid>
            </Box>
        </Paper>
    </Card>
        ;
}

export default CoverLetterStepper;
