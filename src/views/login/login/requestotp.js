import React from 'react';
import useState from 'react-usestateref';
// reactstrap components
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from "react-spinners/PropagateLoader";
import BackendService from "services/APiCalls/BackendService";
import 'react-toastify/dist/ReactToastify.css';
import REST_APIS from 'services/APiCalls/config/apiUrl'
import {Button} from "semantic-ui-react";
import {FormFeedback, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";

const color = "#80e70b";
;
const RequestOtp = (props) => {
    const [loading, setLoading, loadingRef] = useState(false);

    const setField = (field, value) => {
        props.setField(field, value);
    };

    const fetchOtp = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (!props.mobileNumber && !props.isSignin) {
            setLoading(false);
            BackendService.notifyError('Please provide mobile number first to get O.T.P')
        } else if (!props.email && props.isSignin) {
            setLoading(false);
            BackendService.notifyError('Please provide username first to get O.T.P')
        } else {
            const url = props.isSignin ? REST_APIS.GET_OTP_SIGNIN + props.email : REST_APIS.GET_OTP_SIGNUP + props.mobileNumber;
            BackendService.getRequest(url)
                .then((response) => {

                        if (response.status === 200) {
                            BackendService.notifySuccess('O.T.P sent to your registered mobile number.');

                        } else {
                            BackendService.notifyError('Please contact support for help!');

                        }
                        setLoading(false);

                    },
                    (error) => {
                        setLoading(false);
                        BackendService.notifyError('Please contact support for help!');
                        setLoading(false);
                    }
                );
        }
    };

    return (
        <LoadingOverlay
            active={loadingRef.current}
            spinner={<ClipLoader color={color} loading={loadingRef.current}/>}
        >

            <FormGroup>
                <InputGroup className="input-group-alternative">

                    <InputGroupAddon addonType="prepend">
                        <Button color='blue' onClick={fetchOtp}>Request O.T.P</Button>
                    </InputGroupAddon>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i
                                className="fa fa-eye"/>
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="enter otp sent to mobile number"
                           type="text"
                           onChange={(e) => setField('oneTimePin', e.target.value)}
                           invalid={!!props.errors.oneTimePin}/>
                    <FormFeedback>{props.errors.oneTimePin}</FormFeedback>
                </InputGroup>
            </FormGroup>


        </LoadingOverlay>

    );

}

export default RequestOtp;