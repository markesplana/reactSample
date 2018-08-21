/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import axios from 'axios'

import { List } from 'antd'

import { baseUrl } from '../../config'

import H1 from 'components/H1';
import messages from './messages';

export default class PromoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        products: []
    };
  }

  componentDidMount(){
    axios.get(baseUrl + '/products/promos')
    .then((response) => {
        console.log("PRODUCT LIST", response.data);
        this.setState({
            products: response.data
        });
    })
    .catch(function (error) {
    console.log(error);
    })
  }

  productDetails = (id) => {
    this.props.history.push(`/promo/${id}`)
  }

  render() {
    const { products } = this.state;
    return (
      <div className="container">
        <Helmet>
          <title>Promo Page</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <br />
        <div>
        <List
          itemLayout="vertical"
          size="small"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 10,
          }}
          dataSource={products}
          renderItem={item => (
            <List.Item
              key={item.id}
            >
            <div class="media" onClick={() => {this.productDetails(item.id)}} style={{ cursor: "pointer" }}>
              <div class="media-left">
                <span>
                  <img width={170} alt="logo" src={`${baseUrl}/public/${item.img_url}`} />
                </span>
              </div>
              <div class="media-body">
                <h4 class="media-heading">{item.name}</h4>
                <small>{item.description}</small>
              </div>
            </div>
            </List.Item>
          )}
        />
        </div>
      </div>
    );
  }
}
