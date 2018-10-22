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

class EditNewsPage extends React.Component {
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
      details: [],
    }
  }

  componentDidMount(){
    const { id } = this.props.match.params
    axios.get(`${baseUrl}/news/details/${id}`)
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
        const { title, description, photo } = values
        const fileData = new FormData();
        if(photo.file == undefined){
          fileData.append('title', title);
          fileData.append('description', description);
          console.log("No Image", photo)
          const config = { headers: {  "Authorization" : localStorage.token } };
          axios.post(baseUrl + '/news/update/' + id, fileData, config)
          .then((response) => {
            this.setState({
              uploading: false,
            })
            this.props.history.push('/news')
          })
          .catch((error) => {
            this.setState({
              uploading: false,
            })
            console.log(error);
          });
        }else{
          fileData.append('title', title);
          fileData.append('description', description);
          fileData.append('photo', photo.file.originFileObj)
          const config = { headers: {  "Authorization" : localStorage.token } };
          axios.post(baseUrl + '/news/update/' + id, fileData, config)
          .then((response) => {
            this.setState({
              uploading: false,
            })
            this.props.history.push('/news')
          })
          .catch((error) => {
            this.setState({
              uploading: false,
            })
            console.log(error);
          });
        }
       
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
                  <label><FormattedMessage {...messages.title} /></label>
                  {getFieldDecorator('title', {
                    initialValue: details.title
                  },{
                    rules: [{ required: true, message: 'Please input news title!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem>
                  <label>1 <FormattedMessage {...messages.newsimage} /> (544 x 336 pixels)</label>
                  <br />
                  {getFieldDecorator('photo', {
                    initialValue: details.img_url
                  },{
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile,
                  })(
                    <Upload name="logo" listType="picture" multiple="false">
                      <Button>
                        <Icon type="upload" /> Click to upload
                      </Button>
                    </Upload>
                  )}
                </FormItem>
                <FormItem>
                  <label><FormattedMessage {...messages.description} /></label>
                  {getFieldDecorator('description', {
                    initialValue: details.description
                  },{
                    rules: [{ required: true, message: 'Please input news description!' }],
                  })(
                    <TextArea rows={4} />
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

export default enhance(EditNewsPage);