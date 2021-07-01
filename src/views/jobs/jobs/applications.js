import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import BackendService from "services/APiCalls/BackendService";
import REST_APIS from "services/APiCalls/config/apiUrl";
import useState from "react-usestateref";
import STORAGE from "services/APiCalls/config/storage";
import {List} from "semantic-ui-react";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay";
import ClipLoader from "react-spinners/PropagateLoader";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    }
}));
const user = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;

const JobApplications = () => {
    const classes = useStyles();
    const color = "#60991f";
    const [isMounted, setMounted, isMountedRef] = useState(false);
    const [alljobs, setAllJobs, alljobsRef] = useState({});
    const [loading, setLoading, loadingRef] = useState(true);

    useEffect(() => {
        (async function () {
            setLoading(true);

            if (!isMountedRef.current) {
                fetchData();
                setMounted(true);
            }
        })();
    }, [alljobs]);

    const fetchData = async () => {
        setLoading(true);

        await BackendService.getRequest(REST_APIS.MY_JOB_APPLICATIONS + user.id)
            .then(res => {
                setAllJobs(res.data?.payload);
                setTimeout(() => setLoading(false), 3000)

            });
    }

    return (
        <div className={classes.root}>
            <LoadingOverlay
                active={loadingRef.current}
                spinner={<ClipLoader color={color} loading={loadingRef.current}/>}
            >
                <List divided relaxed>
                    {alljobsRef.current.length > 0 &&
                    alljobsRef.current.map((job) => {
                        return (
                            <List.Item>
                                <List.Icon name='certificate' size='large' verticalAlign='middle'/>
                                <List.Content>
                                    <List.Header as='a'>{'Title' + job.jobTitle}</List.Header>
                                    <List.Description
                                        as='a'>{'Application Date' + moment(job.applicationDate).format("MMM Do YYYY")}</List.Description>
                                </List.Content>
                            </List.Item>
                        );
                    })
                    }
                </List>
            </LoadingOverlay>
        </div>
    );
}

export default JobApplications;