import React from 'react';
// reactstrap components
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import {Col, Row} from "reactstrap";

const useStyles = makeStyles((theme) => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        background: '#69831d'

    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
}));

const CardsFooter = () => {
    const classes = useStyles();


    return (


        <AppBar position="fixed" color="primary" className={classes.appBar}>

            <Row className="justify-content-center align-content-center">
                <Col md="1"></Col>
                <Col>
                    <div className="copyright">
                        © {new Date().getFullYear()}{' '}
                        Nairobi City County Public Service Board
                    </div>
                </Col>
                <Col>
                    <div>
                        <a>
                            Telephone: 020 2177325
                        </a>
                        .
                    </div>
                </Col>
                <Col>
                    <div>

                        <a

                        >
                            Email: cpsb@nairobi.go.ke
                        </a>
                        .
                    </div>
                </Col>
                <Col>
                    <a style={{"color": "white"}}
                       href="http://cpsb.nairobi.go.ke/index.php/"
                       target="_blank"
                    >
                        Website:cpsb.nairobi.go.ke
                    </a>

                </Col>
                <Col>
                    <a>
                        Address: City Hall, P.O. Box 30075-00100, Nairobi, Kenya.
                    </a>
                    .

                </Col>
                <Col md="1"></Col>

            </Row>

        </AppBar>

    );

}

export default CardsFooter;
