import { Box } from "grommet";
import React, { Component } from "react";
import Config from "../../helpers/config/Config";
import ContentEditable from "../common/ContentEditable";

export class TaskRow extends Component<any, any> {
    constructor(props: any) {
      super(props);
    }
  
    onChange = (value: any) => {
      if (this.props.onUpdateTask) {
        this.props.onUpdateTask(this.props.item, { name: value });
      }
    };
  
    render() {
      return (
        <Box
            direction="row"
            align="center"
          style={{
            ...Config.values.taskList.task.style,
            top: this.props.top,
            height: this.props.itemheight + 5
          }}
          onClick={(e) => this.props.onSelectItem(this.props.item)}
        >
       
        <div className="color-dot" style={{
            width: 12, 
            height: 12, 
            borderRadius: 12, 
            marginRight: 8,
            background: this.props.item.color 
        }} />
  
          {this.props.nonEditable ? (
            <Box tabIndex={this.props.index} >
              {this.props.label}
            </Box>
          ) : (
            <ContentEditable value={this.props.label} index={this.props.index} onChange={this.onChange} />
          )}
        </Box>
      );
    }
  }
  