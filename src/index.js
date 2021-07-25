import 'assets/scss/argon-design-system-react.scss?v1.1.0';
import 'assets/vendor/font-awesome/css/font-awesome.min.css';
import 'assets/vendor/nucleo/css/nucleo.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import CandidateMain from 'views/candidate/candidate/candidateMain.js';
import Faq from 'views/faq/faq/faq';
import Index from 'views/Index.js';
import Jobs from 'views/jobs/jobs/jobsmain';
import About from "views/about/about";
import Notices from "views/notices/notices";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact render={props => <Index {...props} />}/>
            <Route
                path="/candidate-page"
                exact
                render={props => <CandidateMain {...props} />}
            />
            <Route
                path="/jobs-page"
                exact
                render={props => <Jobs {...props} />}
            />
            <Route
                path="/notices-page"
                exact
                render={props => <Notices isNotices={true} {...props} />}
            />
            <Route
                path="/shortlist-page"
                exact
                render={props => <Notices  isNotices={false}  {...props} />}
            />
            <Route
                path="/about-page"
                exact
                render={props => <About {...props} />}
            />
            <Route
                path="/faq-page"
                exact
                render={props => <Faq {...props} />}
            />
            <Redirect to="/"/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
