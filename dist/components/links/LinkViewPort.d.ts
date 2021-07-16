import React, { Component } from 'react';
export default class LinkViewPort extends Component<any, any> {
    cache: any[];
    constructor(props: any);
    renderLink(startItem: {
        index: any;
        item: {
            end: any;
        };
    }, endItem: {
        index?: any;
        item?: any;
    }, link: any, key: React.Key | null | undefined): JSX.Element;
    getItemPosition: (index: number, date: any) => {
        x: number;
        y: number;
    };
    renderLinks(): void;
    refreshData(): void;
    renderCreateLink: () => JSX.Element | undefined;
    renderChangingTaskLinks: () => void;
    render(): JSX.Element;
}
