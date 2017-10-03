import React, { Component } from 'react';
import { action } from '@storybook/addon-actions';
import { Tags3D } from '../../../src/index';

class Tags3DExample extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.NavigatorData = [
            { title: 'description', href: 'javascript:void(0);'},
            { title: '中国内', href: 'javascript:void(0);'},
            { title: '介推介推介', href: 'javascript:void(0);'},
            { title: '介推介推介', href: 'javascript:void(0);'},
            { title: '介推介', href: 'javascript:void(0);'},
            { title: '介推介推', href: 'javascript:void(0);'},
            { title: '介推介推介', href: 'javascript:void(0);'},
            { title: '介推介推介', href: 'javascript:void(0);'},
            { title: '介推介', href: 'javascript:void(0);'},
            { title: '介推介推', href: 'javascript:void(0);'},
            { title: '介推介推介', href: 'javascript:void(0);'},
            { title: '介推介推介', href: 'javascript:void(0);'},
            { title: '介推介', href: 'javascript:void(0);'},
            { title: '介推介推', href: 'javascript:void(0);'},
            { title: '介推介推介', href: 'javascript:void(0);'},
            { title: '介推介推介', href: 'javascript:void(0);'},
            { title: '介推介', href: 'javascript:void(0);'},
            { title: '介推介推', href: 'javascript:void(0);'},
            { title: '介推介推介', href: 'javascript:void(0);'},
            { title: '介推介推介', href: 'javascript:void(0);'}
        ];
        this.handleOnListItemClick = this.handleOnListItemClick.bind(this);
    }
    handleOnListItemClick (data) {
        action("onListItemClick", data);
        console.log(data, '---->module example clickEvent');
    }
    render () {
        return (
            <div style={{ display: 'inline-block', width: 300 }}>
                <Tags3D data={this.NavigatorData} onListItemClick={this.handleOnListItemClick} />
            </div>
        );
    }
}

export default Tags3DExample;
