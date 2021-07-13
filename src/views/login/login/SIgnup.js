import React from 'react';
import useState from 'react-usestateref';
// reactstrap components
import {
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
import {Button} from "semantic-ui-react";
import RequestOtp from "views/login/login/requestotp";

toast.configure();
const color = "#80e70b";

const Signup = () => {
    const {push} = useHistory();
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading, loadingRef] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
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
            setLoading(false);
        } else {
            if (form.password === form.confirmpassword) {
                setField('active', true)
                await BackendService.postRequest(REST_APIS.SIGN_UP, form)
                    .then(() => {
                            BackendService.notifySuccess(form.firstName + ' ' + form.middleName + ' ' + form.lastName + ' signed up successfully')
                            setLoading(false);
                            window.location.reload();
                        },
                        (error) => {
                            BackendService.notifyError('oops! error occured during sign up. pLease try later ');
                            setLoading(false);
                        }
                    );
            } else {
                const newErrors = {};
                newErrors.password = 'password must match confirm password!';
                newErrors.confirmpassword = 'confirm password must match password!';

                setErrors(newErrors);

                setLoading(false);
                BackendService.notifyError('Password and confrim password must be equal');
            }

        }

    };

    const findFormErrors = () => {
        const {email, oneTimePin, password, firstName, nationalID, confirmpassword, middleName, lastName, mobileNumber} = form;
        const newErrors = {};
        if (!firstName || firstName === '') {
            newErrors.firstName = 'firstName cannot be blank!';
        }
        if (!middleName || middleName === '') {
            newErrors.middleName = 'middleName cannot be blank!';
        }
        if (!lastName || lastName === '') {
            newErrors.lastName = 'lastName cannot be blank!';
        }

        if (!password || password === '') {
            newErrors.password = 'password cannot be blank!';
        }
        if (!confirmpassword || confirmpassword === '') {
            newErrors.confirmpassword = 'confirm password cannot be blank!';
        }
        if (!mobileNumber || mobileNumber === '') {
            newErrors.mobileNumber = 'mobileNumber cannot be blank!';
        }
        if (!oneTimePin || oneTimePin === '') {
            newErrors.oneTimePin = 'OTP cannot be blank!';
        }
        if (!mobileNumber || mobileNumber !== '') {
            var pattern = new RegExp(/^([0-9]{10}$)/);
            if (!pattern.test(mobileNumber)) {
                // isValid = false;
                newErrors.mobileNumber = "Please enter valid mobile number.";
            }
        }
        if (!email || email === '') {
            newErrors.email = 'email cannot be blank!';
        }
        if (!email || email !== '') {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email)) {
                // isValid = false;
                newErrors.email = "Please enter valid email address.";
            }
        }
        const isId = isNumeric(nationalID);
        if (!isId) {
            newErrors.nationalID = "Please enter valid National ID";
        }
        return newErrors;
    };

    function isNumeric(value) {
        return /^-?\d+$/.test(value);
    }

    return (
        <>
            <Row>
                <Col>
                    <Button onClick={handleClickOpen} color='orange'>
                        Register
                    </Button>
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
                                            <small>Sign up</small>

                                        </div>
                                    </CardHeader>
                                    <CardBody className="px-lg-5 py-lg-5">
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
                                                        <InputGroup className="input-group-alternative mb-3">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="ni ni-hat-3"/>
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input placeholder="National Id" type="number"
                                                                   onChange={(e) => setField('nationalID', e.target.value)}
                                                                   invalid={!!errors.nationalID}/>
                                                            <FormFeedback>{errors.nationalID}</FormFeedback>
                                                        </InputGroup>

                                                    </FormGroup>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                        <InputGroup className="input-group-alternative">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i onClick={togglePasswordVisiblity}
                                                                       className="fa fa-eye"/>
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input placeholder="Password"
                                                                   type={passwordShown ? "text" : "password"}
                                                                   onChange={(e) => setField('password', e.target.value)}
                                                                   invalid={!!errors.password}/>
                                                            <FormFeedback>{errors.password}</FormFeedback>
                                                        </InputGroup>
                                                    </FormGroup>
                                                </Col>
                                                <Col>
                                                    <FormGroup>
                                                        <InputGroup className="input-group-alternative">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i onClick={togglePasswordVisiblity}
                                                                       className="fa fa-eye"/>
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input placeholder="confirm Password"
                                                                   type={passwordShown ? "text" : "password"}
                                                                   onChange={(e) => setField('confirmpassword', e.target.value)}
                                                                   invalid={!!errors.confirmpassword}/>
                                                            <FormFeedback>{errors.confirmpassword}</FormFeedback>
                                                        </InputGroup>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <RequestOtp  isSignin={false}  errors={errors} mobileNumber={form.mobileNumber}
                                                                  setField={setField}/>
                                                </Col>
                                            </Row>
                                            <div className="text-center">
                                                <Button
                                                    className="mt-4"
                                                    color="green"
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