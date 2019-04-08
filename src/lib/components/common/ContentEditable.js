import React, { Component } from "react";
export default class ContentEditable extends Component {
  constructor(props) {
    super(props);
    this.isFocus = false;
    this.state = {
      editing: false,
      value: this.props.value
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.refs.textInput && !this.isFocus) {
      this.refs.textInput.focus();
      this.isFocus = true;
    }
  }

  onFocus = () => {
    this.setState({ editing: true });
  };

  onBlur = () => {
    this.finishEditing();
  };

  handleKey = e => {
    const keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      this.finishEditing();
    }
  };

  finishEditing = () => {
    this.isFocus = false;
    this.setState({ editing: false });
    if (this.props.onChange) this.props.onChange(this.state.value);
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  renderDiv = () => {
    return (
      <div
        tabIndex={this.props.index}
        onClick={this.onFocus}
        onFocus={this.onFocus}
        style={{ width: "100%" }}
      >
        {" "}
        {this.state.value}
      </div>
    );
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.value != this.props.value) {
      this.state.value = nextProps.value;
    }
    return true;
  }

  renderEditor = () => {
    return (
      <input
        ref="textInput"
        onBlur={this.onBlur}
        style={{ width: "100%", outlineColor: "black", outlineStyle: "oinset" }}
        type="text"
        name="name"
        value={this.state.value}
        onKeyUp={this.handleKey}
        onChange={this.handleChange}
      />
    );
  };

  render() {
    return this.state.editing ? this.renderEditor() : this.renderDiv();
  }
}
