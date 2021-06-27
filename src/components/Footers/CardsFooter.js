import React from 'react';
// reactstrap components
import {Col, Row} from 'reactstrap';

class CardsFooter extends React.Component {
    render() {
        return (
            <>
                <footer className="footer">
                <hr/>
                <Row  className="justify-content-center">
                    <Col md="auto">
                        <div className="copyright">
                            © {new Date().getFullYear()}{' '}
                            Nairobi City County Public Service Board
                        </div>
                    </Col>
                    <Col md="auto">
                        <div>
                            <a>
                                Telephone: 020 2177325
                            </a>
                            .
                        </div>
                    </Col>
                    <Col md="auto">
                        <div>

                            <a

                            >
                                Email: cpsb@nairobi.go.ke
                            </a>
                            .
                        </div>
                    </Col>
                    <Col>
                        <a
                            href="http://cpsb.nairobi.go.ke/index.php/"
                            target="_blank"
                        >
                            Website:cpsb.nairobi.go.ke
                        </a>

                    </Col>
                    <Col md="4">
                        <div>

                            <a

                            >
                                Address: City Hall, P.O. Box 30075-00100, Nairobi, Kenya
                            </a>
                            .
                        </div>
                    </Col>
                </Row>
                </footer>
            </>
        );
    }
}

export default CardsFooter;
