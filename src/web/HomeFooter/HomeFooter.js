import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layout1020 from '../layout/Layout1020/Layout1020';
import styles from './style.scss';

class HomeFooter extends Component {
    render () {
        return (
            <div className={styles.HomeFooter}>
                <Layout1020>
                    {this.props.children}
                </Layout1020>
            </div>
        );
    }
}

HomeFooter.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.element,
        PropTypes.node
    ])
};

HomeFooter.defaultProps = {
    background: 'transparent'
};

export default HomeFooter;
