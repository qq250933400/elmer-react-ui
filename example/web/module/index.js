import React, { Component } from 'react';
import { action } from '@storybook/addon-actions';
import { HomeModule } from '../../../src/index';
import img from '../../../src/web/image/mj1.jpg';
class HomeModuleExample extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.NavigatorData = [
            { title: 'this is the test message or description', image: img, href: 'javascript:void(0);', date: '2017-02-03' },
            { title: '中国内，感觉感觉感觉感觉感觉感觉感觉感觉感觉感觉感觉', href: 'javascript:void(0);', date: '2017-02-03' },
            { title: '介推介推介推介推介推介推介推介推', href: 'javascript:void(0);', date: '2017-02-03' },
            { title: '介推介推介推介推介推介推介推介推', href: 'javascript:void(0);', date: '2017-02-03' },
            { title: '介推介推介推介推介推介推介推介推', href: 'javascript:void(0);', date: '2017-02-03' },
            { title: '介推介推介推介推介推介推介推介推', href: 'javascript:void(0);', date: '2017-02-03' },
            { title: '介推介推介推介推介推介推介推介推', href: 'javascript:void(0);', date: '2017-02-03' },
            { title: '介推介推介推介推介推介推介推介推', href: 'javascript:void(0);', date: '2017-02-03' }
        ];
        this.handleOnListItemClick = this.handleOnListItemClick.bind(this);
    }
    handleOnListItemClick (data) {
        action("onListItemClick", data);
        console.log(data, '---->module example clickEvent');
    }
    render () {
        return (
            <div>
                <div style={{ display: 'inline-block', width: 300 }}><HomeModule title="测试" data={this.NavigatorData} onListItemClick={this.handleOnListItemClick} /></div>
                <div style={{ display: 'inline-block', width: 300, marginLeft: 10 }}><HomeModule title="测试" themeType="blue" data={this.NavigatorData} onListItemClick={this.handleOnListItemClick} /></div>
                <div>
                    <div style={{ display: 'inline-block', width: 300, marginTop: 10 }}><HomeModule title="测试" themeType="defaultDetail" data={this.NavigatorData} onListItemClick={this.handleOnListItemClick} /></div>
                    <div style={{ display: 'inline-block', width: 300, marginLeft: 10, marginTop: 10 }}><HomeModule title="测试" themeType="blueDetail" data={this.NavigatorData} onListItemClick={this.handleOnListItemClick} /></div>
                </div>
            </div>
        );
    }
}

export default HomeModuleExample;
