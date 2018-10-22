/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import { Form, Icon, Input, Button, Checkbox, Upload } from 'antd';

import { compose } from 'recompose'
const FormItem = Form.Item;

import H1 from 'components/H1';
import messages from './messages';
import LoadingScreen from 'react-loading-screen'
import axios from 'axios'

import { baseUrl } from '../../../../config'

const { TextArea } = Input;

class EditProductPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      description: '',
      price: '',
      productImage: [],
      productImageFile: [],
      productOtherImage: [],
      productOtherImageFile: [],
      uploading: false,
      text: "",
      details: []
    }
  }

  componentDidMount(){
    const { id } = this.props.match.params
    axios.get(`${baseUrl}/products/details/${id}`)
      .then((response) => {
        console.log(response.data)
        this.setState({
          details: response.data,
        })
      })
  }

  handleChange = (value) => {
    this.setState({ text: value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params 
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({
          uploading: true,
        })
        const { name, description, price, photo, details_image } = values
        const fileData = new FormData();
        if (photo == undefined){

        }else{
          fileData.append('photo', photo[0].originFileObj)
        }
        if (details_image == undefined){

        }else{
          fileData.append('details_image', details_image[0].originFileObj );
        }
     
        fileData.append('name', name);
        fileData.append('description', description);
        fileData.append('price', price);
        fileData.append('type_id', 1);
    
        const config = { headers: {  "Authorization" : localStorage.token } };
        axios.post(baseUrl + '/products/update/' + id , fileData, config)
        .then((response) => {
          this.setState({
            uploading: false,
          })
          this.props.history.push('/products')
        })
        .catch((error) => {
          this.setState({
            uploading: false,
          })
          console.log(error);
        });
      }
    });
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  render() {
    const { details } = this.state
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="container">
        <Helmet>
          <title>Product Details Page</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <br />
        <div className="row">
            {
              this.state.uploading ?  
              <LoadingScreen
              loading={true}
              bgColor='#f1f1f1'
              spinnerColor='#9ee5f8'
              textColor='#676767'
              text='Uploading.....'
            /> : 
            <div>
            <br />
            <div class="row">
              <div class="col-md-6 col-md-offset-3">
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                  <label><FormattedMessage {...messages.name} /></label>
                  {getFieldDecorator('name',{
                    initialValue: details.name
                  }, {
                    rules: [{ required: true, message: 'Please input product name!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem>
                  <label><FormattedMessage {...messages.price} /></label>
                  {getFieldDecorator('price',{
                    initialValue: details.price
                  }, {
                    rules: [{ required: true, message: 'Please input product price!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem>
                  <label>1 <FormattedMessage {...messages.productimage} /> (300 × 300 pixels)</label>
                  <br />
                  {getFieldDecorator('photo', {
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile,
                  })(
                    <Upload name="logo" listType="picture">
                      <Button>
                        <Icon type="upload" /> Click to upload
                      </Button>
                    </Upload>
                  )}
                </FormItem>
                <FormItem>
                  <label><FormattedMessage {...messages.productdescription} /></label>
                  {getFieldDecorator('description',{
                    initialValue: details.description
                  }, {
                    rules: [{ required: true, message: 'Please input product description!' }],
                  })(
                    <TextArea rows={4} />
                  )}
                </FormItem>
                <FormItem>
                  <label>1 <FormattedMessage {...messages.otherimage} /> (650px width)</label><br />
                  {getFieldDecorator('details_image', {
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile,
                  })(
                    <Upload name="logo" listType="picture">
                      <Button>
                        <Icon type="upload" /> Click to upload
                      </Button>
                    </Upload>
                  )}
                </FormItem>
                <FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                  >
                    Save
                  </Button>
                </FormItem>
              </Form>
              </div>
            </div>
            </div>  
            }
        </div> 
      </div>
    );
  }
}

const enhance = compose(
  Form.create()
);

export default enhance(EditProductPage);