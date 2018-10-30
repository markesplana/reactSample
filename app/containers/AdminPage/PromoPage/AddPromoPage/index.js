/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import { Form, Icon, Input, Button, DatePicker, Upload } from 'antd';

import { compose } from 'recompose'
const FormItem = Form.Item;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const { TextArea } = Input;
import H1 from 'components/H1';
import messages from './messages';
import LoadingScreen from 'react-loading-screen'
import axios from 'axios'

import { baseUrl } from '../../../../config'

class AddPromoPage extends React.Component {
  constructor(props){
    super(props)
    const html = '';
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
    this.state = {
      name: '',
      description: '',
      price: '',
      productImage: [],
      productImageFile: [],
      productOtherImage: [],
      productOtherImageFile: [],
      uploading: false
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({
          uploading: true,
        })
        const { name, description, price, photo, details_image, quantity, promo_expiry, link } = values
        const fileData = new FormData();
        fileData.append('photo', photo[0].originFileObj)
        fileData.append('details_image', details_image[0].originFileObj);
        fileData.append('name', name);
        fileData.append('link', link);
        fileData.append('quantity', quantity);
        fileData.append('promo_expiry', promo_expiry);
        fileData.append('description', draftToHtml(convertToRaw(editorState.getCurrentContent())));
        fileData.append('price', price);
        fileData.append('type_id', 2);
    
        const config = { headers: {  "Authorization" : localStorage.token } };
        axios.post(baseUrl + '/products/add', fileData, config)
        .then((response) => {
          this.setState({
            uploading: false,
          })
          this.props.history.push('/promos')
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
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  }
  

  render() {
    const { getFieldDecorator } = this.props.form;
    const { editorState } = this.state;
    return (
      <div className="container">
        <Helmet>
          <title>Promo Details Page</title>
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
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please input product name!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem>
                  <label><FormattedMessage {...messages.price} /></label>
                  {getFieldDecorator('price', {
                    rules: [{ required: true, message: 'Please input product price!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem>
                  <label><FormattedMessage {...messages.quantity} /></label>
                  {getFieldDecorator('quantity', {
                    rules: [{ required: true, message: 'Please input product quantity!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem>
                  <label><FormattedMessage {...messages.time} /></label>
                  <br />
                  {getFieldDecorator('promo_expiry', {
                    rules: [{ required: true, message: 'Please input product quantity!' }],
                  })(
                    <DatePicker onChange={this.onChangeDate} />
                  )}
                </FormItem>
                <FormItem>
                  <label><FormattedMessage {...messages.link} /></label>
                  <br />
                  {getFieldDecorator('link', {
                    rules: [{ required: true, message: 'Please input product quantity!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem>
                  <label>1 <FormattedMessage {...messages.promoimage} /> (300 × 300 pixels)</label>
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
                  <label><FormattedMessage {...messages.promodescription} /></label>
                  <Editor
                    editorState={editorState}
                    toolbar={{
                      options: ['inline'],
                      inline: {
                        options: ['bold', 'italic', 'underline'],
                      }
                    }}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                  />  
                  {/* {getFieldDecorator('description', {
                    rules: [{ required: true, message: 'Please input product description!' }],
                  })(
                    <TextArea rows={6} />
                  )} */}
                </FormItem>
                <FormItem>
                  <label>1 <FormattedMessage {...messages.otherimage} />  (650px width)</label>
                  <br />
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

export default enhance(AddPromoPage);