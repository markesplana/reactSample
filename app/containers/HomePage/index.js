/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

import { Carousel } from 'react-bootstrap';

import axios from 'axios'
import { baseUrl } from '../../config'
/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      bannerHome: [],
      products: []
    }
  }

  componentDidMount(){
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }

    axios.get(baseUrl + '/products/list')
    .then((response) => {
        this.setState({
            products: response.data
        });
    })
    
    axios.get(baseUrl + '/banners/listhome')
    .then((response) => {
        console.log("Banner LIST", response);
        this.setState({
          bannerHome: response.data
        });
    })
    .catch(function (error) {
    console.log(error);
    })

  }


  onChange = (a, b, c) => {
    console.log(a, b, c);
  }

  onProductDetails = (id) => {
    this.props.history(`/product/${id}`)
  }

  render() {
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    const { bannerHome } = this.state

    const productFeatured = this.state.products.slice(Math.max(this.state.products.length - 4, 1))


    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div>

        <Carousel>
          {
            bannerHome.map((item, i) => (
              <Carousel.Item key={i}>
              <img width="100%" height={500} alt={item.title} src={`${baseUrl}/public/${item.img_url}`} />
            </Carousel.Item>
            ))
          }
        </Carousel>
        <div className="container">
          <div className="row text-center">
            <h1>Products</h1>
            {
              productFeatured.map((item, index) => (
                <div className="col-xs-6 col-md-3" key={index}>
                  <a onClick={() => {this.onProductDetails(item.id)}} className="thumbnail">
                    <img
                      src={`${baseUrl}/public/${item.img_url}`}
                      alt="..."
                    />
                  </a>
                </div>
              ))
            }
          </div>
        </div>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
