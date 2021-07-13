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
     headersConfig.Authorization = token;
    config.headers = headersConfig;

    return config;
});
//
// axios.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === UNAUTHORIZED) {
//             toast.error('PLease login to access this resource', {
//                 position: "top-right",
//                 autoClose: 2500,
//                 transition: Zoom, hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//             });
//
//             // STORAGE.destroyAuthTOken();
//
//         } else {
//             return Promise.reject(error);
//         }
//     }
// );


class BackendService {

    async refershUserDetails(isJobApplication) {
        const user = STORAGE.getCurrentUser();
        if (user !== 'NA') {
            const url = REST_APIS.GET_USER_DETAILS + user?.email;
            this.getRequest(url).then(response => {
                if (response?.status == '200') {
                    STORAGE.setUserDetials(response.data);
                    if (!isJobApplication) {
                        // window.location.reload();
                    }
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

    async DwonloadRequest(url) {
        const requestUrl = baseURL + url;
        return axios({
            url: requestUrl,
            method: 'GET',
            responseType: 'blob',
        });
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
                religions: religions.data.map((val,index) => ({key: val+index, text: val, value: val})),
                tribes: tribes.data.map((val,index) => ({key: val+index, text: val, value: val})),
                maritals: maritals.data.map((val,index) => ({key: val+index, text: val, value: val})),
                salutations: salutations.data.map((val,index) => ({key: val+index, text: val, value: val})),
                homeCounties: counties.data.map(val => ({key: val.countyCode, text: val.name, value: JSON.stringify(val)})),
                residentCounties: counties.data.map(val => ({key: val.id+'residentcounty', text: val.name, value: JSON.stringify(val)})),
                homeSubCounties: [{key: 'homesub', text: '-', value: '-'}],
                homeWards: [{key: 'homeward', text: '-', value: '-'}],
                residentSubCounties: [{key: 'residentsub', text: '-', value: '-'}],
                residentWards: [{key: 'residentward', text: '-', value: '-'}],
            }
        ;
        return settings
    }

    async getSubCounty(county) {
        let requestSubCounties = await axios.get(BASE_SETTINGS_URL + REST_APIS.GET_ALL_COUNTIES + county.id + REST_APIS.GET_ALL_SUB_COUNTIES);
        return requestSubCounties.data.map(val => ({key: val.code, text: val.name, value: JSON.stringify(val)}))
    }

    async getWards(county, subCounty) {
        let requestWards = await axios.get(BASE_SETTINGS_URL + REST_APIS.GET_ALL_COUNTIES +
            county.id + REST_APIS.GET_ALL_SUB_COUNTIES + subCounty.id + REST_APIS.GET_ALL_WARDS);
        return requestWards.data.map(val => ({key: val.id, text: val.wardName, value: JSON.stringify(val)}))
    }

    async notifySuccess(value) {
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
