import React, { Component } from 'react';
export default class ContentEditable extends Component<any, any> {
  private textInput = React.createRef<HTMLInputElement>()
  isFocus: boolean;
  
  constructor(props: any) {
    super(props);
    this.isFocus = false;
    this.state = {
      editing: false,
      value: this.props.value
    };
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.textInput.current && !this.isFocus) {
      this.textInput.current.focus();
      this.isFocus = true;
    }
  }

  onFocus = () => {
    this.setState({ editing: true });
  };

  onBlur = () => {
    this.finishEditing();
  };

  handleKey = (e: { keyCode: any; which: any; }) => {
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

  handleChange = (e: { target: { value: any; }; }) => {
    this.setState({ value: e.target.value });
  };

  renderDiv = () => {
    return (
      <div tabIndex={this.props.index} onClick={this.onFocus} onFocus={this.onFocus} style={{ width: '100%' }}>
        {' '}
        {this.state.value}
      </div>
    );
  };

  shouldComponentUpdate(nextProps: { value: any; }, nextState: any) {
    if (nextProps.value != this.props.value) {
      this.setState({value: nextProps.value})
    }
    return true;
  }

  renderEditor = () => {
    return (
      <input
        ref={this.textInput}
        onBlur={this.onBlur}
        style={{ width: '100%', outlineColor: 'black', outlineStyle: 'oinset' }}
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
