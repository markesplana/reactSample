/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Input, Form, Icon, Button, message } from 'antd';
import H1 from 'components/H1';
import messages from './messages';
import { compose } from 'recompose'

const FormItem = Form.Item;
const { TextArea } = Input;

import axios from 'axios';
import { baseUrl } from '../../config'

class ContactPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      subject: "",
      email: "",
      name: "",
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        axios.post(baseUrl + '/contactus', {
          email: values.email,
          contact_no: values.contact,
          address: values.address,
          name: values.name,
          subject: values.subject,
          message: values.message
        })
        .then((response) => {
          console.log("response", response)
          this.props.form.resetFields();
          message.success('Message Sent!');
        })
        .catch((log) => {
          message.error('Unable to send!');
        });
      }
    });
  }


  render() {
    console.log("=====>", this.props)
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="container">
        <Helmet>
          <title>Contact Page</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
          <div style={{ background: "#ffffff", padding: 15 }}>
          <Form onSubmit={this.handleSubmit} className="login-form">
              <small><FormattedMessage {...messages.firstname} />:</small>
              <FormItem>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input your first name!' }],
                })(
                  <Input />
                )}
              </FormItem>
              <small><FormattedMessage {...messages.contact} />:</small>
              <FormItem>
                {getFieldDecorator('contact', {
                  rules: [{ required: true, message: 'Please input your number!' }],
                })(
                  <Input />
                )}
              </FormItem>
              <small><FormattedMessage {...messages.address} />:</small>
              <FormItem>
                {getFieldDecorator('address', {
                  rules: [{ required: true, message: 'Please input your address!' }],
                })(
                  <Input />
                )}
              </FormItem>
             <FormItem>
              <small><FormattedMessage {...messages.email} />:</small>
              {getFieldDecorator('email', {
                  rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                  }, {
                    required: true, message: 'Please input your E-mail!',
                  }],
                })(
                  <Input />
                )}
            </FormItem>
            <FormItem>
              <small><FormattedMessage {...messages.subject} />:</small>
              {getFieldDecorator('subject', {
                  rules: [{
                    required: true, message: 'Please input your E-mail!',
                  }],
                })(
                  <Input />
                )}
            </FormItem>
            <FormItem>
              <small><FormattedMessage {...messages.compose} />:</small>
              {getFieldDecorator('message', {
                rules: [{ required: true, message: 'Please input your message!' }],
              })(
                <TextArea rows={6} />
              )}
            </FormItem>
            <Button type="primary" htmlType="submit" style={{ width:"100%" }}>
              Send
            </Button>
          </Form>
          </div>
          </div>  
        </div>
      </div>
    );
  }
}

const enhance = compose(
  Form.create()
)

export default enhance(ContactPage)