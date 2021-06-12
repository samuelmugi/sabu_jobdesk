import CardsFooter from 'components/Footers/CardsFooter.js';
// core components
import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import React from 'react';
// reactstrap components
import { Badge, Card, CardBody, Col, Container, Row } from 'reactstrap';
import CandidateNotification from './Notifications';
import MyProfile from './Profile';
import Uploadcv from './Uploadcv';

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
          <section className="section section-lg pt-lg-0 mt--200">
            <Container>
              <Row className="justify-content-center">
                <Col lg="12">
                  <Row className="row-grid">
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                            <i className="ni ni-single-02"/>
                          </div>
                          <h6 className="text-primary text-uppercase">
                            My Profile
                          </h6>
                          <MyProfile/>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                            <i className="ni ni-single-copy-04"/>
                          </div>
                          <h6 className="text-success text-uppercase">
                            Upload CV
                          </h6>
                          <Uploadcv/>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                            <i className="ni ni-notification-70"/>
                          </div>
                          <h6 className="text-warning text-uppercase">
                            My Updates
                          </h6>

                          <CandidateNotification/>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>

          <section className="section pb-0 bg-gradient-warning">
            <Container>

              <Row className="row-grid align-items-center">

                <Col className="order-lg-1" lg="6">
                  <div className="d-flex px-3">
                    <div>
                      <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                        <i className="ni ni-building text-primary"/>
                      </div>
                    </div>
                    <div className="pl-4">
                      <h4 className="display-3 text-white">Best Matching Jobs</h4>
                    </div>
                  </div>
                  <Card className="shadow shadow-lg--hover mt-5">
                    <CardBody>
                      <div className="d-flex px-3">
                        <div>
                          <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                            <i className="ni ni-satisfied"/>
                          </div>
                        </div>
                        <div className="pl-4">
                          <h5 className="title text-success">
                            Software Engineer
                          </h5>
                          <div>
                            <Badge color="primary" pill className="mr-1">
                              Nairobi,Kenya
                            </Badge>
                            <Badge color="primary" pill className="mr-1">
                              Full-time
                            </Badge>

                          </div>
                          <a
                            className="text-success"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Learn more
                          </a>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  <Card className="shadow shadow-lg--hover mt-5">
                    <CardBody>
                      <div className="d-flex px-3">
                        <div>
                          <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                            <i className="ni ni-like-2"/>
                          </div>
                        </div>
                        <div className="pl-4">
                          <h5 className="title text-warning">
                            Quality Assurance Analyst
                          </h5>
                          <Badge color="primary" pill className="mr-1">
                            Nairobi,Kenya
                          </Badge>
                          <Badge color="primary" pill className="mr-1">
                            Full-time
                          </Badge>
                          <a
                            className="text-warning"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Learn more
                          </a>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                </Col>
                <Col className="order-lg-1" lg="6">

                  <Card className="shadow shadow-lg--hover mt-5">
                    <CardBody>
                      <div className="d-flex px-3">
                        <div>
                          <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                            <i className="ni ni-satisfied"/>
                          </div>
                        </div>
                        <div className="pl-4">
                          <h5 className="title text-success">
                            Full Stack Developer
                          </h5>
                          <Badge color="primary" pill className="mr-1">
                            Nairobi,Kenya
                          </Badge>
                          <Badge color="primary" pill className="mr-1">
                            Full-time
                          </Badge>
                          <a
                            className="text-success"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Learn more
                          </a>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  <Card className="shadow shadow-lg--hover mt-5">
                    <CardBody>
                      <div className="d-flex px-3">
                        <div>
                          <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                            <i className="ni ni-active-40"/>
                          </div>
                        </div>
                        <div className="pl-4">
                          <h5 className="title text-warning">
                            Java Developer
                          </h5>
                          <Badge color="primary" pill className="mr-1">
                            Nairobi,Kenya
                          </Badge>
                          <Badge color="primary" pill className="mr-1">
                            Full-time
                          </Badge>
                          <a
                            className="text-warning"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Learn more
                          </a>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                </Col>
              </Row>
            </Container>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew zindex-100">
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

        </main>
        <CardsFooter/>
      </>
    );
  }
}

export default CandidateMain;
