import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import JobAccordion from "views/jobs/jobs/jobcomponents/JobAccordion";
import useState from 'react-usestateref';
import BackendService from 'services/APiCalls/BackendService';
import REST_APIS from 'services/APiCalls/config/apiUrl'
import STORAGE from "services/APiCalls/config/storage";
import {Feed, Icon, List} from "semantic-ui-react";


const useJobStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    }
}));

const Alljobs = () => {
    const classes = useJobStyles();
    const [isMounted, setMounted, isMountedRef] = useState(false);
    const [alljobs, setAllJobs, alljobsRef] = useState({});
    const user = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;

    useEffect(() => {
        (async function () {
            if (!isMountedRef.current) {
                fetchData();
                setMounted(true);
            }
        })();
    }, [alljobs]);

    const fetchData = () => {
        const url = user !== 'NA' ? REST_APIS.GET_ALL_JOB_NOT_APPLIED + user.id : REST_APIS.GET_ALL_JOB_VACANCIES;
        BackendService.getRequest(url)
            .then(response => setAllJobs(response.data?.payload));
    }

    return (
        <div className={classes.root}>
            {alljobsRef.current.length>0? <JobAccordion
                jobs={alljobsRef.current}
            />
            : <Feed>
                <Feed.Event
                date='Today'
                summary="No Jobs to apply at this time."
                ><Icon name='comment'/>
                </Feed.Event>

                </Feed>}

        </div>
    );
}

export default Alljobs;