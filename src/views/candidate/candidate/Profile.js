import React from 'react';
// reactstrap components
import { Button, Card, CardBody, CardHeader, Col, Modal, Row } from 'reactstrap';

class MyProfile extends React.Component {
  state = {
    defaultModal: false
  };
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  render() {
    return (
      <>
        <Row>
          <Col md="4">

            <a
              className="text-warning"
              href="#myprofile"
              onClick={() => this.toggleModal('formModal')}
            >
              Learn more
            </a>
            <Modal
              className="profile-page modal-dialog-centered"
              size="lg"
              isOpen={this.state.formModal}
              toggle={() => this.toggleModal('formModal')}
            >
               <Card className=" card-profile shadow mt--600">
                     <div className="px-4">
                      <Row className="justify-content-center">
                        <Col className="order-lg-2" lg="3">
                          <div className="card-profile-image">
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                              <img
                                alt="..."
                                className="rounded-circle"
                                src={require('assets/img/theme/team-4-800x800.jpg')}
                              />
                            </a>
                          </div>
                        </Col>
                        <Col
                          className="order-lg-3 text-lg-right align-self-lg-center"
                          lg="4"
                        >
                          <div className="card-profile-actions py-4 mt-lg-0">
                            <Button
                              className="mr-4"
                              color="info"
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                              size="sm"
                            >
                              Connect
                            </Button>
                            <Button
                              className="float-right"
                              color="default"
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                              size="sm"
                            >
                              Message
                            </Button>
                          </div>
                        </Col>
                        <Col className="order-lg-1" lg="4">
                          <div className="card-profile-stats d-flex justify-content-center">
                            <div>
                              <span className="heading">22</span>
                              <span className="description">Friends</span>
                            </div>
                            <div>
                              <span className="heading">10</span>
                              <span className="description">Photos</span>
                            </div>
                            <div>
                              <span className="heading">89</span>
                              <span className="description">Comments</span>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <div className="text-center mt-5">
                        <h3>
                          Jessica Jones{' '}
                          <span className="font-weight-light">, 27</span>
                        </h3>
                        <div className="h6 font-weight-300">
                          <i className="ni location_pin mr-2"/>
                          Bucharest, Romania
                        </div>
                        <div className="h6 mt-4">
                          <i className="ni business_briefcase-24 mr-2"/>
                          Solution Manager - Creative Tim Officer
                        </div>
                        <div>
                          <i className="ni education_hat mr-2"/>
                          University of Computer Science
                        </div>
                      </div>
                      <div className="mt-5 py-5 border-top text-center">
                        <Row className="justify-content-center">
                          <Col lg="9">

                            <a href="#pablo" onClick={e => e.preventDefault()}>
                              Show more
                            </a>
                          </Col>
                        </Row>
                      </div>
                    </div>

                </Card>

            </Modal>
          </Col>
        </Row>
      </>
    );
  }
}

export default MyProfile;