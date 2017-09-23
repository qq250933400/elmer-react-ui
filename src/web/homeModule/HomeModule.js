import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './style.scss';
import img from '../image/mj1.jpg';

class HomeModule extends Component {
    constructor (props) {
        super(props);
        this.handleOnListItemClick = this.handleOnListItemClick.bind(this);
    }
    handleOnListItemClick (index) {
        const curData = this.props.data[index];
        typeof this.props.onListItemClick === 'function' && this.props.onListItemClick(curData);
    }
    render () {
        const { themeType, data } = this.props;
        const themes = {
            'yellow': styles.HomeModuleYellowTheme,
            'yellowDetail': styles.HomeModuleYellowDetailTheme,
            'defaultDetail': styles.HomeModuleYellowDetailTheme,
            'blue': styles.HomeModuleBlueTheme,
            'blueDetail': styles.HomeModuleBlueDetailTheme
        };
        const themeClass = themes[themeType] || styles.HomeDefaultTheme;

        return (
            <div className={classNames([styles.HomeModule, themeClass])}>
                <div className={styles.HomeMoudleHeader}>
                    <span>{this.props.title}</span>
                    <a href="javascript:void(0);" onClick={this.props.onMoreClick}>{this.props.moreTitle}&gt;&gt;</a>
                </div>
                <div className={styles.HomeMoudleContext}>
                    <ul>
                        {
                            data && data.map && data.map((item, index) => {
                                const imageCode = index === 0 ? <img alt="none" src={item.image} /> : '';
                                return (
                                    <li key={index} onClick={() => {
                                        this.handleOnListItemClick(index);
                                    }}
                                    >
                                        <a>
                                            {imageCode}
                                            <div>
                                                <span>{item.title}</span>
                                                <i>{item.date}</i>
                                            </div>
                                        </a>
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

HomeModule.propTypes = {
    data: PropTypes.array.isRequired,
    moreTitle: PropTypes.string.isRequired,
    themeType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onListItemClick: PropTypes.func,
    onMoreClick: PropTypes.func
};

HomeModule.defaultProps = {
    data: [],
    themeType: 'yellow',
    title: 'HomePageTitle',
    moreTitle: '更多'
};

export default HomeModule;
