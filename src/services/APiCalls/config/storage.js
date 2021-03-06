const LS_KEY = {
    auth_token: "jwtToken",
    user_det: "profile"
};

class Storage {
    setAuthTOken = (authToken) => {
        // this.destroyAuthTOken();
        localStorage.setItem(
            LS_KEY.auth_token,
            JSON.stringify({
                [LS_KEY.auth_token]: authToken
            })
        );
        this.setJobsActiveTab(1);

    };


    fetchAuthToken = () => {
        const data = localStorage.getItem(LS_KEY.auth_token);
        if (data) {
            try {
                const decoded = JSON.parse(data);
                return decoded[LS_KEY.auth_token];
            } catch (err) {
                console.log(err);
                return {[LS_KEY.auth_token]: 'has no auth'};
            }
        }

    };

    setUserDetials = (userDetials) => {
        localStorage.removeItem(LS_KEY.user_det);
        localStorage.setItem(
            LS_KEY.user_det,
            JSON.stringify({
                [LS_KEY.user_det]: userDetials
            })
        );
    }
    getCurrentUser = () => {
        const data = localStorage.getItem(LS_KEY.user_det);
        if (data) {
            try {
                const decoded = JSON.parse(data);
                return decoded[LS_KEY.user_det];
            } catch (err) {
                console.log(err);
                const user = {jobApplicantProfileViewModel: 'NA'}
                return user;
            }
        } else {
            const user = {jobApplicantProfileViewModel: 'NA'}
            return user;

        }
    };

    destroyAuthTOken = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    navigateToApplicationsPage = (index) => {
        this.setJobsActiveTab(index);
        window.location.href = '/jobs-page';
    };
    setJobsActiveTab = (index) => {
        localStorage.setItem('activeTab', index+'');
    }
    getActiveTab = () => {
        try {
            const activeTab = localStorage.getItem('activeTab');
            return activeTab === null ? 1 : +activeTab;
        } catch (e) {
            return 1;
        }
    }

}

export default new Storage();
