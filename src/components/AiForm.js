import React, { useEffect, useState } from 'react';


class AiForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileInput = this.handleFileInput.bind(this);
    this.fileInput = React.createRef();

  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleFileInput(event) {
    // const file = this.fileInput.current.files[0];
    const file = this.fileInput.current.files[0];
    if (file.size > 1000000) {
      this.props.onFileSelectError({ error: "File is too big"});
    }
    this.props.onFileSelectSuccess(file);
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(
      `Selected file - ${this.fileInput.current.files[0].name}`
    );
    this.props.onFileSelectSuccess(this.fileInput.current.files[0]);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} onChange={this.handleFileInput} accept="image/png, image/jpeg" />
        </label>
        <br />
        <button type="submit">Submit</button>

      </form>
    );
  }
}

export default AiForm;