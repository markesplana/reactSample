/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import { Form, Icon, Input, Button, Upload } from 'antd';

import { compose } from 'recompose'
const FormItem = Form.Item;

import H1 from 'components/H1';
import Wysiwyg from 'components/Wysiwyg';
import messages from './messages';
import LoadingScreen from 'react-loading-screen'
import axios from 'axios'

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { baseUrl } from '../../../../config'

const { TextArea } = Input;

class EditAboutPage extends React.Component {
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
      uploading: false,
      text: "",
      about: {}
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
  };

  componentWillMount = () => {
    axios.get(baseUrl + '/settings/list')
    .then((response) => {
        console.log("Banner LIST", response);
        this.setState({
          about: response.data
        })
        const contentBlock = htmlToDraft(response.data.about_us_description);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);
          this.setState({
            editorState
          })
        }
    })
    .catch(function (error) {
    console.log(error);
    })
  }

  handleChange = (value) => {
    console.log("value", value)
    this.setState({ text: value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({
          uploading: true,
        })
        const { title, description, photo } = values
        const { editorState } = this.state;
        const fileData = new FormData();
        fileData.append('image', photo.file.originFileObj)
        fileData.append('title', title);
        fileData.append('description', draftToHtml(convertToRaw(editorState.getCurrentContent())));
    
        const config = { headers: {  "Authorization" : localStorage.token } };
        axios.post(baseUrl + '/settings/aboutus', fileData, config)
        .then((response) => {
          this.setState({
            uploading: false,
          })
          this.props.history.push('/about')
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
    const { getFieldDecorator } = this.props.form;
    const { about, editorState } = this.state
    console.log("about", about)

    return (
      <div className="container">
        <Helmet>
          <title>Edit About Page</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <H1>
          <FormattedMessage {...messages.editabout} />
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
              text='Saving.....'
            /> : 
            <div>
            <br />
            <div class="row">
              <div class="col-md-6 col-md-offset-3">
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                  <label><FormattedMessage {...messages.title} /></label>
                  {getFieldDecorator('title', { 
                    initialValue: about.about_us_title 
                    },{
                    rules: [
                      { required: true, message: 'Please input news title!'},
                    ],
                    
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem>
                  <label>1 <FormattedMessage {...messages.coverimage} /> ( 250 x 250 pixels )</label>
                  <br />
                  {getFieldDecorator('photo', 
                    { initialValue: about.about_us_img },
                  {
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
                {/* <FormItem>
                  <label><FormattedMessage {...messages.description} /></label>
                  {getFieldDecorator('description', { initialValue: about.about_us_description }, {
                    rules: [{ required: true, message: 'Please input news description!' }],
                  })(
                    <TextArea rows={4} />
                  )}
                </FormItem> */}
                <FormItem>
                <label><FormattedMessage {...messages.description} /></label>
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

export default enhance(EditAboutPage);