import CardsFooter from 'components/Footers/CardsFooter.js';
// core components
import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import React from 'react';
// reactstrap components
import {Card, CardBody, Col, Container, Row} from 'reactstrap';
import STORAGE from "services/APiCalls/config/storage";
import {Label} from "semantic-ui-react";
import ViewProfileStepper from "views/candidate/profile/viewprofilewizard";

 const style = {width: "80rem"};

class CandidateMain extends React.Component {
    state = {};

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;

    }


    render() {
        return (
            <>
                <DemoNavbar/>
                <main ref="main">
                    <div className=" component-about position-relative">
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
                                <Col>
                                    <Label as='a' color='red'>
                                        Preview Your Profile
                                    </Label>
                                    <Row className="row-grid justify-content-center">
                                        <Col>
                                            <Card style={style}>
                                                <CardBody>
                                                    <ViewProfileStepper/>
                                                </CardBody>
                                            </Card>
                                        </Col>

                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </section>

                </main>
                <CardsFooter/>
            </>
        );
    }
}

export default CandidateMain;
