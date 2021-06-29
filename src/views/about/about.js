import React from 'react';
import './about.scss'
import DemoNavbar from "components/Navbars/DemoNavbar";
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import {Grid, GridRow, Label, List} from "semantic-ui-react";
import CardsFooter from "components/Footers/CardsFooter";

const style = {width: "80rem"};
const styleImg = {width: "100px"};

class About extends React.Component {
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
                        <Container  >
                            <Row className="justify-content-center">
                                <Col>
                                    <Row className="row-grid justify-content-center">
                                        <Col>
                                            <Card style={style} >
                                                <CardBody>
                                                    <Row  >
                                                        <Col md="1">

                                                        </Col>
                                                        <Col  >
                                                            <Grid>
                                                                <Grid.Row>
                                                                    <Grid>
                                                                        <GridRow>
                                                                            <Label
                                                                                className="text-primary text-uppercase"
                                                                                as='a' color='orange' ribbon>
                                                                                Vision
                                                                            </Label>
                                                                        </GridRow>
                                                                        <p> The City of Choice to invest, work and
                                                                            live in.
                                                                        </p>
                                                                    </Grid>
                                                                </Grid.Row>

                                                                <Grid.Row>
                                                                    <Grid>
                                                                        <GridRow>
                                                                            <Label
                                                                                className="text-primary text-uppercase"
                                                                                as='a' color='orange' ribbon>
                                                                                Mission
                                                                            </Label>
                                                                        </GridRow>
                                                                        <p> To provide affordable, accessible and
                                                                            sustainable quality services, enhancing
                                                                            community participation and creating a
                                                                            secure
                                                                            climate for political,social and economic
                                                                            development through the commitment of a
                                                                            motivated and dedicated team.
                                                                        </p>
                                                                    </Grid>
                                                                </Grid.Row>
                                                                <Grid.Row>
                                                                    <Grid>
                                                                        <GridRow>
                                                                            <Label
                                                                                className="text-primary text-uppercase"
                                                                                as='a' color='orange' ribbon>
                                                                                Core Values
                                                                            </Label>
                                                                        </GridRow>
                                                                        <GridRow>
                                                                            <p>
                                                                            <List bulleted horizontal >
                                                                                <List.Item
                                                                                    as='a'> </List.Item>
                                                                                <List.Item
                                                                                    as='a'>Accountability</List.Item>
                                                                                <List.Item
                                                                                    as='a'>transparency</List.Item>
                                                                                <List.Item as='a'>excellence</List.Item>
                                                                                <List.Item
                                                                                    as='a'>accessibility</List.Item>
                                                                                <List.Item as='a'>integrity</List.Item>
                                                                                <List.Item
                                                                                    as='a'>responsiveness</List.Item>
                                                                                <List.Item as='a'>equity</List.Item>
                                                                                <List.Item as='a'>team work</List.Item>
                                                                            </List>
                                                                            </p>
                                                                        </GridRow>
                                                                    </Grid>
                                                                </Grid.Row>

                                                                <Grid.Row>
                                                                    <Grid>
                                                                        <GridRow>
                                                                            <Label
                                                                                className="text-primary text-uppercase"
                                                                                as='a' color='orange' ribbon>
                                                                                Functions of CPSB
                                                                            </Label>
                                                                        </GridRow>
                                                                        <GridRow>
                                                                           <p> As per County Govt Act 2012 Sec 59

                                                                            <List as='ol'>

