import React, {useEffect} from "react";
import {Feed, Grid} from "semantic-ui-react";
import ProfileConstants from "views/candidate/profile/profileconstants";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import STORAGE from "services/APiCalls/config/storage";
import {Card} from "reactstrap";
import useState from "react-usestateref";
import PersonalInfoDialog from "views/candidate/candidate/personaldialog";
import moment from "moment";

const USERDATA = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;

const PersonalInfoStepper = (props) => {
    let col = 0;
    const personalInfoFields = ProfileConstants.personalInfoFields;
    const sizeOfFields = personalInfoFields.length;
    const rowModulus = +sizeOfFields % 4;
    const [isMounted, setMounted, isMountedRef] = useState(false);
    const [user, setUser, userRef] = useState(USERDATA);
    const [noOfRows, setnoOfRows, noOfRowsRef] = useState(0);


    useEffect(() => {
        (async function () {
            if (!isMountedRef.current) {
                setMounted(true);
                initializePersoanlInfoDetails();
            }
        })();
    }, [isMounted, user]);

    const refreshUserDetails = (user) => {
        setUser(user)
        setMounted(false);
    }
    const initializePersoanlInfoDetails = () => {
        col = 0;
        let noOfRows = 0;

        if (+rowModulus > 0) {
            noOfRows = ((+sizeOfFields - rowModulus) / 4) + 1;
            setnoOfRows(noOfRows)
        } else {
            noOfRows = +sizeOfFields / 4;
            setnoOfRows(noOfRows)
        }
    }


    return <Card className="bg-secondary shadow  ">
        <PersonalInfoDialog refreshUserDetails={refreshUserDetails}  isJobApplication={props.isJobApplication}/>
        <Paper variant="outlined">

            <Box m={4}>
                <Grid stackable columns='equal'>
                    {
                        [...Array(noOfRows).keys()].map((row) => {

                                return (<Grid.Row>
                                    {
                                        [...Array(4).keys()].map((coll) => {
                                            const field = personalInfoFields[col];
                                            const otherValue= field?.field === 'disabled'?((userRef.current?.disabled)?'Yes':'No'):userRef.current[field?.field];

                                            const fieldFeed = [
                                                {
                                                    date: field?.field,
                                                    summary: field?.field === 'dateOfBirth' ? moment(userRef.current[field?.field]).format("YYYY-MM-DD") : otherValue,
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

export default PersonalInfoStepper;