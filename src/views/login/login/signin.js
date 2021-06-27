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
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from "react-spinners/PropagateLoader";
import AuthenticationService from 'services/APiCalls/AuthenticationService';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackendService from 'services/APiCalls/BackendService';

toast.configure();
const color = "#80e70b";

const Signin = () => {
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
    const doLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        // get our new errors
        const newErrors = findFormErrors();
        // Conditional logic:
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            setErrors(newErrors);
        } else {
            AuthenticationService.signin(form.username, form.password)
                .then((response) => {
                        if (response.status === 200) {
                            BackendService.notifySuccess('Logged in Successfully.');

                        }
                        setLoading(false);
                        window.location.reload();
                    },
                    (error) => {
                        console.error(error);
                        if (error.toString().includes('401')) {
                            BackendService.notifyError('oops! Please confirm your username and password')

                            setErrors({
                                logError:
                                    'oops! Please confirm your username and password'
                            });
                        } else {
                            BackendService.notifyError('Login fail');
                            setErrors({
                                logError:
                                    'Login fail: error = { ' + error.toString() + ' }'
                            });
                        }
                        setLoading(false);

                    }
                );
        }
    };

    const findFormErrors = () => {
        const {username, password} = form;
        const newErrors = {};
        // username errors
        if (!username || username === '')
            newErrors.username = 'username cannot be blank!';
        // food errors
        if (!password || password === '')
            newErrors.password = 'password cannot be blank!';
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
                        <i className="fa fa-cloud-download mr-2">
                         &nbsp;SIGN_IN </i></span>
                    </a>
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
                                            <small>Sign in with</small>
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
                                        <div className="btn-wrapper text-center">
                                            <Button
                                                className="btn-neutral btn-icon"
                                                color="default"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                            >
                        <span className="btn-inner--icon">
                          <img
                              alt="..."
                              src={require('assets/img/icons/common/github.svg')}
                          />
                        </span>
                                                <span className="btn-inner--text">Github</span>
                                            </Button>
                                            <Button
                                                className="btn-neutral btn-icon"
                                                color="default"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                            >
                        <span className="btn-inner--icon">
                          <img
                              alt="..."
                              src={require('assets/img/icons/common/google.svg')}
                          />
                        </span>
                                                <span className="btn-inner--text">Google</span>
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="px-lg-5 py-lg-5">
                                        <div className="text-center text-muted mb-4">
                                            <small>Or sign in with credentials</small>
                                        </div>
                                        <Form role="form">
                                            <FormGroup className="mb-3">
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-email-83"/>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input placeholder="Email" type="email"
                                                           onChange={(e) => setField('username', e.target.value)}
                                                           invalid={!!errors.username}/>
                                                    <FormFeedback>{errors.username}</FormFeedback>

                                                </InputGroup>
                                            </FormGroup>
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
                                            <div className="custom-control custom-control-alternative custom-checkbox">
                                                <input
                                                    className="custom-control-input"
                                                    id=" customCheckLogin"
                                                    type="checkbox"
                                                />
                                                <label
                                                    className="custom-control-label"
                                                    htmlFor=" customCheckLogin"
                                                >
                                                    <span className="text-muted">Remember me</span>
                                                </label>
                                            </div>
                                            <div className="text-center">
                                                <Button
                                                    className="my-4"
                                                    color="primary"
                                                    type="submit"
                                                    onClick={doLogin}
                                                >
                                                    Sign in
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