import React from 'react';
import useState from 'react-usestateref';
// reactstrap components
import {Card, CardBody, CardHeader, Col, Modal, Row} from 'reactstrap';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import REST_APIS from 'services/APiCalls/config/apiUrl'
import BackendService from 'services/APiCalls/BackendService';
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from "react-spinners/PropagateLoader";
import {Button, Form, Icon} from "semantic-ui-react";

toast.configure();
const color = "#80e70b";

const Contact = () => {
    const {push} = useHistory();
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading, loadingRef] = useState(false);
    const [academicValues, setAcademicValues, academicValuesRef] = useState({});
    const [academicValuesErrors, setAcademicValuesErrors, academicValuesErrorsRef] = useState({});
    const [isEdited, setEditing, isEditedRef] = useState(false);

    const handleClickOpen = () => {
        setOpen(!open);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        });
        // Check and see if errors exist, and remove them from the error object:
        if (!!errors[field])
            setErrors({
                ...errors,
                [field]: null
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
            setErrors(newErrors);
        } else {
            setField('active', true)
            // No errors! Put any logic here for the form submission!
            console.log(JSON.stringify(form))
            await BackendService.postRequest(REST_APIS.SIGN_UP, form)
                .then(() => {
                        BackendService.notifySuccess(form.firstName + ' ' + form.middleName + ' ' + form.lastName + ' signed up successfully')
                        setLoading(false);
                        window.location.reload();
                    },
                    (error) => {
                        BackendService.notifySuccess('oops! error occured during sign up. pLease try later ');
                        setLoading(false);
                    }
                );
        }
    };

    const findFormErrors = () => {
        const {email, password, firstName, middleName, lastName, mobileNumber} = form;
        const newErrors = {};

        if (!email || email === '') {
            newErrors.email = 'email cannot be blank!';
        }
        if (!firstName || firstName === '') {
            newErrors.firstName = 'firstName cannot be blank!';
        }
        if (!middleName || middleName === '') {
            newErrors.middleName = 'middleName cannot be blank!';
        }
        if (!lastName || lastName === '') {
            newErrors.lastName = 'lastName cannot be blank!';
        }
        if (!mobileNumber || mobileNumber === '') {
            newErrors.mobileNumber = 'mobileNumber cannot be blank!';
        }
        if (!password || password === '') {
            newErrors.password = 'password cannot be blank!';
        }


        console.log(JSON.stringify(newErrors))

        return newErrors;
    };
    const displayError = (key) => {
        if (isEditedRef.current) {
            if (academicValuesErrorsRef.current[key]) {
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
                    <a onClick={handleClickOpen}>
                        <span>
                          Contact Us </span>
                    </a>
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
                                    <CardBody  >
                                        <Form>
                                            <Form.Group widths='equal'>
                                                <Form.Input
                                                    label="National ID"
                                                    placeholder="National ID"
                                                    name="nationalId"
                                                    value={academicValuesRef.current.nationalId}
                                                    onChange={setField}
                                                    error={displayError('nationalId') ? {
                                                        content: academicValuesErrorsRef.current?.nationalId
                                                    } : false}
                                                />
                                                <Form.Input
                                                    label="Phone NUmber"
                                                    placeholder="0712345678"
                                                    name="phoneNumber"
                                                    value={academicValuesRef.current.phoneNumber}
                                                    onChange={setField}
                                                    error={displayError('phoneNumber') ? {
                                                        content: academicValuesErrorsRef.current?.phoneNumber
                                                    } : false}
                                                />


                                            </Form.Group>
                                            <Form.Group widths='equal'>
                                                <Form.Input
                                                    label="Full Names"
                                                    placeholder="fullNames"
                                                    name="fullNames"
                                                    value={academicValuesRef.current.fullNames}
                                                    onChange={setField}
                                                    error={displayError('fullNames') ? {
                                                        content: academicValuesErrorsRef.current?.fullNames
                                                    } : false}
                                                />
                                            </Form.Group>
                                            <Form.Group widths='equal'>
                                                <Form.TextArea
                                                    label="Message"
                                                    placeholder="Tell us more"
                                                    name="message"
                                                    value={academicValuesRef.current.message}
                                                    onChange={setField}
                                                    error={displayError('fullNames') ? {
                                                        content: academicValuesErrorsRef.current?.message
                                                    } : false}
                                                />
                                            </Form.Group>
                                            <Button onClick={sendMessage} color="orange">
                                                <Icon name='send' />
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