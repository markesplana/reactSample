import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import localStorage from 'localStorage';
import messages from './messages';

import axios from 'axios';
import { baseUrl } from '../../config'

class HeaderComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      logoUrl: ""
    }
  }

  componentDidMount(){
    axios.get(baseUrl + '/settings/list')
    .then((response) => {
        console.log("Banner LIST", response);
        this.setState({
          logoUrl: response.data.logo_url
        })
    })
    .catch(function (error) {
    console.log(error);
    })
  }

  signOut = () => {
    localStorage.removeItem("token");
    location.reload()
    this.props.history.push('/');
  }

  render() {
    const { logoUrl } = this.state
    const { onHide } = this.props
    console.log("HEADER", this.props)
    return (
      <div>
        <Navbar style={{ height: 65 }}>
          <Navbar.Header>
            <Navbar.Brand>
              <Link onClick={() => { onHide() }} to="/">
                <img src={`${baseUrl}/public/${logoUrl}`} width="75px"/>
              </Link>
            </Navbar.Brand>
          </Navbar.Header>
            <Nav pullRight>
              <li eventKey={1}>
              <Link onClick={() => { onHide() }} to="/">
                <FormattedMessage {...messages.home} />
              </Link>
            </li>  
            <li eventKey={2}>
              <Link to="/about" onClick={() => { onHide() }}>
                <FormattedMessage {...messages.aboutus} />
              </Link>
            </li> 
            <li eventKey={3}>
              <Link to="/news" onClick={() => { onHide() }}>
                <FormattedMessage {...messages.news} />
              </Link>
            </li> 
            <li eventKey={4}>
              <Link to="/products" onClick={() => { onHide() }}>
                <FormattedMessage {...messages.products} />
              </Link>
            </li> 
            <li eventKey={5}>
              <Link to="/promos" onClick={() => { onHide() }}>
                <FormattedMessage {...messages.promo} />
              </Link>
            </li> 
            {
              localStorage.token == undefined ?
              <li eventKey={6}>
                <Link to="/contactus" onClick={() => { onHide() }}>
                  <FormattedMessage {...messages.contactus} />
                </Link>
              </li>  
              :  
              <li key={7}>
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
