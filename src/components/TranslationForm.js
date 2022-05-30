import React, { useEffect, useState } from 'react';


class TranslationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value:"Insert text here"};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="tform">
        <label>
          Upload file:
          <textarea value={this.state.value} onChange={this.handleChange} className="tform__txtarea"/>
        </label>
        
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}

export default TranslationForm;