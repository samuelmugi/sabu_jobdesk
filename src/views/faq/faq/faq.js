import React, {Component} from 'react';
import './faq.scss';
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar";
import CardsFooter from "components/Footers/CardsFooter";
import FaqAccordion from "views/faq/faq/faqaccordion";

const style = {width: "80rem"};


export default class faq extends Component {
    state = {};

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;

    }

    render() {
        return <>
            <DemoNavbar/>
            <main ref="main">
                <div className="component-faq position-relative">
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
                                <Row className="row-grid justify-content-center">
                                    <Col>
                                        <Card style={style} className="card-lift--hover shadow border-0">
                                            <CardBody className="py-5">
                                                <FaqAccordion/>
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

        </>;
    }
}