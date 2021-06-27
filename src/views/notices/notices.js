import React from 'react';
import DemoNavbar from "components/Navbars/DemoNavbar";
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import {Label, List} from "semantic-ui-react";
import CardsFooter from "components/Footers/CardsFooter";

const style = {width: "80rem"};
const styleImg = {width: "100px"};

class Notices extends React.Component {
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
                                <Col>
                                    <Row className="row-grid justify-content-center">
                                        <Col>
                                            <Card style={style}>
                                                <CardBody>
                                                    <Row>
                                                        <Col md="1">
                                                            <img
                                                                alt="..."
                                                                className=" img-fluid rounded-circle shadow"
                                                                src={require("assets/img/ncc_logo.png")}
                                                                style={styleImg}
                                                            ></img>
                                                        </Col>
                                                        <Col>
                                                            <List as='ol' divided selection>
                                                                <List.Item  >
                                                                    <List.Content  as='li' floated='left'>
                                                                        CANCELLED ECDE INTERVIEWS
                                                                    </List.Content>
                                                                    <List.Content floated='right'>
                                                                        <Label as='a' color='teal' tag='right'>
                                                                            Download DOcument
                                                                        </Label>
                                                                    </List.Content>

                                                                </List.Item>
                                                                <List.Item>
                                                                    <List.Content  as='li'  floated='left'> INTERVIEW SCHEDULE FOR SHORTLISTED CANDIDATES FOR
                                                                    THE POST OF ECDE
                                                                    </List.Content>
                                                                    <List.Content floated='right'>
                                                                        <Label as='a' color='teal' tag='right'>
                                                                            Download DOcument
                                                                        </Label>
                                                                    </List.Content>

                                                                </List.Item>
                                                                <List.Item>
                                                                    <List.Content  as='li'  floated='left'>
                                                                        ECDE INTERVIEW VENUE NOTICE
                                                                    </List.Content>
                                                                    <List.Content floated='right'>
                                                                        <Label as='a' color='teal' tag='right'>
                                                                            Download DOcument
                                                                        </Label>
                                                                    </List.Content>

                                                                </List.Item>
                                                                <List.Item>
                                                                    <List.Content   as='li' floated='left'>
                                                                        NOTICE TO ALL APPLICANTS AND THE GENERAL PUBLIC
                                                                    </List.Content>
                                                                    <List.Content floated='right'>
                                                                        <Label as='a' color='teal' tag='right'>
                                                                            Download DOcument
                                                                        </Label>
                                                                    </List.Content>
                                                                </List.Item>

                                                            </List>
                                                            <p></p>
                                                        </Col>
                                                        <Col md="1">

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

                </main>
                <CardsFooter/>

            </>
        )

    }
}

export default Notices;
