import React from 'react';
import useState from 'react-usestateref';
// reactstrap components
import {CardHeader, Col, Container, Modal, Row} from 'reactstrap';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from "views/login/login/SIgnup";
import Signin from "views/login/login/signin";
import {Button} from "semantic-ui-react";

toast.configure();
const color = "#80e70b";

const NotSignedIn = () => {
    const {push} = useHistory();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(!open);
    };
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <>

            <Row>
                <Col>

                    <a className="text-warning"
                       href="#myprofile"
                       onClick={handleClickOpen}

                    >
                        lets get started..
                    </a>
                    <Modal
                        className="modal-dialog-centered"
                        size="sm"
                        backdrop={'static'}
                        isOpen={open}
                        toggle={handleClickOpen}
                    >

                                <h3 className="h4 text-warning text-center font-weight-bold mb-4">


                                    <button
                                        aria-label="Close"
                                        className="close"
                                        data-dismiss="modal"
                                        type="button"
                                        onClick={handleClose}
                                    >
                                        <span aria-hidden={true}>×</span>
                                    </button>
                                </h3>
                                <div className="col px-0">
                                    <Row className="align-items-center justify-content-center">
                                        <Col className="text-center">
                                            <h3 className="h4 text-success font-weight-bold mb-4">
                                                Let’s Get Started. To access these services
                                            </h3>
                                            <p className="lead text-white">
                                                You need to
                                            </p>


                                        </Col>
                                    </Row>
                                    <Row className="align-items-center justify-content-center">
                                        <Col md="auto" className="text-center">

                                            <Button.Group>
                                                <Button> <span>
                                                        <Signup/>                      </span>
                                                </Button>
                                                <Button.Or/>
                                                <Button> <span>
                    <Signin/>
                      </span></Button>
                                            </Button.Group>
                                        </Col>
                                    </Row>
                                    <Row className="align-items-center justify-content-center">
                                        <Col className="text-center" lg="6">
                                            <div className="mt-5">
                                                <small className="text-white font-weight-bold mb-0 mr-2">
                                                    Get the Right Job Vacancies & Careers.
                                                </small>

                                            </div>
                                        </Col>
                                    </Row>
                                </div>




                    </Modal>
                </Col>
            </Row>

        </>
    );

}

export default NotSignedIn;