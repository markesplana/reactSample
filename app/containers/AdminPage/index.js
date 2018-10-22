/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import axios from 'axios'

import { compose } from 'recompose'

import { baseUrl } from '../../config'

import H1 from 'components/H1';
import messages from './messages';
import UploadLogo from './UploadLogo'
import UploadProductSlide from './UploadProductSlide'
import Item from '../../../node_modules/antd/lib/list/Item';

import { Form, Icon, Input, Button  } from "antd"

const FormItem = Form.Item;

class AdminPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  // Since state and props are static,
  // there's no need to re-render this component
  constructor(props){
    super(props)
    this.state = {
      adminEmail: "",
      loading: false,
      bannerProduct: [],
      bannerHome: [],
      logo: "",
      stores: [],
      dataSource: [],
      disabled: true,
      newEmail: '',
    }
  }

  componentDidMount(){
    axios.get(baseUrl + '/stores/list')
    .then((response) => {
        console.log("Store LIST", response);
        this.setState({
          stores: response.data
        });
    })
    .catch(function (error) {
    console.log(error);
    })

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
        console.log("Settings LIST", response);
        this.setState({
          adminEmail: response.data.admin_email,
          logo: response.data.logo_url
        })
    })
    .catch(function (error) {
    console.log(error);
    })
  }

  handleEditEmail = () => {
    this.setState({
      disabled: false,
    })
  }

  handleSaveEmail = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values.admin_email);
        const fileData = new FormData();
        fileData.append('admin_email', values.admin_email)
    
        const config = { headers: {  "Authorization" : localStorage.token } };
        axios.post(baseUrl + '/settings/updateadmin', {
          admin_email: values.admin_email
        }, config)
        .then((response) => {
          console.log("response save", response)
          this.setState({
            disabled: true,
            adminEmail: response.data.admin_email
          })
          // location.reload()
        })
      }
    });
  }

  handleCancelEmail = () => {
    this.setState({
      disabled: true,
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

  removeStore = (id) => {
    const config = { headers: {  "Authorization" : localStorage.token } };
        axios.get(baseUrl + '/stores/delete/' + id, config)
        .then((response) => {
            location.reload()
        })
        .catch(function (error) {
        console.log(error);
        })
  }

  handleChange = (value) => {
    this.setState({
      newEmail: value
    });
  }


  render() {
    const { bannerHome, bannerProduct, logo, stores } = this.state
    const { getFieldDecorator } = this.props.form;

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
        <br />
        <hr />
        <div className="row">
          <h4><FormattedMessage {...messages.email} /></h4>
          {
            this.state.disabled ?
            <Input 
            style={{ width: 450 }}
            onChange={this.handleChange}
            defaultValue={this.state.adminEmail}
            disabled={this.state.disabled}
            addonAfter={
               <a onClick={this.handleEditEmail}><Icon type="edit" /> <FormattedMessage {...messages.edit} /></a>
              }
          /> :
          <Form layout="inline" onSubmit={this.handleSaveEmail}>
          <FormItem>
            {getFieldDecorator('admin_email', {
              initialValue: this.state.adminEmail
            },{
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input style={{ width: 450 }} />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
            >
              <FormattedMessage {...messages.save} />
            </Button>
            <Button
              type="default"
              onClick={this.handleCancelEmail}
            >
              <FormattedMessage {...messages.cancel} />
            </Button>
            </FormItem>  
         </Form>

          }
         

           
          </div>  
        <br />
        <hr />
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
          <hr />
          <h4><FormattedMessage {...messages.stores} /></h4>
          <div class="row">
          {
              stores.map((item, i) => (
                <div class="col-xs-6 col-md-3">
                  <div class="thumbnail">
                    <img src={`${baseUrl}/public/${item.img_url}`} alt="..." />
                    <br />
                    <div className="pull-right">
                      <Button size="small" onClick={() => {this.removeStore(item.id)}} type="danger">Remove</Button>
                    </div>
                    <p>{item.title}</p>
                  </div>
                </div>
              ))
            }
          </div>
          <Button type="primary" onClick={() => {this.props.history.push("/addstore")} }>Add Store</Button>
        </div>
       </div> 
    );
  }
}

const enhance = compose(
  Form.create()
);

export default enhance(AdminPage);