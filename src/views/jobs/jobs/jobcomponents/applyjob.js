import React from 'react';
import useState from 'react-usestateref';
// reactstrap components
import {Card, CardBody, Modal} from 'reactstrap';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button, Grid} from "semantic-ui-react";
import Signup from "views/login/login/SIgnup";
import Signin from "views/login/login/signin";

toast.configure();
const color = "#80e70b";

const ApplyJob = (props) => {
      const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(!open);
    };

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