import React, { Component } from 'react';
import Registry from 'libs/helpers/registry/Registry';
import Link from 'libs/components/links/Link';
import CreateLink from 'libs/components/links/CreateLink';
import DateHelper from 'libs/helpers/DateHelper';

export default class LinkViewPort extends Component {
  constructor(props) {
    super(props);
    this.cache = [];
    this.state = { links: [], data: [], selectedItem: null };
  }

  renderLink(startItem, endItem, link, key) {
    let startPosition = this.getItemPosition(startItem.index, startItem.item.end);
    let endPosition = this.getItemPosition(endItem.index, endItem.item.start);
    return (
      <Link
        key={key}
        item={link}
        start={{ x: startPosition.x, y: startPosition.y }}
        end={{ x: endPosition.x, y: endPosition.y }}
        isSelected={this.props.selectedItem == link}
        onSelectItem={this.props.onSelectItem}
      />
    );
  }

  getItemPosition = (index, date) => {
    let x = DateHelper.dateToPixel(date, 0, this.props.dayWidth);
    let y = index * this.props.itemheight + this.props.itemheight / 2;
    return { x: x, y: y };
  };

  renderLinks() {
    this.cache = [];
    let renderLinks = {};
    let startItem,
      endItem = {};
    if (this.state.data.length == 0) return;
    for (let i = 0; i < this.state.links.length; i++) {
      let link = this.state.links[i];
      if (!link) if (renderLinks[link.id]) continue;
      startItem = Registry.getTask(link.start);
      if (!startItem) {
        this.cache.push(null);
        continue;
      }
      endItem = Registry.getTask(link.end);
      if (!endItem) {
        this.cache.push(null);
        continue;
      }

      this.cache.push(this.renderLink(startItem, endItem, link, i));
      renderLinks[link.id] = '';
    }
  }

  refreshData() {
    if (
      this.props.links != this.state.links ||
      this.props.data != this.state.data ||
      this.props.dayWidth != this.state.dayWidth ||
      this.props.selectedItem != this.state.selectedItem
    ) {
      this.state.selectedItem = this.props.selectedItem;
      this.state.dayWidth = this.props.dayWidth;
      this.state.links = this.props.links;
      this.state.data = this.props.data;
      if (this.state.links && this.state.data) this.renderLinks();
    }
  }

  renderCreateLink = () => {
    if (this.props.interactiveMode) {
      let record = Registry.getTask(this.props.taskToCreate.task.id);
      let position = this.getItemPosition(record.index, record.item.end);
      return <CreateLink start={position} onFinishCreateLink={this.props.onFinishCreateLink} />;
    }
  };

  renderChangingTaskLinks = () => {
    if (this.props.changingTask != this.state.changingTask) {
      this.state.changingTask = this.props.changingTask;
      //Get Links from task
      let links = Registry.getLinks(this.state.changingTask.item.id);
      if (!links) return;
      let item = null;
      let startItem = null;
      let endItem = null;
      let startPosition = {};
      let endPosition = {};
      for (let i = 0; i < links.length; i++) {
        item = links[i];
        startItem = Registry.getTask(item.link.start);
        if (!startItem) continue;
        endItem = Registry.getTask(item.link.end);
        if (!endItem) continue;
        startPosition = this.getItemPosition(startItem.index, startItem.item.end);
        if (this.state.changingTask.item.id == item.link.start) startPosition.x = this.state.changingTask.position.end;
        endPosition = this.getItemPosition(endItem.index, endItem.item.start);
        if (this.state.changingTask.item.id == item.link.end) endPosition.x = this.state.changingTask.position.start;

        this.cache[item.index] = (
          <Link
            key={-i - 1}
            item={item}
            start={{ x: startPosition.x, y: startPosition.y }}
            end={{ x: endPosition.x, y: endPosition.y }}
            isSelected={this.props.selectedItem == item}
            onSelectItem={this.props.onSelectItem}
          />
        );
        this.cache = [...this.cache];
      }
    }
  };

  render() {
    this.refreshData();
    this.renderChangingTaskLinks();
    return (
      <svg x={0} y={0} width="100%" pointerEvents="none" style={{ position: 'absolute', top: 60, userSelect: 'none', height: '100%' }}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" strokeLinejoin="round" />
          </marker>
        </defs>
        <g transform={`matrix(1,0,0,1,${-(this.props.scrollLeft - this.props.nowposition)},${-this.props.scrollTop})`}>
          {this.cache}
          {this.renderCreateLink()}
        </g>
      </svg>
    );
  }
}
