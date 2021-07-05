import React, {useEffect} from "react";
import {Divider, Feed, Grid} from "semantic-ui-react";
import ProfileConstants from "views/candidate/profile/profileconstants";
import SecondarySchoolDialog from "views/candidate/candidate/secondarydialog";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import PostSecondary from "views/candidate/candidate/postsecondary";
import STORAGE from "services/APiCalls/config/storage";
import {Card} from "reactstrap";
import useState from "react-usestateref";

const USERDATA = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;

const AcademicStepper = (props) => {
    const academicValuesFields = ProfileConstants.academicValuesFields;
    let col = 0;
    const [isMounted, setMounted, isMountedRef] = useState(false);
    const [user, setUser, userRef] = useState(USERDATA);
    const [noOfRows, setnoOfRows, noOfRowsRef] = useState(0);
    const [academicQualifications, setacademicQualifications, academicQualificationsRef] = useState(USERDATA?.academicQualifications);

    useEffect(() => {
        (async function () {
            if (!isMountedRef.current) {
                setMounted(true);
                initializeAcademicDetails();
            }
        })();
    }, [isMounted, user, academicQualifications]);

    const refreshUserDetails = (user) => {
        setUser(user)
        setMounted(false);
    }

    const initializeAcademicDetails = () => {
        const academicQualifications = userRef.current?.academicQualifications;
        setacademicQualifications(academicQualifications);
        const sizeOfFields = academicValuesFields.length;
        const rowModulus = +sizeOfFields % 4;
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
    return <Card className="bg-secondary shadow border-left-4">
        <SecondarySchoolDialog refreshUserDetails={refreshUserDetails} isJobApplication={props.isJobApplication}/>
        <Paper variant="outlined" circle>
            <Box m={4}>
                <Grid stackable columns='equal'>
                    {
                        [...Array(noOfRowsRef.current).keys()].map((row) => {
                                return (<Grid.Row>
                                    {
                                        [...Array(4).keys()].map((coll) => {
                                            const field = academicValuesFields[col];
                                            const fieldFeed = [
                                                {
                                                    date: field?.field,
                                                    summary: userRef.current[field?.field],
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
                            <PostSecondary refreshUserDetails={refreshUserDetails}
                                           isJobApplication={props.isJobApplication}/>
                        </Grid.Column>
                    </Grid.Row>
                    {academicQualificationsRef.current !== null &&
                    academicQualificationsRef.current.map((val, key) => {

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
                                        <Grid.Column>
                                            <PostSecondary refreshUserDetails={refreshUserDetails}
                                                           isJobApplication={props.isJobApplication}
                                                           qualification={val} edit={true}/>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <PostSecondary refreshUserDetails={refreshUserDetails}
                                                           isJobApplication={props.isJobApplication}
                                                           qualification={val} delete={true}/>
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

export default AcademicStepper;