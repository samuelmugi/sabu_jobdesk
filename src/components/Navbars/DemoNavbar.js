import React from 'react';
import {Link} from 'react-router-dom';
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from 'headroom.js';
// reactstrap components
import {
    Button,
    Col,
    Container,
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    Row,
    UncontrolledCollapse
} from 'reactstrap';
import Signup from "views/login/login/SIgnup";
import STORAGE from "services/APiCalls/config/storage";
import Signin from "views/login/login/signin";
import Contact from "views/contact/contact";

const user = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;

class DemoNavbar extends React.Component {
    state = {
        collapseClasses: '',
        collapseOpen: false
    };

    componentDidMount() {
        let headroom = new Headroom(document.getElementById('navbar-main'));
        // initialise
        headroom.init();
    }

    onExiting = () => {
        this.setState({
            collapseClasses: 'collapsing-out'
        });
    };

    onExited = () => {
        this.setState({
            collapseClasses: ''
        });
    };
    logout = () => {
        STORAGE.destroyAuthTOken();
    }

    render() {
        return (
            <>
                <header>
                    <Navbar
                        className="navbar-main navbar-transparent navbar-light headroom"
                        expand="lg"
                        id="navbar-main"
                    >
                        <Container>
                            <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                                HOME
                            </NavbarBrand>

                            <button className="navbar-toggler" id="navbar_global">
                                <span className="navbar-toggler-icon"/>
                            </button>
                            <UncontrolledCollapse
                                toggler="#navbar_global"
                                navbar
                                className={this.state.collapseClasses}
                                onExiting={this.onExiting}
                                onExited={this.onExited}
                            >
                                <div className="navbar-collapse-header">
                                    <Row>
                                        <Col className="collapse-brand" xs="6">
                                            <Link to="/">
                                                HOME 2
                                            </Link>
                                        </Col>
                                        <Col className="collapse-close" xs="6">
                                            <button className="navbar-toggler" id="navbar_global">
                                                <span/>
                                                <span/>
                                            </button>
                                        </Col>
                                    </Row>
                                </div>
                                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                                    {user !== 'NA' &&
                                    <NavItem>
                                        <NavLink className="nav-link-icon" to="/candidate-page" tag={Link}>
                                            MY JOB PROFILE
                                        </NavLink>
                                    </NavItem>
                                    }
                                    <NavItem> <NavLink className="nav-link-icon" to="/jobs-page" tag={Link}>
                                        JOBS
                                    </NavLink>
                                    </NavItem>

                                </Nav>
                                <Nav className="align-items-lg-center ml-lg-auto" navbar>


                                    <NavItem>
                                        <NavLink className="nav-link-icon" to="/notices-page" tag={Link}>
                                            NOTICES
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link-icon" to="/shortlist-page" tag={Link}>
                                           SHORTLISTS
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link-icon" to="/about-page" tag={Link}>
                                            ABOUT
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="nav-link-icon">
                                        <Contact/>

                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link-icon" to="/faq-page" tag={Link}>
                                            FAQ
                                        </NavLink>
                                    </NavItem>
                                    {user === 'NA' &&
                                    <>
                                        <NavItem className="nav-link-icon">
                                            <Signup/>
                                        </NavItem>
                                        <NavItem className="nav-link-icon">
                                            <Signin/>
                                        </NavItem>
                                    </>
                                    }
                                    {user !== 'NA' &&
                                    <NavItem className="nav-link-icon">
                                        <Button
                                            onClick={this.logout}
                                            className="btn-neutral btn-icon"
                                            color="default"
                                        >  <span>
                                        LOG OUT
                                        </span>
                                        </Button>
                                    </NavItem>
                                    }
                                </Nav>
                            </UncontrolledCollapse>
                        </Container>
                    </Navbar>
                </header>
            </>
        );
    }
}

export default DemoNavbar;
