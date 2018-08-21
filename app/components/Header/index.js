import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import LocaleToggle from 'containers/LocaleToggle';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import localStorage from 'localStorage';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class HeaderComponent extends React.Component {
  signOut = () => {
    localStorage.removeItem("token");
    location.reload()
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <LocaleToggle />
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Natchshop</Link>
            </Navbar.Brand>
          </Navbar.Header>
            <Nav pullRight>
              <li eventKey={1}>
              <Link to="/">
                <FormattedMessage {...messages.home} />
              </Link>
            </li>  
            <li eventKey={2}>
              <Link to="/about">
                <FormattedMessage {...messages.aboutus} />
              </Link>
            </li> 
            <li eventKey={2}>
              <Link to="/news">
                <FormattedMessage {...messages.news} />
              </Link>
            </li> 
            <li eventKey={3}>
              <Link to="/products">
                <FormattedMessage {...messages.products} />
              </Link>
            </li> 
            <li eventKey={3}>
              <Link to="/promos">
                <FormattedMessage {...messages.promo} />
              </Link>
            </li> 
            {
              localStorage.token == undefined ?
              <li eventKey={3}>
                <Link to="/contactus">
                  <FormattedMessage {...messages.contactus} />
                </Link>
              </li>  
              :  
              <li>
                <a onClick={this.signOut} ><FormattedMessage {...messages.signout} /></a>
              </li>  
            }       
            </Nav>
        </Navbar>       
      </div>
    );
  }
}

export default HeaderComponent;
