import axios from 'axios';
import REST_APIS from './config/apiUrl'
import STORAGE from './config/storage'

const reqheaders = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    'xsrfHeaderName': 'X-XSRF-TOKEN',
    'xsrfCookieName': 'XSRF-TOKEN'
};

class AuthenticationService {

    signin = async (username, password) => {
        const baseURL = REST_APIS.BASE_URL;
        const singinURL = REST_APIS.SIGN_IN;
        const loginRequest = {username: username, password: password};
        return axios
            .post(baseURL + singinURL, loginRequest, {headers: reqheaders})
            .then((response) => {
                if (response.status === 200) {
                    STORAGE.setAuthTOken(response.data?.jwtToken);
                    STORAGE.setUserDetials(response.data?.userDetails);

                }
                return response;
            });
    };

    SignOut = () => {
        STORAGE.destroyAuthTOken();
    };


}

export default new AuthenticationService();
