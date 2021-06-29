import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import JobAccordion from "views/jobs/jobs/jobcomponents/JobAccordion";
import useState from 'react-usestateref';
import BackendService from 'services/APiCalls/BackendService';
import REST_APIS from 'services/APiCalls/config/apiUrl'


const useJobStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    }
}));

const Alljobs = () => {
    const classes = useJobStyles();
    const [personalInfoValues, setPersonalInfoValues, personalInfoValuesRef] = useState({});
    const [loading, setLoading, loadingRef] = useState(false);
    const [isMounted, setMounted, isMountedRef] = useState(false);
    const [alljobs, setAllJobs, alljobsRef] = useState({});

    useEffect(() => {
        (async function () {
            if (!isMountedRef.current) {
                fetchData();
                setMounted(true);
            }
        })();
    }, [alljobs]);

    const fetchData = async () => {
        await BackendService.getRequest(REST_APIS.GET_ALL_JOB_VACANCIES)
            .then(data => setAllJobs(data.data));
    }

    return (
        <div className={classes.root}>
            <JobAccordion
                jobs={alljobsRef.current}
            />

        </div>
    );
}

export default Alljobs;