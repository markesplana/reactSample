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
import renderHTML from 'react-render-html';

import { baseUrl } from '../../../../config'

export default class ProductDetailsPage extends React.Component {
  constructor(props) {
    
    super(props);
    this.state = {
        product: []
    };
  }
  // eslint-disable-line react/prefer-stateless-function
  // Since state and props are static,
  // there's no need to re-render this component
 

  componentWillMount(){ 
    const { params } =  this.props.match
    axios.get(baseUrl + '/products/details/' + params.id)
    .then((response) => {
      console.log("PRODUCT details", response);
      const { data } = response
      this.setState({
        product: data
      })
  })
  .catch(function (error) {
  console.log(error);
  })
  }

  render() {
    const { product } = this.state;
    console.log("product detail", product)
    return (
      <div className="container">
        <Helmet>
          <title>Product Details Page</title>
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
            <img src={`${baseUrl}/public/${product.img_url}`} />
          </div>
          <div className="col-md-8">
            <p><strong>{product.name}</strong></p>
            <small><FormattedMessage {...messages.productdescription} />:</small>
            {renderHTML(`${product.description}`)}
            <small><FormattedMessage {...messages.price} />:</small>
            <p>{product.price}</p>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-6 col-md-offset-3 text-center">
            <img src={`${baseUrl}/public/${product.details_image}`} />
          </div>
        </div>
      </div>
    );
  }
}
