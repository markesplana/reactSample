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
        </H1>
      </div>
    );
  }
}
