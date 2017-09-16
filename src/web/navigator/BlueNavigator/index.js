import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
// import { PropTypes } from 'prop-types';
import styles from './style.scss';

class BlueNavigator extends Component {
    constructor (props) {
        super(props);
        this.state = {
            currentMenuIndex: 0
        };
    }
    handleOnClick (index) {
        const curData = this.props.data[index];
        this.setState({
            currentMenuIndex: index
        });
        this.props.onChange && this.props.onChange(curData);
    }
    render () {
        const exClass = this.props.isFullScreen ? styles.BlueNavigatorFullScreen : '';
        return (
            <div className={classNames([styles.BlueNavigator, exClass])}>
                <div>
                    <ul ref={(self) => {
                        this.listRender = self;
                    }}
                    >
                        {
                            this.props.data && this.props.data.map && this.props.data.map((item, index) => {
                                if (index < 8) {
                                    const selClass = this.state.currentMenuIndex === index ? styles.active : '';
                                    return (
                                        <li className={selClass} key={index}
                                            onClick={() => {
                                                this.handleOnClick(index);
                                            }}
                                        ><div><span>{item.title}</span></div></li>
                                    );
                                }
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

BlueNavigator.propTypes = {
    data: PropTypes.array.isRequired,
    isFullScreen: PropTypes.bool.isRequired,
    onChange: PropTypes.func
};

BlueNavigator.defaultProps = {
    isFullScreen: true,
    data: []
};

export default BlueNavigator;
