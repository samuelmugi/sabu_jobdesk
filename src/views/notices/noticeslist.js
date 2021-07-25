import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import useState from 'react-usestateref';
import BackendService from 'services/APiCalls/BackendService';
import REST_APIS from 'services/APiCalls/config/apiUrl'
import {Divider, Feed, Icon, Label, List} from "semantic-ui-react";
import download from 'downloadjs'


const useJobStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    }
}));

const AllNotices = (props) => {
    const [isMounted, setMounted, isMountedRef] = useState(false);
    const [allnotices, setAllNotices, allnoticesRef] = useState([]);

    useEffect(() => {
        (async function () {
            if (!isMountedRef.current) {
                fetchData();

            }
        })();
    }, [allnotices]);

    const fetchData = () => {
        let url;
        if(props.type==='notices'){
            url=REST_APIS.GET_ALL_NOTICES;
        }
        if(props.type==='shortlist'){
            url=REST_APIS.GET_ALL_SHORTLIST;
        }
        BackendService.getRequest(url)
            .then(response => {
                setAllNotices(response.data?.payload)
            });
        setMounted(true);
    }

    const downloadNotice = (notice) => (e) => {
        e.preventDefault();
        const url = REST_APIS.DOWNLOAD_SHORTLIST + notice.id;
        BackendService.DwonloadRequest(url)
            .then((response) => {
                const content = response.headers['application/octetstream'];
                download(new Blob([response.data], {type: "application/octetstream"}), notice.attachmentName, content)
            });
    }

    return (
        <List as='ol' divided>
            {allnoticesRef.current && allnoticesRef.current.map((notice) => {
                return <>
                    <List.Item key={notice.id}>
                        <List.Content key={notice.id + notice.attachmentName} as='li' floated='left'>
                            {notice.category + '-' + notice.title}

                        </List.Content>
                        <List.Content key={notice.id + notice.attachmentName + notice.title} floated='right'>
                            <Label onClick={downloadNotice(notice)} as='a' color='teal' tag>
                                 Download <Icon name='download'/>
                            </Label>
                        </List.Content>

                    </List.Item>
                </>
            })}
            {!allnoticesRef.current &&
            <List.Item>
                <List.Content floated='left'>
                    <Feed>
                        <Feed.Event
                            date='Today'
                            summary="No notifications posted yet."
                        ><Icon name='comment'/>
                        </Feed.Event>

                    </Feed>
                </List.Content>
            </List.Item>
            }
            <Divider/>

        </List>
    );
}

export default AllNotices;