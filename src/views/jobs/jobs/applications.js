import React from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { Divider } from 'semantic-ui-react'

class JobApplications extends React.Component {


  render() {
    return (
      <>

        <Row>
          <Col>
            <Card className="bg-secondary shadow">
              <div>
                <Row>
                  <Col sm>
                    <span>search for jobs</span>
                  </Col>
                  <Col sm>
                    <span>country or town</span>
                  </Col>
                  <Col sm>
                    <span>Show jobs</span>
                  </Col>
                  <Col sm>
                    <span>clear filters</span>
                  </Col>
                </Row>
                <Divider />
                <Row>
                  <Col sm>
                    <span>published</span>
                  </Col>
                  <Col sm>
                    <span>Profession</span>
                  </Col>
                  <Col sm>
                    <span>Industry</span>
                  </Col>
                  <Col sm>
                    <span>seniority</span>
                  </Col> <Col sm>
                  <span></span>
                </Col>
                </Row>
                <Divider />
              </div>

              <CardBody className="px-lg-5 py-lg-5">
                <Row>
                  <Col>
                    <Card><span>1 of 3</span></Card>
                  </Col>
                  <Col sm="8">
                    <Card><span>2 of 3 (wider)</span></Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </>
    );
  }
}

export default JobApplications;