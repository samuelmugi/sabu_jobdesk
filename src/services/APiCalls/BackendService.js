import axios from 'axios';
import {toast, Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import REST_APIS from './config/apiUrl'
import STORAGE from './config/storage'


toast.configure();


const headersConfig = {
     'Accept': 'application/json'
};
const baseURL = REST_APIS.BASE_URL;
const BASE_SETTINGS_URL = REST_APIS.BASE_SETTINGS_URL;
const UNAUTHORIZED = 401;

// Add a request interceptor
axios.interceptors.request.use((config) => {
    const jwtToken = STORAGE.fetchAuthToken();
    // const token = 'Bearer ' + jwtToken;
    const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYnVrYXNvemlAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfQVBQTElDQU5UIn1dLCJpYXQiOjE2MjM4NjkxMjYsImV4cCI6MTYyNTAxMTIwMH0.d12VQdS7L_J4tPH_kYSxvtxlRfluKqiYhAuJhstflOE';
    headersConfig.Authorization = token;
    config.headers = headersConfig;

    return config;
});

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === UNAUTHORIZED) {
            STORAGE.destroyAuthTOken();
            this.notifyError('PLease login to access this resource');
        } else {
            return Promise.reject(error);
        }
    }
);

class BackendService {


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

    notifySuccess(value) {
        toast.success(value, {
            position: "top-right",
            autoClose: 2500,
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
            autoClose: 2500,
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
}


export default new BackendService();
