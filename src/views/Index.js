import CardsFooter from 'components/Footers/CardsFooter.js';
// core components
import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import React from 'react';
// reactstrap components
// index page sections
import Hero from './IndexSections/Hero.js';

class Index extends React.Component {
    componentDidMount() {
        // document.documentElement.scrollTop = 0;
        // document.scrollingElement.scrollTop = 0;
        // this.refs.main.scrollTop = 0;
    }

    render() {
        return (
            <>
                <DemoNavbar/>
                <main ref="main">
                    <Hero/>

                </main>
                <CardsFooter/>
            </>
        );
    }
}

export default Index;
