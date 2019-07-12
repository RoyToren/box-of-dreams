import React, { Component } from "react";
import ReactDropZone from "react-dropzone";


const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const baseStyle = {
  width: 200,
  height: 200,
  borderWidth: 2,
  borderColor: '#666',
  borderStyle: 'dashed',
  borderRadius: 5
};
const activeStyle = {
  borderStyle: 'solid',
  borderColor: '#6c6',
  backgroundColor: '#eee'
};
const rejectStyle = {
  borderStyle: 'solid',
  borderColor: '#c66',
  backgroundColor: '#eee'
};
class ImageDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  onDrop(files) {
    this.setState({
      files: files.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))
    });
    this.props.onChange(files);
  }

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview))
  }

  render() {
    const thumbs = this.state.files.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            alt={'תמונת חלום'}
          />
        </div>
      </div>
    ));

    
    return (
      <section style={{color: "black"}}>
      <ReactDropZone
        accept="image/*"
        onDrop={this.onDrop.bind(this)}>
        {({getRootProps, getInputProps, isDragActive,
         isDragAccept, isDragReject }) => {
          let styles = {...baseStyle};
          styles = isDragActive ? {...styles, ...activeStyle} : styles;
          styles = isDragReject ? {...styles, ...rejectStyle} : styles;
      return (
          <div {...getRootProps()}
          style={styles}>
            <input {...getInputProps()} />
            <div>
          {isDragAccept ? 'הנח' : 'גרור'} תמונה לכאן
        </div>
        {isDragReject && <div>סוג הקובץ אינו נתמך</div>}
        <aside style={thumbsContainer}>
          {thumbs}
        </aside>
          </div>
        )}}
      </ReactDropZone>
    </section>
    );
  }
}

export default ImageDrop;