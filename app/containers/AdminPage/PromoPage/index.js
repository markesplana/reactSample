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

import { Button, Table, Divider } from 'antd'

import Countdown from 'react-countdown-moment'
import moment from 'moment';

import { baseUrl } from '../../../config'

export default class AdminPromoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        products: []
    };
  }

  componentWillMount(){
    axios.get(baseUrl + '/products/promos')
    .then((response) => {
        this.setState({
            products: response.data
        });
    })
    .catch(function (error) {
    })
  }

  handleDelete = (id) => {
    const config = { headers: {  "Authorization" : localStorage.token } };
    axios.get(baseUrl + '/products/delete/' + id, config)
    .then((response) => {
        this.props.history.push("/products")
        location.reload()
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
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '45%',
      render: (text, record) => 
        <div className="media" style={{ cursor: "pointer" }} onClick={() => { this.productDetails(record.id) }} >
          <div className="media-left">
            <a href="#">
              <img style={{ width: 60 }} className="media-object" src={`${baseUrl}/public/${record.img_url}`} alt="..." />
            </a>
          </div>
          <div className="media-body">
            <h4 className="media-heading" style={{ marginTop: 15 }}>{text}</h4>
          </div>
        </div>
    },{
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    },{
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity'
    },{
      title: 'Expiration',
      dataIndex: 'promo_expiry',
      key: 'promo_expiry',
      render: (text, record) => {
        const endDate = moment(record.promo_expiry)
        return <Countdown endDate={endDate} />
      }
    },{
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={() => { this.handleDelete(record.id) }} >Delete</a>
        </span>
      ),
    }];

    return (
      <div className="container">
        <Helmet>
          <title>Product Page</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <div className="pull-right">
          <Button type="primary" onClick={() => {this.props.history.push("/addpromo")}}><FormattedMessage {...messages.btnaddproduct} /></Button>
        </div>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <Table dataSource={products} columns={columns}  size="small" />
      </div>
    );
  }
}
