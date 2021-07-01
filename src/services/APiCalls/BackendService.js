import axios from 'axios';
import {toast, Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import REST_APIS from 'services/APiCalls/config/apiUrl'
import STORAGE from 'services/APiCalls/config/storage'


toast.configure();


const headersConfig = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': "GET, PUT, POST, DELETE, HEAD, OPTIONS",
    'Accept': 'application/json',
    'xsrfHeaderName': 'X-XSRF-TOKEN',
    'xsrfCookieName': 'XSRF-TOKEN'
};
const baseURL = REST_APIS.BASE_URL;
const BASE_SETTINGS_URL = REST_APIS.BASE_SETTINGS_URL;
const UNAUTHORIZED = 401;
const user = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;

// Add a request interceptor
axios.interceptors.request.use((config) => {
    const jwtToken = STORAGE.fetchAuthToken();
    const token = 'Bearer ' + jwtToken;
    // const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaW5kYUBnbWFpbC5jb20iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiYXBwbGljYW50OnJlYWQifSx7ImF1dGhvcml0eSI6ImpvYjpyZWFkIn0seyJhdXRob3JpdHkiOiJqb2I6d3JpdGUifSx7ImF1dGhvcml0eSI6ImFwcGxpY2FudDp3cml0ZSJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwiaWF0IjoxNjI0NjMxOTI0LCJleHAiOjE2MjU3ODg4MDB9.Tsbu5U7R6JFIGNQbz7M4aPw03tVQkZDVoq-qG1W5SHE';
    headersConfig.Authorization = token;
    config.headers = headersConfig;

    return config;
});

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === UNAUTHORIZED) {
            STORAGE.destroyAuthTOken();
            toast.error('PLease login to access this resource', {
                position: "top-right",
                autoClose: 2500,
                transition: Zoom, hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            window.location.href = '/';
            STORAGE.destroyAuthTOken();

        } else {
            return Promise.reject(error);
        }
    }
);


class BackendService {

    async refershUserDetails() {
        const user = STORAGE.getCurrentUser();
        console.log('refershUserDetails')
        if (user !== 'NA') {
            const url = REST_APIS.GET_USER_DETAILS + user?.email;
            this.getRequest(url).then(response => {
                if (response?.status == '200') {
                    STORAGE.setUserDetials(response.data);
                    window.location.reload();

                }
            })
        } else {
            STORAGE.destroyAuthTOken();
        }
    }

    async getPaginatedRequest(url, page, size, search) {
        const requestUrl =
            baseURL +
            url +
            '?page=' +
            page +
            '&size=' +
            size +
            '&searchParams=' +
            search;
        return await axios.get(requestUrl);
    }

    async getRequest(url) {
        const requestUrl = baseURL + url;
        return await axios.get(requestUrl);
    }

    async postRequest(url, payload) {
         const requestUrl = baseURL + url;
        return await axios.post(requestUrl, payload);
    }

    async deleteRequest(url) {
         const requestUrl = baseURL + url;
        return await axios.delete(requestUrl);
    }

    async putRequest(url, payload) {
         const requestUrl = baseURL + url;
        return await axios.put(requestUrl, payload);
    }

    async getAllSetings() {
        let requestReligion = axios.get(baseURL + REST_APIS.GET_ALL_RELIGIONS);
        let requestTribe = axios.get(baseURL + REST_APIS.GET_ALL_TRIBES);
        let requestMarital = axios.get(baseURL + REST_APIS.GET_ALL_MARITAL_STATUS);
        let requestSalutation = axios.get(baseURL + REST_APIS.GET_ALL_SALUTIONS);
        let requestCounties = axios.get(BASE_SETTINGS_URL + REST_APIS.GET_ALL_COUNTIES);
        let [religions, tribes, maritals, salutations, counties] = await axios
            .all([requestReligion, requestTribe, requestMarital, requestSalutation, requestCounties]);

        const settings = {
                religions: religions.data.map(val => ({key: val, text: val, value: val})),
                tribes: tribes.data.map(val => ({key: val, text: val, value: val})),
                maritals: maritals.data.map(val => ({key: val, text: val, value: val})),
                salutations: salutations.data.map(val => ({key: val, text: val, value: val})),
                homeCounties: counties.data.map(val => ({key: val.countyCode, text: val.name, value: val})),
                residentCounties: counties.data.map(val => ({key: val.id, text: val.name, value: val})),
                homeSubCounties: [{key: 'cou', text: '', value: ''}],
                homeWards: [{key: 'cou', text: '', value: ''}],
                residentSubCounties: [{key: 'cou', text: '', value: ''}],
                residentWards: [{key: 'cou', text: '', value: ''}],
            }
        ;
        return settings
    }

    async getSubCounty(county) {
        let requestSubCounties = await axios.get(BASE_SETTINGS_URL + REST_APIS.GET_ALL_COUNTIES + county.id + REST_APIS.GET_ALL_SUB_COUNTIES);
        return requestSubCounties.data.map(val => ({key: val.code, text: val.name, value: val}))
    }

    async getWards(county, subCounty) {
        let requestWards = await axios.get(BASE_SETTINGS_URL + REST_APIS.GET_ALL_COUNTIES +
            county.id + REST_APIS.GET_ALL_SUB_COUNTIES + subCounty.id + REST_APIS.GET_ALL_WARDS);
        return requestWards.data.map(val => ({key: val.id, text: val.wardName, value: val}))
    }

    async  notifySuccess(value) {
        toast.success(value, {
            position: "top-right",
            autoClose: 4000,
            transition: Zoom, hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    notifyError(value) {
        toast.error(value, {
            position: "top-right",
            autoClose: 4000,
            transition: Zoom, hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    notifyInfo(value) {
        toast.info(value, {
            position: "top-right",
            autoClose: 2500,
            transition: Zoom, hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    upload(file, onUploadProgress) {
        let formData = new FormData();

        const requestUrl = baseURL + REST_APIS.UPLOAD_CV;

        formData.append("image", file);
        formData.append("title", user?.firstName);

        return axios.post(requestUrl.replace('PROFILEID', user?.id), formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }

    getFiles() {
        const requestUrl = baseURL + REST_APIS.DOWNLOAD_CV;

        return axios.get(requestUrl.replace('PROFILEID', user?.id));
    }

}


export default new BackendService();
