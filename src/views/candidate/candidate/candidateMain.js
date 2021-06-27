import CardsFooter from 'components/Footers/CardsFooter.js';
// core components
import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import React from 'react';
// reactstrap components
import {Card, CardBody, Col, Container, Row} from 'reactstrap';
import MyProfile from '../profile/Profile';
import Uploadcv from './Uploadcv';
import STORAGE from "services/APiCalls/config/storage";
import NotSignedIn from "views/notsignedup/notsigned";

const user = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;

class CandidateMain extends React.Component {
    state = {};

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
        console.log('user==', JSON.stringify(user));

    }

    render() {
        return (
            <>
                <DemoNavbar/>
                <main ref="main">
                    <div className=" component-jobs position-relative">
                        {/* shape Hero */}
                        <section className="section section-lg section-shaped pb-250">
                            <div className="shape shape-style-1 shape-default">

                            </div>
                            <Container>
                                <Row>
                                    <Col>
                                        <Row className="justify-content-center">
                                            <Col >
                                                <Row className="row-grid justify-content-center">
                                                    <Col lg="4">
                                                        <Card className="card-lift--hover shadow border-0">
                                                            <CardBody className="py-5">
                                                                <div
                                                                    className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                                                                    <i className="ni ni-single-02"/>
                                                                </div>
                                                                <h6 className="text-primary text-uppercase">
                                                                    View My Profile
                                                                </h6>
                                                                {
                                                                    user === 'NA' ? <NotSignedIn/>
                                                                        : <MyProfile/>
                                                                }

                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                    <Col lg="4">
                                                        <Card className="card-lift--hover shadow border-0">
                                                            <CardBody className="py-5">
                                                                <div
                                                                    className="icon icon-shape icon-shape-success rounded-circle mb-4">
                                                                    <i className="ni ni-single-copy-04"/>
                                                                </div>
                                                                <h6 className="text-success text-uppercase">
                                                                    Create Profile
                                                                </h6>
                                                                {
                                                                    user === 'NA' ? <NotSignedIn/>
                                                                        : <Uploadcv/>
                                                                }

                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>

                                    </Col>
                                </Row>
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


                </main>
                <CardsFooter/>
            </>
        );
    }
}

export default CandidateMain;
