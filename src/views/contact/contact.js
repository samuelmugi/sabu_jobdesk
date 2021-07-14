import React from 'react';
import useState from 'react-usestateref';
// reactstrap components
import {Card, CardBody, CardHeader, Col, Modal, NavLink, Row} from 'reactstrap';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import REST_APIS from 'services/APiCalls/config/apiUrl'
import BackendService from 'services/APiCalls/BackendService';
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from "react-spinners/PropagateLoader";
import {Button, Form, Icon} from "semantic-ui-react";
import * as CandidateConstants from "views/candidate/candidate/candidateconstants";

toast.configure();
const color = "#80e70b";
const contactValuesFields = CandidateConstants.contactValuesFields;

const Contact = () => {
    const {push} = useHistory();
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading, loadingRef] = useState(false);
    const [isEdited, setEditing, isEditedRef] = useState(false);

    const handleClickOpen = () => {
        setOpen(!open);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const setField = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        // Check and see if errors exist, and remove them from the error object:
        if (!!errors[e.target.name])
            setErrors({
                ...errors,
                [e.target.name]: null
            });
    };
    const sendMessage = async (event) => {
        event.preventDefault();
        setLoading(true);
        // get our new errors
        const newErrors = findFormErrors();
        // Conditional logic:
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            console.log(JSON.stringify(newErrors));
            setErrors(newErrors);
            setLoading(false);
        } else {
            // No errors! Put any logic here for the form submission!
            console.log(JSON.stringify(form))
            await BackendService.postRequest(REST_APIS.CREATE_TICKET, form)
                .then((resp) => {
                        BackendService.notifySuccess(resp.data.message)
                        setLoading(false);

                    },
                    (error) => {
                        BackendService.notifySuccess('oops! error occured during sign up. pLease try later ');
                        setLoading(false);
                    }
                );
        }
    };

    const findFormErrors = () => {
        const {message, fullNames, phoneNumber, nationalId, emailAddress} = form;
        const newErrors = {};

        if (!message || message === '') {
            newErrors.message = 'message cannot be blank!';
        }
        if (!fullNames || fullNames === '') {
            newErrors.fullNames = 'fullNames cannot be blank!';
        }
        if (!phoneNumber || phoneNumber === '') {
            newErrors.phoneNumber = 'phoneNumber cannot be blank!';
        }
        if (!nationalId || nationalId === '') {
            newErrors.nationalId = 'nationalId cannot be blank!';
        }
        if (!emailAddress || emailAddress !== '') {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(emailAddress)) {
                newErrors.emailAddress = 'Please enter valid email address!';

            }
        }

        return newErrors;
    };
    const displayError = (key) => {
        if (isEditedRef.current) {
            if (errors.current[key]) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    return (
        <>
            <Row>
                <Col>

                    <NavLink onClick={handleClickOpen}>

                        Contact Us
                    </NavLink>
                    <Modal
                        className="modal-dialog-centered"
                        size="lg"
                        backdrop={'static'}
                        isOpen={open}
                        toggle={handleClickOpen}
                    >
                        <LoadingOverlay
                            active={loadingRef.current}
                            spinner={<ClipLoader color={color} loading={loadingRef.current}/>}
                        >
                            <div className="modal-body p-0">
                                <Card className="bg-secondary shadow border-0">
                                    <CardHeader>
                                        <h3 className=" text-warning text-center font-weight-bold mb-4">

                                            For any enquiries contact NCPSB by filling the form below.

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
                                    </CardHeader>
                                    <CardBody>
                                        <Form>
                                            <Form.Group widths='equal'>
                                                <Form.Input
                                                    label="National ID"
                                                    placeholder="National ID"
                                                    name="nationalId"
                                                    onChange={(e) => setField(e)}
                                                    error={displayError('nationalId') ? {
                                                        content: errors.current?.nationalId
                                                    } : false}
                                                />
                                                <Form.Input
                                                    label="Phone NUmber"
                                                    placeholder="0712345678"
                                                    name="phoneNumber"
                                                    onChange={(e) => setField(e)}
                                                    error={displayError('phoneNumber') ? {
                                                        content: errors.current?.phoneNumber
                                                    } : false}
                                                />


                                            </Form.Group>
                                            <Form.Group widths='equal'>
                                                <Form.Input
                                                    label="Full Names"
                                                    placeholder="fullNames"
                                                    name="fullNames"
                                                    onChange={(e) => setField(e)}
                                                    error={displayError('fullNames') ? {
                                                        content: errors.current?.fullNames
                                                    } : false}
                                                />
                                            </Form.Group>
                                            <Form.Group widths='equal'>
                                                <Form.Input
                                                    label="Email"
                                                    placeholder="johndoe@gmail.com"
                                                    name="emailAddress"
                                                    onChange={(e) => setField(e)}
                                                    error={displayError('emailAddress') ? {
                                                        content: errors.current?.emailAddress
                                                    } : false}
                                                />
                                            </Form.Group>
                                            <Form.Group widths='equal'>
                                                <Form.TextArea
                                                    label="Message"
                                                    placeholder="Tell us more"
                                                    name="message"
                                                    onChange={(e) => setField(e)}
                                                    error={displayError('message') ? {
                                                        content: errors.current?.message
                                                    } : false}
                                                />
                                            </Form.Group>
                                            <Button onClick={sendMessage} color="orange">
                                                <Icon name='send'/>
                                                Send
                                            </Button>
                                            <Button onClick={handleClose} color="grey">
                                                Close
                                            </Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </div>
                        </LoadingOverlay>
                    </Modal>
                </Col>
            </Row>
        </>
    );
}

export default Contact;