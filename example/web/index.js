import React, { Component } from 'react';
import { BlueNavigator } from '../../src/index';

class Web extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render () {
        return (
            <div>
                <BlueNavigator />
            </div>
        );
    }
}

export default Web;
