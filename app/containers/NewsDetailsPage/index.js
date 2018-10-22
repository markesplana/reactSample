/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import axios from 'axios'

import H1 from 'components/H1';
import messages from './messages';


import { baseUrl } from '../../config'

export default class NewsDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        products: []
    };
  }

  componentDidMount(){
    console.log("PROPS", this.props.match.params.id)
    // axios.get(baseUrl + '/products/list')
    // .then((response) => {
    //     console.log("PRODUCT LIST", response.data);
    //     this.setState({
    //         products: response.data
    //     });
    // })
    // .catch(function (error) {
    // console.log(error);
    // })
  }


  render() {
    return (
      <div className="container">
        <Helmet>
          <title>News Details Page</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <br />
        <div className="row">
          <div className="col-md-4 text-center">
            <img src="http://www.natchshop.com.tw/GoodPic/149274654229479_middle.jpg" />
          </div>
          <div className="col-md-8">
            <p><strong>[Natch Pro] Pomegranate Collagen (30 pcs/box)</strong></p>
            <small><FormattedMessage {...messages.productdescription} />:</small>
            <p>Beauty beauty, beauty witch heart machine supplies</p>
            <small><FormattedMessage {...messages.price} />:</small>
            <p>999</p>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-6 col-md-offset-3 text-center">
            <img src="http://www.natchshop.com.tw/UploadFile/UserFiles/images/new%2020%20-%20%E7%B4%85%E7%9F%B3%E6%A6%B4%E8%86%A0%E5%8E%9F%E8%9B%8B%E7%99%BD%20pomegranate%20and%20collagen%20-%20embed-01.jpg" />
          </div>
        </div>
      </div>
    );
  }
}
