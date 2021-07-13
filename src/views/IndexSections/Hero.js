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
import React from 'react';
import {Link} from 'react-router-dom';
// reactstrap components
import {CardBody, Col, Container, Row} from 'reactstrap';
import Signin from 'views/login/login/signin.js';
import Signup from 'views/login/login/SIgnup.js';
import {Button, Card, List} from "semantic-ui-react";
import DemoNavbar from "components/Navbars/DemoNavbar";
import STORAGE from "services/APiCalls/config/storage";

const style = {width: "350rem"};
const styleImg = {width: "100px"};
const user = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;

class Hero extends React.Component {
    render() {
        return (
            <>
                <DemoNavbar/>
                <main ref="main">
                    <div className="position-relative">
                        {/* shape Hero */}
                        <section className="section section-lg section-shaped pb-250">
                            <div className="shape shape-style-1 shape-default">
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                            </div>
                            <Container className="py-lg-md d-flex">

                            </Container>
                            {/* SVG separator */}
                            <div className="separator separator-bottom separator-skew">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    preserveAspectRatio="none"
                                    version="1.1"
                                    viewBox="0 0 2560 100"
                                    x="0"
                                    y="0"
                                >
                                    <polygon
                                        className="fill-white"
                                        points="2560 0 2560 100 0 100"
                                    />
                                </svg>
                            </div>
                        </section>
                        {/* 1st Hero Variation */}
                    </div>
                    <section className="section pt-lg-0 mt--200">
                        <Container>
                            <Row className="justify-content-center">
                                <Col lg="12">
                                    <Row className="row-grid justify-content-center">
                                        <Col lg="12">
                                            <Card style={style} className="card-lift--hover shadow border-0">
                                                <CardBody className="py-5">
                                                    <Row>
                                                        <Col md="2">
                                                            <img
                                                                alt="..."
                                                                className=" img-fluid rounded-circle shadow"
                                                                src={require("assets/img/ncc_logo.png")}
                                                                style={styleImg}
                                                            ></img>
                                                        </Col>
                                                        <Col>
                                                            <Row>
                                                                <Col>
                                                                    <h6 className="text-primary text-uppercase">
                                                                        VACANCIES IN NAIROBI CITY COUNTY
                                                                    </h6>
                                                                    <p>The Nairobi City County Public Service Board (NCPSB) invites applications
                                                                        from suitably qualified candidates to fill in various vacancies.
                                                                    </p>
                                                                    <p className="h6">IMPORTANT INFORMATION TO
                                                                        PROSPECTIVE APPLICANTS
                                                                    </p>
                                                                    <List as='ol'>

                                                                        <List.Item as='li'> Applications can ONLY be
                                                                            submitted ONLINE on or before the stipulated
                                                                            deadline.</List.Item>
                                                                        <List.Item as='li'> Applicants should be Kenyan
                                                                            Citizens.</List.Item>
                                                                        <List.Item as='li'> Applicants should meet
                                                                            requirements of Chapter 6 of the
                                                                            Constitution of Kenya and will be required
                                                                            to have clearance certificates from EACC,
                                                                            KRA, CRB and a Certificate of Good Conduct
                                                                            from the Kenya Police Service</List.Item>
                                                                        <List.Item as='li'> Only shortlisted candidates
                                                                            will be contacted.</List.Item>
                                                                        <List.Item as='li'> Applicant must have no prior
                                                                            criminal conviction or pending criminal
                                                                            action.</List.Item>
                                                                        <List.Item as='li'> Applicants must be
                                                                            physically and medically fit.</List.Item>

                                                                    </List>
                                                                    <p className="h6">Nairobi City County is an equal
                                                                        opportunity employer. Qualified women and
                                                                        persons living with disabilities are encouraged
                                                                        to apply.
                                                                    </p>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Col>

                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                    <section className="section pb-0 bg-gradient-default">
                        <Container>

                            <div className="col px-0">
                                <Row className="align-items-center justify-content-center">
                                    <Col className="text-center" lg="6">
                                        <h3 className="h4 text-success font-weight-bold mb-4">
                                            Let’s Get Started
                                        </h3>
                                        <p className="lead text-white">
                                            What would you like to do?
                                        </p>
                                        <div className="btn-wrapper mt-5">
                                            <Row>
                                                <Col> {user === 'NA' && <Signup/>}</Col>
                                                <Col>
                                                    <Button
                                                    className="btn-neutral btn-icon"
                                                    color="grey"
                                                    to="/jobs-page" tag={Link}
                                                >
                      <span className="btn-inner--icon">
                        <i className="fa fa-binoculars mr-2"/>
                      </span>
                                                    <span className="nav-link-inner--text ml-1">
                        JOBS
                      </span>
                                                </Button></Col>
                                                <Col> {user === 'NA' && <Signin/>}</Col>
                                            </Row>
                                           

                                        </div>
                                        <div className="mt-5">
                                            <small className="text-white font-weight-bold mb-0 mr-2">
                                                Get the Right Job Vacancies & Careers.
                                            </small>

                                        </div>
                                    </Col>
                                </Row>
                            </div>

                        </Container>

                    </section>
                </main>

            </>
        );
    }
}

export default Hero;
