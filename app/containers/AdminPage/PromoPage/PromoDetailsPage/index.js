/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import axios from 'axios'
import renderHTML from 'react-render-html';

import H1 from 'components/H1';
import messages from './messages';
import Countdown from 'react-sexy-countdown'
import moment from 'moment';
import { baseUrl } from '../../../../config'

export default class PromoDetailsPage extends React.Component {
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
    const endDate = moment(product.promo_expiry)
    return (
      <div className="container">
        <Helmet>
          <title>Promo Details Page</title>
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
            <div>
            <a href={product.link} target="_blank" className="btn btn-primary">
              <small><FormattedMessage {...messages.link} /></small>
            </a>
            </div>
            <br />  
            <small><FormattedMessage {...messages.promodescription} />:</small>
            {renderHTML(`${product.description}`)}
            <small><FormattedMessage {...messages.price} />:</small>
            <p>{product.price}</p>
            <small><FormattedMessage {...messages.quantity} />:</small>
            <p>{product.quantity}</p>
            <small><FormattedMessage {...messages.time} />:</small>
            <div style={{ width: 250 }}>
            <Countdown
                date={ moment(product.promo_expiry, "YYYY-MM-DD")}
                onEndCountdown={ (count) => console.log(count)  }
                displayText={{
                  Days: 'Days',
                  Day: 'Day',
                  Hours: 'Hours',
                  Min: 'Min',
                  Sec: 'Sec',
                }}
                lastTextTime={{
                  Day: 'D'
                }}
                isDayDoubleZero={ true }
              />
            </div>
            
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
