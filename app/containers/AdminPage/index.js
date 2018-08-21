/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import { Button } from 'antd';
import axios from 'axios'

import { baseUrl } from '../../config'

import H1 from 'components/H1';
import messages from './messages';
import UploadLogo from './UploadLogo'
import UploadProductSlide from './UploadProductSlide'
import Item from '../../../node_modules/antd/lib/list/Item';

export default class AdminPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  // Since state and props are static,
  // there's no need to re-render this component
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      bannerProduct: [],
      bannerHome: [],
      logo: ""
    }
  }

  componentDidMount(){
    axios.get(baseUrl + '/banners/listhome')
    .then((response) => {
        console.log("Banner LIST", response);
        this.setState({
          bannerHome: response.data
        });
    })
    .catch(function (error) {
    console.log(error);
    })

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

    axios.get(baseUrl + '/settings/list')
    .then((response) => {
        console.log("Banner LIST", response);
        this.setState({
          logo: response.data.logo_url
        })
    })
    .catch(function (error) {
    console.log(error);
    })
  }

  removeImage = (id) => {
    const config = { headers: {  "Authorization" : localStorage.token } };
        axios.get(baseUrl + '/banners/delete/' + id, config)
        .then((response) => {
            location.reload()
        })
        .catch(function (error) {
        console.log(error);
        })
  }

  render() {
    const { bannerHome, bannerProduct, logo } = this.state

    return (
      <div className="container">
        <Helmet>
          <title>Admin Page</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <div className="row">
        <h4><FormattedMessage {...messages.logo} /></h4>
          <div class="row">
            <div class="col-xs-6 col-md-3">
              <a href="#" class="thumbnail">
                <img src={`${baseUrl}/public/${logo}`} alt="logo" />
              </a>
            </div>
          </div>
          <Button type="primary" onClick={() => {this.props.history.push("/changelogo")} }>Change Logo</Button>
          <hr />
          <h4><FormattedMessage {...messages.homeslider} /></h4>
          <div class="row">
            {
              bannerHome.map((item, i) => (
                <div class="col-xs-6 col-md-3">
                  <div class="thumbnail">
                    <img src={`${baseUrl}/public/${item.img_url}`} alt="..." />
                    <br />
                    <div className="pull-right">
                      <Button size="small" onClick={() => {this.removeImage(item.id)}} type="danger">Remove</Button>
                    </div>
                    <p>{item.title}</p>
                  </div>
                </div>
              ))
            }
          </div>
          <Button type="primary" onClick={() => {this.props.history.push("/addhomebanner")} }>Add Image</Button>
          <hr />
          <h4><FormattedMessage {...messages.productslider} /></h4>
          <div class="row">
          {
              bannerProduct.map((item, i) => (
                <div class="col-xs-6 col-md-3">
                  <div class="thumbnail">
                    <img src={`${baseUrl}/public/${item.img_url}`} alt="..." />
                    <br />
                    <div className="pull-right">
                      <Button size="small" onClick={() => {this.removeImage(item.id)}} type="danger">Remove</Button>
                    </div>
                    <p>{item.title}</p>
                  </div>
                </div>
              ))
            }
          </div>
          <Button type="primary" onClick={() => {this.props.history.push("/addproductbanner")} }>Add Image</Button>
        </div>
       </div> 
    );
  }
}
