module.exports = Object.freeze({
    BASE_URL: 'http://3.128.179.111:8080/',
    BASE_SETTINGS_URL: 'http://3.128.179.111:8083/',
    SIGN_UP: 'signup',
    SIGN_IN: 'login',
    //USER DETAILS
    GET_USER_DETAILS: 'user-details/',
    UPDATE_USER_DETAILS: 'profile/PROFILEID/personal-info',
    //CV
    UPLOAD_CV: 'profile/PROFILEID/upload-cv',
    DOWNLOAD_CV: 'profile/PROFILEID/download-cv',
    //SECONDARY SCHOOL
    ADD_SECONDARY_SCHOOL: 'profile/PROFILEID/academic-details',
    //POST SECONDARY
    ADD_POST_SECONDARY_SCHOOL: 'profile/PROFILEID/academic-qualifications',
    GET_POST_SECONDARY_SCHOOL: 'profile/PROFILEID/academic-qualifications',
    UPDATE_POST_SECONDARY_SCHOOL: 'profile/PROFILEID/academic-qualifications/',
    DELETE_POST_SECONDARY_SCHOOL: 'profile/PROFILEID/academic-qualifications/',
    //WORK EXPERIENCE
    ADD_EXPERIENCE: 'profile/PROFILEID/work-experience',
    GET_EXPERIENCE: 'profile/PROFILEID/work-experience',
    UPDATE_EXPERIENCE: 'profile/PROFILEID/work-experience/',
    DELETE_EXPERIENCE: 'profile/PROFILEID/work-experience/',
    //SKILL
    ADD_SKILL: 'profile/PROFILEID/work-experience',
    GET_SKILL: 'profile/PROFILEID/work-experience',
    UPDATE_SKILL: 'profile/PROFILEID/work-experience/',
    DELETE_SKILL: 'profile/PROFILEID/work-experience/',
    //DEFAULT CONFIGS
    GET_ALL_RELIGIONS: 'settings/religions',
    GET_ALL_TRIBES: 'settings/tribes',
    GET_ALL_MARITAL_STATUS: 'settings/marital-statuses',
    GET_ALL_SALUTIONS: 'settings/salutations',
    GET_ALL_COUNTIES: 'api/v1/counties/',
    GET_ALL_SUB_COUNTIES: '/sub-counties/',
    GET_ALL_WARDS: '/wards',
    //JOBS
    GET_ALL_JOB_VACANCIES:'job-vacancies',
    APPLY_JOB_VACANCY:'job-applications'


});