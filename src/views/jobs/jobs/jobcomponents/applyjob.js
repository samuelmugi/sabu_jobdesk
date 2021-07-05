import React from 'react';
import useState from 'react-usestateref';
// reactstrap components
import {Card, CardBody, Modal} from 'reactstrap';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button, Grid} from "semantic-ui-react";
import REST_APIS from "services/APiCalls/config/apiUrl";
import BackendService from "services/APiCalls/BackendService";
import STORAGE from "services/APiCalls/config/storage";
import Signup from "views/login/login/SIgnup";
import Signin from "views/login/login/signin";

toast.configure();
const color = "#80e70b";

const ApplyJob = (props) => {
    const user = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;
    const {push} = useHistory();
    const [open, setOpen] = useState(false);
    const [loading, setLoading, loadingRef] = useState(false);

    const handleClickOpen = () => {
        setOpen(!open);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const submitApplication = async () => {
        setLoading(true);
        if (user.hasOwnProperty('id')) {
            const jobApplication = {
                jobApplicantProfileId: user.id,
                jobVacancyId: props.job?.id
            };
            const url = REST_APIS.APPLY_JOB_VACANCY.replace('PROFILEID', user.id);
            await BackendService.postRequest(url, jobApplication)
                .then(() => {
                        BackendService.notifySuccess('Job Applied successfully')
                        setLoading(false);
                        window.location.reload();

                    },
                    (error) => {
                        BackendService.notifyError('oops! error occured during personal data update. pLease try later ');
                        setLoading(false);
                        window.location.reload();

                    }
                );

        } else {
            BackendService.notifyError('Please log in to apply for the Job.');
            setLoading(false);

        }
    }

    return (
        <>


            <Button size='mini'
                    positive
                    onClick={handleClickOpen}
            >Apply</Button>
            <Modal
                className="modal-dialog-centered"
                size="sm"
                isOpen={open}
                toggle={handleClickOpen}
            >
                <div className="modal-body p-0">
                    <Card className="bg-secondary shadow border-0 justify-content-center">
                        <CardBody className="px-lg-5 py-lg-5">
                            <Grid stackable>

                                <Grid.Row stretched>
                                    <Grid.Column width={9}>
                                        To Apply for Jobs Please
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row stretched>
                                    <Grid.Column>
                                        <Button.Group>
                                            <Signup/>
                                            <Button.Or/>
                                            <Signin/>
                                        </Button.Group>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </CardBody>
                    </Card>
                </div>
            </Modal>
        </>
    );

}

export default ApplyJob;