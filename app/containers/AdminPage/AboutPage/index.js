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

import { Button, List, Avatar, Icon } from 'antd'
import renderHTML from 'react-render-html';

import { baseUrl } from '../../../config'

export default class AdminAboutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      about: []
    };
  }

  componentDidMount = () => {
    axios.get(baseUrl + '/settings/list')
    .then((response) => {
      console.log("response", response)
      this.setState({
        about: response.data
      })
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
    const { about } = this.state;
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    
    return (
      <div className="container">
        <Helmet>
          <title>About Page</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <div className="pull-right">
          <Button type="primary" onClick={() => {this.props.history.push("/editabout")}}><FormattedMessage {...messages.editabout} /></Button>
        </div>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <hr />
          <div className="row">
            <div className="col-md-12">
                <div>
                  <p><strong>{about.about_us_title}</strong></p>
                </div>
                <div>
                {renderHTML(`${about.about_us_description}`)}
                </div>
                <div>
                  <img width="100%" src={`${baseUrl}/public/${about.about_us_img}`} />
                </div>
              </div>
          </div>
      </div>
    );
  }
}
