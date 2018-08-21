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

import Link from 'react-router-dom'

import { Carousel } from 'react-bootstrap'
import {  List, Avatar, Icon  } from 'antd'
import { baseUrl } from '../../config'

export default class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        products: [],
        bannerProduct: [],
    };
  }

  componentDidMount(){
    axios.get(baseUrl + '/banners/listpage')
    .then((response) => {
        console.log("Banner LIST", response);
        this.setState({
          bannerProduct: response.data
        });
    })
    .catch(function (error) {
    console.log(error);
    })

    axios.get(baseUrl + '/products/list')
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
    this.props.history.push(`/product/${id}`)
  }


  render() {
    const { products, bannerProduct } = this.state;
    const productsThumbnail = this.state.products.slice(Math.max(products.length - 3, 1))

    return (
      <div className="container">
        <Helmet>
          <title>Product Page</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <br />
        <Carousel>
          {
            bannerProduct.map((item, i) => (
              <Carousel.Item>
                <img width="100%" height={500} alt={item.title} src={`${baseUrl}/public/${item.img_url}`} />
              </Carousel.Item>
            ))
          }
        </Carousel>
        <br />
        <div className="row">
            {
              productsThumbnail.map((item, index) => (
                <div className="col-sm-6 col-md-4" key={index}>
                    <div className="thumbnail"  onClick={() => {this.productDetails(item.id)}} style={{ cursor: "pointer" }}>
                      <img src={`${baseUrl}/public/${item.img_url}`} alt="..." />
                      <div className="caption">
                        <h4>{item.name}</h4>
                        <p>...</p>
                      </div>
                    </div>
                </div>
              ))
            }
        </div>
        <List
          itemLayout="vertical"
          size="small"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 10,
          }}
          dataSource={this.state.products}
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
    );
  }
}
