import axios from 'axios';
import REST_APIS from 'services/APiCalls/config/apiUrl';
import STORAGE from 'services/APiCalls/config/storage';

class AuthenticationService {

    async   signin  (username, password)  {
        const baseURL = REST_APIS.BASE_URL;
        const singinURL = REST_APIS.SIGN_IN;
        const loginRequest = {username: username, password: password};
        return await axios.post(baseURL + singinURL, loginRequest) ;
    };

    SignOut = () => {
        STORAGE.destroyAuthTOken();
    };


}

export default new AuthenticationService();
