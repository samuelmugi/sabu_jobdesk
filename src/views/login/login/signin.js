import React, {useEffect} from 'react';
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
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from "react-spinners/PropagateLoader";
import AuthenticationService from 'services/APiCalls/AuthenticationService';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackendService from 'services/APiCalls/BackendService';
import {Button} from "semantic-ui-react";
import STORAGE from "services/APiCalls/config/storage";
import REST_APIS from 'services/APiCalls/config/apiUrl'
import RequestOtp from "views/login/login/requestotp";

toast.configure();
const color = "#80e70b";
const styles = {
    textInputStyle: {
        color: 'green',
    }
};
const Signin = () => {
    const {push} = useHistory();
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading, loadingRef] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);

    useEffect(() => {
        (async function () {

        })();
    }, [resetPassword]);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    const toggleResetPassword = () => {
        setResetPassword(resetPassword ? false : true);
    };
    const handleClickOpen = () => {
        setOpen(!open);
        setResetPassword(false);

    };
    const handleClose = () => {
        setOpen(false);
        setResetPassword(false);

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
    const doLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        // get our new errors
        const newErrors = findFormErrors();
        // Conditional logic:
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            setLoading(false);
            setErrors(newErrors);
        } else {
            if (resetPassword) {
                const {username, confirmpassword, password} = form;

                const url = REST_APIS.RESET_PASSWORD;
                const resetForm = {
                    email: form.username,
                    password: form.password,
                    oneTimePin:form.oneTimePin
                };

                if (form.password === form.confirmpassword) {
                    BackendService.postRequest(url, resetForm)
                        .then(() => {
                            BackendService.notifySuccess('Password reset successful.');
                        });
                    setLoading(false);
                    STORAGE.destroyAuthTOken();
                } else {
                    BackendService.notifyError('Passwords do not match.');
                    setLoading(false);
                    STORAGE.destroyAuthTOken();
                }
            } else {
                AuthenticationService.signin(form.username, form.password)
                    .then((response) => {
                            console.log(response)

                            if (response.status === 200) {
                                BackendService.notifySuccess('Logged n in Successfully.');

                                STORAGE.setAuthTOken(response.data?.payload?.jwtToken);
                                STORAGE.setUserDetials(response.data.payload?.userDetails);
                                window.location.reload();
                            } else {
                                setErrors({
                                    password:
                                        'Invalid credentials'
                                });
                            }
                            setLoading(false);

                        },
                        (error) => {
                            setLoading(false);

                            console.log(error);
                            if (error.toString().includes('401')) {
                                BackendService.notifyError('oops! Please confirm your username and password')

                                setErrors({
                                    password:
                                        'oops! Please confirm your username and password'
                                });
                            } else {
                                BackendService.notifyError('Login fail');
                                setErrors({
                                    password:
                                        'Please contact Sytem Admin to assist!'
                                });
                            }
                            setLoading(false);

                        }
                    );
            }
        }
    };

    const findFormErrors = () => {
        const {username, oneTimePin, confirmpassword, password} = form;
        const newErrors = {};

        // username errors
        if (!username || username === '')
            newErrors.username = 'username cannot be blank!';
        if (!username || username !== '') {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(username)) {
                // isValid = false;
                newErrors.username = "Please enter valid email address.";
            }
        }
        // food errors
        if (!password || password === '')
            newErrors.password = 'password cannot be blank!';
        if (resetPassword) {
            if (!oneTimePin || oneTimePin === '') {
                newErrors.oneTimePin = 'OTP cannot be blank!';
            }
            if (!confirmpassword || confirmpassword === '')
                newErrors.confirmpassword = 'confirmpassword cannot be blank!';

            if (!confirmpassword || confirmpassword === '') {
                newErrors.confirmpassword = 'confirm password cannot be blank!';
            }
            // if (!mobileNumber || mobileNumber === '')
            //     newErrors.mobileNumber = 'mobileNumber cannot be blank!';
            // if (!mobileNumber || mobileNumber !== '') {
            //     var pattern = new RegExp(/^([0-9]{10}$)/);
            //     if (!pattern.test(mobileNumber)) {
            //         // isValid = false;
            //         newErrors.mobileNumber = "Please enter valid mobile number.";
            //     }
            // }

        }
        return newErrors;
    };
    return (
        <>

            <Row>
                <Col>

                    <Button onClick={handleClickOpen} color='green'>
                        Log in
                    </Button>
                    <Modal
                        className="modal-dialog-centered"
                        size="sm"
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
                                    <CardHeader className="bg-transparent pb-5">
                                        <div className="text-muted text-center mt-2 mb-3">
                                            <small>Sign in with credentials</small>
                                            <button
                                                aria-label="Close"
                                                className="close"
                                                data-dismiss="modal"
                                                type="button"
                                                onClick={handleClose}
                                            >
                                                <span aria-hidden={true}>×</span>
                                            </button>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="px-lg-5 py-lg-5">

                                        <Form role="form">
                                            <FormGroup className="mb-3">
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-email-83"/>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input style={{'fontSize': '15px'}} placeholder="Email" type="email"
                                                           onChange={(e) => setField('username', e.target.value)}
                                                           invalid={!!errors.username}/>
                                                    <FormFeedback>{errors.username}</FormFeedback>

                                                </InputGroup>
                                            </FormGroup>
                                            {/*{resetPassword &&*/}
                                            {/*<FormGroup className="mb-3">*/}
                                            {/*    <InputGroup className="input-group-alternative">*/}
                                            {/*        <InputGroupAddon addonType="prepend">*/}
                                            {/*            <InputGroupText>*/}
                                            {/*                <i className="ni ni-email-83"/>*/}
                                            {/*            </InputGroupText>*/}
                                            {/*        </InputGroupAddon>*/}
                                            {/*        <Input placeholder="Phone Number" type="number"*/}
                                            {/*               onChange={(e) => setField('mobileNumber', e.target.value)}*/}
                                            {/*               invalid={!!errors.mobileNumber}/>*/}
                                            {/*        <FormFeedback>{errors.mobileNumber}</FormFeedback>*/}

                                            {/*    </InputGroup>*/}
                                            {/*</FormGroup>}*/}
                                            <FormGroup className="mb-3">
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i onClick={togglePasswordVisiblity} className="fa fa-eye"/>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input placeholder="Password"
                                                           type={passwordShown ? "text" : "password"}
                                                           onChange={(e) => setField('password', e.target.value)}
                                                           invalid={!!errors.password}/>
                                                    <FormFeedback>{errors.password}</FormFeedback>
                                                </InputGroup>
                                            </FormGroup>
                                            {resetPassword && <FormGroup className="mb-3">
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i onClick={togglePasswordVisiblity} className="fa fa-eye"/>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input placeholder="Confirm Password"
                                                           type={passwordShown ? "text" : "password"}
                                                           onChange={(e) => setField('confirmpassword', e.target.value)}
                                                           invalid={!!errors.confirmpassword}/>
                                                    <FormFeedback>{errors.confirmpassword}</FormFeedback>
                                                </InputGroup>
                                            </FormGroup>}
                                            <div className="custom-control custom-checkbox mb-3">
                                                <input
                                                    className="custom-control-input"
                                                    id="customCheck1"
                                                    type="checkbox"
                                                    onChange={(e) => {
                                                        toggleResetPassword()
                                                    }}
                                                />
                                                <label className="custom-control-label" htmlFor="customCheck1">
                                                    Reset Password
                                                </label>
                                            </div>
                                            {resetPassword &&
                                            <RequestOtp isSignin={true} errors={errors}
                                                        email={form.username}
                                                        mobileNumber={null}
                                                        setField={setField}/>}
                                            <div className="text-center">
                                                <Button
                                                    className="my-4"
                                                    color="green"
                                                    type="submit"
                                                    onClick={doLogin}
                                                >
                                                    {resetPassword ? 'Reset Password' : 'Sign in'}
                                                </Button>
                                            </div>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </div>
                        </LoadingOverlay> </Modal>
                </Col>
            </Row>

        </>
    );

}

export default Signin;