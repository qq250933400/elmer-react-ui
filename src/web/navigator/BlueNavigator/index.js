import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
// import { PropTypes } from 'prop-types';
import styles from './style.scss';

class BlueNavigator extends Component {
    render () {
        const exClass = this.props.isFullScreen ? styles.BlueNavigatorFullScreen : '';
        return (
            <div className={classNames([styles.BlueNavigator, exClass])}>
                <div>
                    <ul>
                        <li><div><span>Home</span></div></li>
                        <li><div><span>Home</span></div></li>
                        <li><div><span>Home</span></div></li>
                        <li><div><span>Home</span></div></li>
                    </ul>
                </div>
            </div>
        );
    }
}

BlueNavigator.propTypes = {
    isFullScreen: PropTypes.bool.isRequired
};

BlueNavigator.defaultProps = {
    isFullScreen: true
};

export default BlueNavigator;
