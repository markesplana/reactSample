/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';

import axios from 'axios';

import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Carousel } from 'react-bootstrap';

import { baseUrl } from '../../config';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
/* eslint-disable react/prefer-stateless-function */

import messages from './messages';

export class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bannerHome: [],
      products: [],
      news: [],
      about: {},
      stores: []
    };
  }

  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }

    axios.get(baseUrl + '/stores/list')
    .then((response) => {
        console.log("Store LIST", response);
        this.setState({
          stores: response.data
        });
    })
    .catch(function (error) {
    console.log(error);
    })

    axios
    .get(`${baseUrl}/settings/list`)
    .then((response) => {
      console.log('about', response);
      this.setState({
        about: response.data
      })
    })


    axios.get(`${baseUrl}/news/list`).then(response => {
      this.setState({
        news: response.data,
      });
    });

    axios.get(`${baseUrl}/products/list`).then(response => {
      this.setState({
        products: response.data,
      });
    });

    axios
      .get(`${baseUrl}/banners/listhome`)
      .then(response => {
        console.log('Banner LIST', response);
        this.setState({
          bannerHome: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });

  }

  onChange = (a, b, c) => {
    console.log(a, b, c);
  };

  onProductDetails = id => {
    this.props.history.push(`/product/${id}`);
  };

  onNewsDetails = id => {
    this.props.history.push(`/news/${id}`);
  };


  render() {
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    const { bannerHome, news, about } = this.state;

    const productFeatured = this.state.products.slice(
      Math.max(this.state.products.length - 4, 1),
    );

    const latestNews = news.slice(
      Math.max(news.length - 3),
    );

    console.log("NEWS", about)
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
            {bannerHome.map((item, i) => (
              <Carousel.Item key={i}>
                <img
                  width="100%"
                  height={500}
                  alt={item.title}
                  src={`${baseUrl}/public/${item.img_url}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <br />
          <br />
          <hr />
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                  <h1>
                    <FormattedMessage {...messages.News} />
                  </h1>
                  {
                    latestNews.map((item, i) => (
                      <div className="media" key={i} onClick={() => {this.onNewsDetails(item.id)}} style={{cursor: "pointer"}}>
                        <div className="media-left">
                          <span>
                            <img className="media-object" width="90px" src={`${baseUrl}/public/${item.img_url}`} alt="..." />
                          </span>
                        </div>
                        <div className="media-body">
                          <h4 className="media-heading">{item.title}</h4>
                          <p className="ellipsis">
                              {item.description}
                          </p>
                        </div>
                      </div>
                    ))
                  }
              </div>
              <div className="col-md-6">
                  <h1>
                    <FormattedMessage {...messages.aboutus} />
                  </h1>
                    <div className="media" onClick={() => {this.props.history.push("/about")}} style={{cursor: "pointer"}}>
                      <div className="media-left">
                        <span>
                          <img className="media-object" width="90px" src={`${baseUrl}/public/${about.about_us_img}`} alt="..." />
                        </span>
                      </div>
                      <div className="media-body">
                        <h4 className="media-heading">{about.about_us_title}</h4>
                        <p className="ellipsis">
                            {about.about_us_description}
                        </p>
                      </div>
                    </div>
              </div>
            </div>
            <br />
            <hr />
            <div className="row text-center">
               <h1>
                  <FormattedMessage {...messages.product} />
              </h1>
              {productFeatured.map((item, index) => (
                <div className="col-xs-6 col-md-3" key={index}>
                  <a
                    onClick={() => {
                      this.onProductDetails(item.id);
                    }}
                    className="thumbnail"
                  >
                    <img width="180px" src={`${baseUrl}/public/${item.img_url}`} />
                  </a>
                    <small>{item.name}</small>
                </div>
              ))}
            </div>
            <br />
            <hr />
            <div className="row text-center">
               <h1>
                  <FormattedMessage {...messages.store} />
              </h1>
              {this.state.stores.map((item, index) => (
                <div className="col-xs-6 col-md-3" key={index}>
                  <a href={item.description} target="_blank">
                    <img width="180px" src={`${baseUrl}/public/${item.img_url}`} />
                  </a>
                  <br />
                  <small>{item.title}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
        <br />
        <br />
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
