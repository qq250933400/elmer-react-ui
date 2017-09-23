import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './style.scss';

class NoneModule extends Component {
    constructor (props) {
        super(props);
        this.handleOnListItemClick = this.handleOnListItemClick.bind(this);
    }
    handleOnListItemClick (index) {
        const curData = this.props.data[index];
        typeof this.props.onListItemClick === 'function' && this.props.onListItemClick(curData);
    }
    render () {
        const { theme, data, fixSize, width, height } = this.props;
        const fixStyle = fixSize ? {
            width,
            height
        } : {};

        return (
            <div className={classNames([styles.NoneModule, theme])} style={fixStyle}>
                <div className={styles.NoneModuleHeader}>
                    <span>{this.props.title}</span>
                </div>
                <div className={styles.NoneModuleContext}>
                    <ul>
                        {
                            data && data.map && data.map((item, index) => {
                                return (
                                    <li key={index} onClick={() => {
                                        this.handleOnListItemClick(index);
                                    }}
                                    >
                                        <a href="javascrip:void(0);"><span>{item.title}</span></a>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

NoneModule.propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    fixSize: PropTypes.bool,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    theme: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onListItemClick: PropTypes.func
};

NoneModule.defaultProps = {
    data: [],
    themeType: 'yellow',
    title: 'HomePageTitle',
    fixSize: false,
    height: 'auto',
    width: 'auto'
};

export default NoneModule;
