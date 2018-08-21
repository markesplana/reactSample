/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Upload, Icon, message } from 'antd';

import messages from './messages';

import { baseUrl } from '../../config'

function getBase64(img, callback) {
    console.log("imge", img, callback)
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    // const isJPG = file.type === 'image/jpeg';
    // const isPNG = file.type === 'image/png';
    // if (!isJPG || !isPNG) {
    //   message.error('You can only upload JPG file!');
    // }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isLt2M;
  }

export default class UploadLogo extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      imageUrl: "",
    }
  }
  // eslint-disable-line react/prefer-stateless-function
  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  // handleChange = (info) => {
  //   getBase64(info.file.originFileObj, imageUrl => this.setState({
  //     imageUrl,
  //     loading: false,
  //   }));
  // }

  handleChange = (info) => {
    this.setState({
      productOtherImageFile: info.file
    })
    if (info.file && info.fileList[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
          this.setState({
            imageUrl: e.target.result
          });
      };
      reader.readAsDataURL(info.file.originFileObj);
    }  
  }

  render() {
    const { imageUrl } = this.state
    const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
    console.log("imageUrl", imageUrl) 
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
          <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
                action=""
                showUploadList={false}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
            </Upload>
          </div>
        </div>
      </div>
    );
  }
}
