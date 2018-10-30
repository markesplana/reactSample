/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import messages from './messages';

import renderHTML from 'react-render-html';

import axios from 'axios';
import { baseUrl } from '../../config';

export default class FeaturePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      about: {}
    }
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

  render() {
    const { about } = this.state
    return (
      <div className="container">
        <Helmet>
          <title>About Page</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
          <hr />
          <div className="row">
            <div className="col-xs-12 col-md-3">
              <p><strong>{about.about_us_title}</strong></p>
            </div>
            <div className="col-xs-12 col-md-9">
              {renderHTML(`${about.about_us_description}`)}
              <br />
              <img width="250" src={`${baseUrl}/public/${about.about_us_img}`} />
            </div>
          </div>

        </H1>
      </div>
    );
  }
}
