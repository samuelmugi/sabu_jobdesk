import CardsFooter from 'components/Footers/CardsFooter.js';
// core components
import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import React from 'react';
// reactstrap components
import { Badge, Card, CardBody, Col, Container, Row } from 'reactstrap';
import CandidateNotification from './Notifications';
import MyProfile from '../profile/Profile';
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
                  <Row className="row-grid justify-content-center">
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                            <i className="ni ni-single-02"/>
                          </div>
                          <h6 className="text-primary text-uppercase">
                           View My Profile
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
                            Create Profile
                          </h6>
                          <Uploadcv/>
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
