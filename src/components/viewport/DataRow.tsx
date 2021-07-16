import React from "react";
import { Component } from "react";
import Config from '../../helpers/config/Config';

export default class DataRow extends Component<any, any> {
    constructor(props: {} | Readonly<{}>) {
      super(props);
    }
    render() {
      return (
        <div
          className="timeLine-main-data-row"
          style={{ ...Config.values.dataViewPort.rows.style, top: this.props.top, height: this.props.itemheight }}
        >
          {this.props.children}
        </div>
      );
    }
  }
  