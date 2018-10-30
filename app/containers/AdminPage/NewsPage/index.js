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

import { Button, List, Avatar, Icon } from 'antd'


import { baseUrl } from '../../../config'

export default class AdminNewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        news: []
    };
  }

  componentWillMount(){
    axios.get(baseUrl + '/news/list')
    .then((response) => {
        console.log("PRODUCTS", response.data)
        this.setState({
            news: response.data
        });
    })
    .catch(function (error) {
    })
  }

  handleDelete = (id) => {
    console.log("handleDelete", id)
    const config = { headers: {  "Authorization" : localStorage.token } };
    axios.get(baseUrl + '/news/delete/' + id, config)
    .then((response) => {
        console.log("delete news", response)
        location.reload()
    })
    .catch(function (error) {
    console.log(error);
    })
}
  productDetails = (id) => {
    this.props.history.push(`/product/${id}`)
  }


  render() {
    const { news } = this.state;
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    
    return (
      <div className="container">
        <Helmet>
          <title>News Page</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <div className="pull-right">
          <Button type="primary" onClick={() => {this.props.history.push("/addnews")}}><FormattedMessage {...messages.addnews} /></Button>
        </div>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={news}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={[<Button 
                onClick={() => {this.handleDelete(item.id)}} 
                size="small" 
                type="danger">
                <Icon type="delete" /> 
                <FormattedMessage {...messages.delete} />
                </Button>,
                <Button 
                onClick={() => { this.props.history.push(`/editnews/${item.id}`)}} 
                size="small" 
                type="primary">
                <Icon type="edit" /> 
                <FormattedMessage {...messages.edit} />
                </Button>]}
              extra={<img width={272} alt="logo" src={`${baseUrl}/public/${item.img_url}`} />}
            >
              <List.Item.Meta
                title={<a href={item.href}>{item.title}</a>}
              />
              {renderHTML(`${item.description}`)}
            </List.Item>
          )}
        />
      </div>
    );
  }
}
