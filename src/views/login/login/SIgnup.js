import React from 'react';
import useState from 'react-usestateref';
// reactstrap components
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Modal,
    Row
} from 'reactstrap';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import REST_APIS from 'services/APiCalls/config/apiUrl'
import BackendService from 'services/APiCalls/BackendService';
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from "react-spinners/PropagateLoader";

toast.configure();
const color = "#80e70b";

const Signup = () => {
    const {push} = useHistory();
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading, loadingRef] = useState(false);

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
    const doSignUp = async (event) => {
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

    return (
        <>
            <Row>
                <Col md="4">
                    <a
                        onClick={handleClickOpen}
                    ><span className="nav-link-inner--text ml-1 btn-inner--icon">
                        <i className="fa fa-user-plus mr-2">
                         &nbsp;SIGN_UP </i></span> </a>
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
                                    <CardHeader className="bg-white pb-5">
                                        <h3 className="h4 text-warning text-center font-weight-bold mb-4">

                                            Want to work with us?
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
                                        <div className="text-muted text-center mb-3">
                                            <small>Sign up with</small>

                                        </div>
                                        <div className="text-center">
                                            <Button
                                                className="btn-neutral btn-icon mr-4"
                                                color="default"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                            >
                          <span className="btn-inner--icon mr-1">
                            <img
                                alt="..."
                                src={require("assets/img/icons/common/github.svg")}
                            />
                          </span>
                                                <span className="btn-inner--text">Github</span>
                                            </Button>
                                            <Button
                                                className="btn-neutral btn-icon ml-1"
                                                color="default"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                            >
                          <span className="btn-inner--icon mr-1">
                            <img
                                alt="..."
                                src={require("assets/img/icons/common/google.svg")}
                            />
                          </span>
                                                <span className="btn-inner--text">Google</span>
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="px-lg-5 py-lg-5">
                                        <div className="text-center text-muted mb-4">
                                            <small>Or sign up with credentials</small>
                                        </div>
                                        <Form role="form">
                                            <Row>
                                                <Col> <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="ni ni-hat-3"/>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input placeholder="firstName" type="text"
                                                               onChange={(e) => setField('firstName', e.target.value)}
                                                               invalid={!!errors.firstName}/>
                                                        <FormFeedback>{errors.firstName}</FormFeedback>
                                                    </InputGroup>

                                                </FormGroup></Col>
                                                <Col> <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="ni ni-hat-3"/>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input placeholder="middleName" type="text"
                                                               onChange={(e) => setField('middleName', e.target.value)}
                                                               invalid={!!errors.middleName}/>
                                                        <FormFeedback>{errors.middleName}</FormFeedback>
                                                    </InputGroup>

                                                </FormGroup></Col>
                                            </Row>
                                            <Row>
                                                <Col> <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="ni ni-hat-3"/>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input placeholder="lastName" type="text"
                                                               onChange={(e) => setField('lastName', e.target.value)}
                                                               invalid={!!errors.lastName}/>
                                                        <FormFeedback>{errors.lastName}</FormFeedback>
                                                    </InputGroup>

                                                </FormGroup></Col>
                                                <Col> <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="ni ni-hat-3"/>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input placeholder="0712345678" type="number"
                                                               onChange={(e) => setField('mobileNumber', e.target.value)}
                                                               invalid={!!errors.mobileNumber}/>
                                                        <FormFeedback>{errors.mobileNumber}</FormFeedback>
                                                    </InputGroup>

                                                </FormGroup></Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                        <InputGroup className="input-group-alternative mb-3">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="ni ni-hat-3"/>
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input placeholder="johndoe@rmail.com" type="text"
                                                                   onChange={(e) => setField('email', e.target.value)}
                                                                   invalid={!!errors.email}/>
                                                            <FormFeedback>{errors.email}</FormFeedback>
                                                        </InputGroup>

                                                    </FormGroup>
                                                </Col>

                                                <Col>
                                                    <FormGroup>
                                                        <InputGroup className="input-group-alternative">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="ni ni-lock-circle-open"/>
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input placeholder="Password" type="password"
                                                                   onChange={(e) => setField('password', e.target.value)}
                                                                   invalid={!!errors.password}/>
                                                            <FormFeedback>{errors.password}</FormFeedback>
                                                        </InputGroup>
                                                    </FormGroup>
                                                </Col>
                                            </Row>


                                            <div className="text-center">
                                                <Button
                                                    className="mt-4"
                                                    color="primary"
                                                    type="submit"
                                                    onClick={doSignUp}

                                                >
                                                    Create account
                                                </Button>
                                            </div>
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

export default Signup;