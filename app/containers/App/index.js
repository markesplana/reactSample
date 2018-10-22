/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import AboutPage from 'containers/AboutPage/Loadable';
import ProductPage from 'containers/ProductPage/Loadable';
import PromoPage from 'containers/PromoPage/Loadable';
import ContactPage from 'containers/ContactPage/Loadable';
import ProductDetailsPage from 'containers/ProductDetailsPage/Loadable';
import NewsDetailsPage from 'containers/NewsDetailsPage/Loadable';
import NewsPage from 'containers/NewsPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';

//ADMIN
import AdminPage from 'containers/AdminPage/Loadable';
import AdminProductPage from 'containers/AdminPage/ProductPage/Loadable'
import AdminPromoPage from 'containers/AdminPage/PromoPage/Loadable'
import AdminProductDetailsPage from 'containers/AdminPage/ProductPage/ProductDetailsPage/Loadable'
import AddProductPage from 'containers/AdminPage/ProductPage/AddProductPage/Loadable'
import EditPromoPage from 'containers/AdminPage/PromoPage/EditPromoPage/Loadable'

import EditProductPage from 'containers/AdminPage/ProductPage/EditProductPage/Loadable'
import AddPromoPage from 'containers/AdminPage/PromoPage/AddPromoPage/Loadable'
import PromoDetailsPage from 'containers/PromoDetailsPage/Loadable'
import AdminPromoDetailsPage from 'containers/AdminPage/PromoPage/PromoDetailsPage/Loadable'
import AddHomeBanner from 'containers/AdminPage/AddHomeBanner/Loadable'
import AddProductBanner from 'containers/AdminPage/AddProductBanner/Loadable'
import AddStore from 'containers/AdminPage/AddStore/Loadable'


import AdminNewsPage from 'containers/AdminPage/NewsPage/Loadable'
import AdminAboutPage from 'containers/AdminPage/AboutPage/Loadable'
import AddNewsPage from 'containers/AdminPage/NewsPage/AddNewsPage/Loadable'
import EditNewsPage from 'containers/AdminPage/NewsPage/EditNewsPage/Loadable'

import AdminEditAboutPage from 'containers/AdminPage/AboutPage/EditAboutPage/Loadable'
import ChangeLogo from 'containers/AdminPage/ChangeLogo/Loadable'

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import HeaderComponent from 'components/Header';
import localStorage from "localStorage";
import LocaleToggle from '../LocaleToggle';

import { List } from 'antd'

import { Link } from 'react-router-dom';

import { Input } from 'antd';
const Search = Input.Search;

import axios from 'axios';
import { baseUrl } from '../../config'

import 'antd/dist/antd.css'; 
import "react-table/react-table.css";
import 'react-quill/dist/quill.snow.css';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      search: false,
      products: [],
    }
  }

  productDetails = (id) => {
    this.props.history.push(`/product/${id}`)
  }

  onSearch = (value) => {
    axios.get(`${baseUrl}/products/list?search=${value}`)
    .then((response) => {
      this.setState({
        search: true,
        products: response.data
      })
      console.log("response", response)
    })
  }

  onHide = () => {
    console.log("onHide ====>")
    this.setState({
      search: false
    })
  }

  render() {
    return(
      <div>
      <div className="row">
          <div className="col-md-6">
          <Search
              placeholder="Search Products"
              style={{ width: 300 }}
              onSearch={value => { this.onSearch(value) }}
              enterButton
            />
          </div>
          <div className="col-md-6">
            <LocaleToggle />
          </div>
        </div>
      <HeaderComponent onHide={this.onHide} />
      {
        this.state.search ?
        <div className="container">
          {
            this.state.products.length == 0 ? 
            <div className="text-center">
              <p>No result</p>
            </div>
            :

          <List
            itemLayout="vertical"
            size="small"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 10,
            }}
            dataSource={this.state.products}
            renderItem={item => (
              <List.Item
                key={item.id}
              >
              <Link onClick={() => { this.setState({ search: false }) }} class="media" to={`/product/${item.id}`} style={{ cursor: "pointer" }}>
                <div className="media-left">
                  <span>
                    <img width={170} alt="logo" src={`${baseUrl}/public/${item.img_url}`} />
                  </span>
                </div>
                <div className="media-body">
                  <h4 className="media-heading">{item.name}</h4>
                  <small>{item.description}</small>
                </div>
              </Link>
              </List.Item>
            )}
          />
          }
        </div>  
        :
        <div>
          {
            localStorage.token == undefined ?
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/promos" component={PromoPage} />
              <Route path="/products" component={ProductPage} />
              <Route path="/news" component={NewsPage} />
              <Route path="/contactus" component={ContactPage} />
              <Route path="/product/:id" component={ProductDetailsPage} />
              <Route path="/promo/:id" component={PromoDetailsPage} />
              <Route path="/news/:id" component={NewsDetailsPage} />
              <Route path="/admin" component={LoginPage} /> 
              <Route path="" component={NotFoundPage} />
            </Switch>
            :
            <Switch>
              <Route exact path="/" component={AdminPage} />
              <Route path="/admin" component={AdminPage} />
              <Route path="/products" component={AdminProductPage} />
              <Route path="/product/:id" component={AdminProductDetailsPage} />
              <Route path="/addproduct" component={AddProductPage} />
              <Route path="/promos" component={AdminPromoPage} />
              <Route path="/addpromo" component={AddPromoPage} />
              <Route path="/promo/:id" component={AdminPromoDetailsPage} />
              <Route path="/news" component={AdminNewsPage} />
              <Route path="/addnews" component={AddNewsPage} />
              <Route path="/editnews/:id" component={EditNewsPage} />
              <Route path="/addhomebanner" component={AddHomeBanner} />
              <Route path="/addproductbanner" component={AddProductBanner} />
              <Route path="/editproduct/:id" component={EditProductPage} />
              <Route path="/editpromo/:id" component={EditPromoPage} />
              <Route path="/changelogo" component={ChangeLogo} />
              <Route path="/about" component={AdminAboutPage} />
              <Route path="/editabout" component={AdminEditAboutPage} />
              <Route path="/addstore" component={AddStore} />
              <Route path="" component={NotFoundPage} />
            </Switch>
          }
      </div>
      }
      
    </div>
    )
  }
}

export default App