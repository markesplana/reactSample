/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import { Button, List, Avatar, Icon } from 'antd'

import axios from 'axios'

import { baseUrl } from '../../config'

import H1 from 'components/H1';
import messages from './messages';

export default class NewsPage extends React.Component {
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
              extra={<img width={272} alt="logo" src={`${baseUrl}/public/${item.img_url}`} />}
            >
              <List.Item.Meta
                title={<a href={item.href}>{item.title}</a>}
              />
              {item.description}
            </List.Item>
          )}
        />
      </div>
    );
  }
}