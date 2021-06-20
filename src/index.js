/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import 'assets/scss/argon-design-system-react.scss?v1.1.0';
import 'assets/vendor/font-awesome/css/font-awesome.min.css';
import 'assets/vendor/nucleo/css/nucleo.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import CandidateMain from 'views/candidate/candidate/candidateMain.js';
import Faq from 'views/faq/faq/faq';
import Index from 'views/Index.js';
import Jobs from 'views/jobs/jobs/jobsmain';
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={props => <Index {...props} />}/>
      <Route
        path="/candidate-page"
        exact
        render={props => <CandidateMain {...props} />}
      /> <Route
      path="/jobs-page"
      exact
      render={props => <Jobs {...props} />}
    /> <Route
      path="/faq-page"
      exact
      render={props => <Faq {...props} />}
    />
      <Redirect to="/"/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
