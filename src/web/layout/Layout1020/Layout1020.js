import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

class Layout1020 extends Component {
    render () {
        return (
            <div className={styles.Layout1020}>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Layout1020.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.element,
        PropTypes.node
    ])
};

export default Layout1020;
