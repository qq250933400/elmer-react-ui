import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

class Layout1020 extends Component {
    render () {
        return (
            <div className={styles.Layout1020} style={{
                background: this.props.background
            }}
            >
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Layout1020.propTypes = {
    background: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.element,
        PropTypes.node
    ])
};

Layout1020.defaultProps = {
    background: 'transparent'
};

export default Layout1020;
