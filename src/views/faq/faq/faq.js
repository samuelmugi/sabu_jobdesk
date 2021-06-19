import React, {Component} from 'react';
import './faq.scss'
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as faqActions from "../../store/faq/actions";
export default class faq extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
    render() {
      return <div className="component-faq">Hello! component faq</div>;
    }
  }
// export default connect(
//     ({ faq }) => ({ ...faq }),
//     dispatch => bindActionCreators({ ...faqActions }, dispatch)
//   )( faq );