module.exports = Object.freeze({
    BASE_URL: 'http://3.16.69.34:8080/',
    // BASE_URL: 'http://localhost:8989/',
    BASE_SETTINGS_URL: 'http://3.16.69.34:8083/',
    SIGN_UP: 'api/auth/signup',
    SIGN_IN: 'api/auth/signin',
    GET_OTP_SIGNUP:'settings/generate-otp/',
    GET_OTP_SIGNIN:'settings/otp/',
    RESET_PASSWORD: 'api/auth/reset-password',
    //USER DETAILS
    GET_USER_DETAILS: 'api/auth/user-details/',
    UPDATE_USER_DETAILS: 'profile/PROFILEID/personal-info',
    //CV
    UPLOAD_CV: 'profile/PROFILEID/upload-cv',
    DOWNLOAD_CV: 'profile/PROFILEID/download-cv2',
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
    ADD_SKILL: 'profile/PROFILEID/skills',
    GET_SKILL: 'profile/PROFILEID/skills',
    UPDATE_SKILL: 'profile/PROFILEID/skills',
    DELETE_SKILL: 'profile/PROFILEID/skills/',
    //DEFAULT CONFIGS
    GET_ALL_RELIGIONS: 'settings/religions',
    GET_ALL_TRIBES: 'settings/tribes',
    GET_ALL_MARITAL_STATUS: 'settings/marital-statuses',
    GET_ALL_SALUTIONS: 'settings/salutations',
    GET_ALL_COUNTIES: 'api/v1/counties/',
    GET_ALL_SUB_COUNTIES: '/sub-counties/',
    GET_ALL_WARDS: '/wards',
    //JOBS
    GET_ALL_JOB_VACANCIES:'job-openings',
    GET_ALL_JOB_NOT_APPLIED:'job-openings/loggedIn/',
    APPLY_JOB_VACANCY:'job-applications',
    MY_JOB_APPLICATIONS:'job-applications/',
    //COVER LETTER
    COVER_LETTER:'profile/PROFILEID/cover-letter',
    // CONTACT US
    CREATE_TICKET:'support-tickets',
    //    NOTICES
    GET_ALL_NOTICES:'settings/notices',
    DOWNLOAD_SHORTLIST:'settings/notices/download/'

});