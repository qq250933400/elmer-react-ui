import React, { Component } from 'react';
import { BlueNavigator } from '../../src/index';

class Web extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.NavigatorData = [
            { title: 'Home', href: 'javascript:void(0);' },
            { title: 'CMS', href: 'javascript:void(0);' },
            { title: 'Shop', href: 'javascript:void(0);' },
            { title: 'Blog', href: 'javascript:void(0);' }
        ];
    }
    render () {
        return (
            <div>
                <BlueNavigator data={this.NavigatorData} />
            </div>
        );
    }
}

export default Web;
