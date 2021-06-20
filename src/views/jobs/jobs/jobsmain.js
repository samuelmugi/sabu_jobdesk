import React, {Component} from 'react';
import classnames from 'classnames';
import './jobs.scss';
import {Card, CardBody, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap';
import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import CardsFooter from 'components/Footers/CardsFooter.js';
import Alljobs from 'views/jobs/jobs/alljobs';
import JobApplications from 'views/jobs/jobs/applications';

export default class JobsMain extends Component {
    state = {
        iconTabs: 1,
        plainTabs: 1
    };
    toggleNavs = (e, state, index) => {
        e.preventDefault();
        this.setState({
            [state]: index
        });
    };

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

                                        <div className="nav-wrapper">
                                            <Nav
                                                className="nav-fill flex-column flex-md-row"
                                                id="tabs-icons-text"
                                                pills
                                                role="tablist"
                                            >
                                                <NavItem>
                                                    <NavLink
                                                        aria-selected={this.state.iconTabs === 1}
                                                        className={classnames('mb-sm-3 mb-md-0', {
                                                            active: this.state.iconTabs === 1
                                                        })}
                                                        onClick={e => this.toggleNavs(e, 'iconTabs', 1)}
                                                        href="#pablo"
                                                        role="tab"
                                                    >
                                                        <i className="ni ni-cloud-upload-96 mr-2"/>
                                                        Jobs
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        aria-selected={this.state.iconTabs === 2}
                                                        className={classnames('mb-sm-3 mb-md-0', {
                                                            active: this.state.iconTabs === 2
                                                        })}
                                                        onClick={e => this.toggleNavs(e, 'iconTabs', 2)}
                                                        href="#pablo"
                                                        role="tab"
                                                    >
                                                        <i className="ni ni-bell-55 mr-2"/>
                                                        Applications
                                                    </NavLink>
                                                </NavItem>

                                            </Nav>
                                        </div>
                                        <Card className="shadow">
                                            <CardBody>
                                                <TabContent activeTab={'iconTabs' + this.state.iconTabs}>
                                                    <TabPane tabId="iconTabs1">
                                                        <Alljobs/>
                                                    </TabPane>
                                                    <TabPane tabId="iconTabs2">
                                                        <JobApplications/>
                                                    </TabPane>
                                                </TabContent>
                                            </CardBody>
                                        </Card>
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
            </>);
    }
}