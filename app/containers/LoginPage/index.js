/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'recompose';
import axios from 'axios';

import localStorage from 'localStorage'

const FormItem = Form.Item;
 
import { baseUrl } from '../../config'

import { Form, Icon, Input, Button, message } from 'antd';

import H1 from 'components/H1';
import messages from './messages';

class LoginPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  // Since state and props are static,
  // there's no need to re-render this component
  

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', this.props);
        axios.post(baseUrl + '/admin/signin', {
          username: values.username,
          password: values.password
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token.key)
          // location.reload()
          this.props.history.push('/admin')
        })
        .catch((log) => {
          message.error('Invalid Username or Password');
        });
      }else{
        message.error('Invalid Username or Password');
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="container">
        <Helmet>
          <title>Login Page</title>
        </Helmet>
        <div class="row">
          <div class="col-md-6 col-md-offset-3">
          <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <hr />
          <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
            <FormItem>
              
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              <p><FormattedMessage {...messages.password} /></p>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </FormItem>
          </Form>
          </div>
        </div>
      </div>
    );
  }
}

const enhance = compose(
  Form.create()
)

export default enhance(LoginPage)