                                                                                <List.Item as='li'>
                                                                                    Establish and abolish offices in the
                                                                                    county public service.
                                                                                </List.Item>
                                                                                <List.Item as='li'>
                                                                                    Appoint persons to hold and to act
                                                                                    in offices in the county public
                                                                                    service including confirming
                                                                                    appointments.
                                                                                </List.Item>
                                                                                <List.Item as='li'>
                                                                                    Exercise disciplinary control over
                                                                                    staff in the county public service.
                                                                                </List.Item>
                                                                                <List.Item as='li'>
                                                                                    Prepare regular reports for
                                                                                    submission to the county assembly on
                                                                                    the execution of its functions.
                                                                                </List.Item>
                                                                                <List.Item as='li'>
                                                                                    Promote ethical standards in the
                                                                                    0perations of the county public
                                                                                    service.
                                                                                </List.Item>
                                                                                <List.Item as='li'>
                                                                                    Develop a coherent ,intergrated HR
                                                                                    planning and budgeting for personnel
                                                                                    emoluments in the county.
                                                                                </List.Item>
                                                                                <List.Item as='li'>
                                                                                    Advise on the implementation and
                                                                                    monitoring of performance management
                                                                                    system.
                                                                                </List.Item>
                                                                                <List.Item as='li'>
                                                                                    Make recommendations to SRC.
                                                                                </List.Item>

                                                                            </List>
                                                                           </p>
                                                                        </GridRow>
                                                                    </Grid>
                                                                </Grid.Row>


                                                                <Grid.Row>
                                                                    <Grid>
                                                                        <GridRow>
                                                                            <Label
                                                                                className="text-primary text-uppercase"
                                                                                as='a' color='orange' ribbon>
                                                                                Powers of CPSB
                                                                            </Label>
                                                                        </GridRow>
                                                                        <GridRow>
                                                                            <List as='ol'>

                                                                                <List.Item as='li'>
                                                                                    Inform and educate county public
                                                                                    officers and the public about the
                                                                                    values and principles.
                                                                                </List.Item>
                                                                                <List.Item as='li'>
                                                                                    Recommend to the county government
                                                                                    effective measures to promote the
                                                                                    values and principles. </List.Item>
                                                                                <List.Item as='li'>
                                                                                    Assist county government in the
                                                                                    formulation and implementation of
                                                                                    programmes intended to inculcate in
                                                                                    public officers the duty to uphold
                                                                                    the values and principles.
                                                                                </List.Item>
                                                                                <List.Item as='li'>
                                                                                    Advise the county governments on
                                                                                    their obligations under
                                                                                    international treaties and
                                                                                    conventions on good governance in
                                                                                    the county public
                                                                                    service.</List.Item>
                                                                                <List.Item as='li'>
                                                                                    Visit any county public office or
                                                                                    body with a view to assessing and
                                                                                    inspecting the status of compliance
                                                                                    with the values and
                                                                                    principles.</List.Item>
                                                                                <List.Item as='li'>
                                                                                    Visit any county public office or
                                                                                    body with a view to assessing and
                                                                                    inspecting the status of compliance
                                                                                    with the values and principles.
                                                                                </List.Item>
                                                                                <List.Item as='li'>
                                                                                    Investigate, on its own initiative
                                                                                    or upon a complaint made by any
                                                                                    person or group of persons, the
                                                                                    violation of any values and
                                                                                    principles.
                                                                                </List.Item>
                                                                                <List.Item as='li'>
                                                                                    Recommend to the relevant lawful
                                                                                    authority, any necessary action in
                                                                                    view of the violation of the values
                                                                                    and principles by any person or
                                                                                    public body.
                                                                                </List.Item>
                                                                                <List.Item as='li'>
                                                                                    Cooperate with other institutions
                                                                                    working in the field of good
                                                                                    governance in the public service.
                                                                                </List.Item>
                                                                                <List.Item as='li'>
                                                                                    Perform any other functions as the
                                                                                    Board considers necessary for the
                                                                                    promotion of the values and
                                                                                    principles.
                                                                                </List.Item>

                                                                            </List>
                                                                        </GridRow>
                                                                    </Grid>
                                                                </Grid.Row>


                                                            </Grid>


                                                        </Col >
                                                        <Col md="1">
                                                            <img
                                                                alt="..."
                                                                className=" img-fluid rounded-circle shadow"
                                                                src={require("assets/img/ncc_logo.png")}
                                                                style={styleImg}
                                                            ></img>
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

export default About;
