import React from "react";
import Dropzone from "react-dropzone";
import * as fileService from "../services/fileupload.service";

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: {},
      signedUrl: {},
      upload: false,
      originalMsg: (
        <span>
          <strong>Click or drop files here to upload...</strong>
        </span>
      ),
      statusMsg: ""
    };
    this._onDrop = this._onDrop.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
    this.signedUrl = null;
  }

  _onDrop(files) {
    console.log(files);
    var file = files[0];
    fileService.sign(file).then(signedUrl => {
      this.setState({
        signedUrl,
        files: file,
        upload: true,
        originalMsg: null
      });
    });
  }

  uploadPhoto() {
    this.setState({
      statusMsg: <strong>Uploading...</strong>
    });
    window.setTimeout(() => {
      this.setState({ statusMsg: null });
    }, 600);
    fileService.save(this.state.signedUrl, this.state.files).then(response => {
      debugger;
      let urls = response.config.url.split("?");
      let url = urls[0];
      let event = {
        target: {
          value: url,
          name: this.props.name
        }
      };
      this.props.onUpload(event);
    });
  }

  render() {
    let originalMsg = this.state.originalMsg;
    let statusMsg = this.state.statusMsg;
    const dropzoneStyle = {
      width: "100%",
      height: "20%",
      border: "1px inset black"
    };

    return (
      <div>
        <Dropzone
          style={dropzoneStyle}
          accept="image/*"
          multiple={false}
          onDrop={this._onDrop}
          type="file"
        >
          <p>{statusMsg}</p>
          <p>{originalMsg}</p>

          <p>{this.state.files.name}</p>
        </Dropzone>
        <button
          className="btn btn-default btn-sm pull-right"
          type="button"
          onClick={this.uploadPhoto}
          disabled={!this.state.upload}
        >
          Upload
        </button>
      </div>
    );
  }
}

export default FileUpload;
