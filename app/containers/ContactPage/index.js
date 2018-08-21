/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Input, Form, Icon, Button, } from 'antd';
import H1 from 'components/H1';
import messages from './messages';
import { compose } from 'recompose'

const FormItem = Form.Item;
const { TextArea } = Input;

class ContactPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
                {getFieldDecorator('firstname', {
                  rules: [{ required: true, message: 'Please input your first name!' }],
                })(
                  <Input />
                )}
              </FormItem>
              <small><FormattedMessage {...messages.lastname} />:</small>
              <FormItem>
                {getFieldDecorator('lastname', {
                  rules: [{ required: true, message: 'Please input your last name!' }],
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