import axios from 'axios';
import REST_APIS from 'services/APiCalls/config/apiUrl';
import STORAGE from 'services/APiCalls/config/storage';

const reqheaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': "GET, PUT, POST, DELETE, HEAD, OPTIONS",
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
