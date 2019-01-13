import React, { Component } from "react";
import ReactDropZone from "react-dropzone";

class ImageDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  onPreviewDrop = (files) => {
    this.setState({
      files: this.state.files.concat(files),
     });
  }

  onDrop(files) {
    this.setState({files});
  }

  onCancel() {
    this.setState({
      files: []
    });
  }

  render() {
    const previewStyle = {
      display: 'inline',
      width: 100,
      height: 100,
    };
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ))
    return (
      <section style={{color: "black"}}>
      <ReactDropZone
        onDrop={this.onDrop.bind(this)}
        onFileDialogCancel={this.onCancel.bind(this)}
      >
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
              <p>Drop files here, or click to select files</p>
          </div>
        )}
      </ReactDropZone>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
    );
  }
}

export default ImageDrop;