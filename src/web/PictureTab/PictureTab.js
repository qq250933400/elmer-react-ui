import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './style.scss';
import image1 from '../image/tourist/to12.jpg';
import image2 from '../image/tourist/to10.jpg';
import image3 from '../image/tourist/to9.jpg';
import image4 from '../image/tourist/to8.jpg';
import image5 from '../image/tourist/to5.jpg';
import image6 from '../image/tourist/to4.jpg';
import image7 from '../image/tourist/to2.jpg';
import image8 from '../image/tourist/to1.jpg';
class PictureTab extends Component {
    constructor (props) {
        super(props);
        this.state = {
            currentStep: 0
        };
        this.handleOnListItemClick = this.handleOnListItemClick.bind(this);
        this.handleOnHeaderClick = this.handleOnHeaderClick.bind(this);
        this.data = [
            {
                title: '旅游路线',
                data: [
                    { title: '水墨丹青凤凰城', url: '#', image: image1 },
                    { title: '水墨丹青凤凰城', url: '#', image: image2 },
                    { title: '水墨丹青凤凰城', url: '#', image: image3 },
                    { title: '水墨丹青凤凰城', url: '#', image: image4 }
                ]
            },
            {
                title: '泼墨山水',
                data: [
                    { title: '水墨丹青凤凰城', url: '#', image: image5 },
                    { title: '水墨丹青凤凰城', url: '#', image: image6 },
                    { title: '水墨丹青凤凰城', url: '#', image: image7 },
                    { title: '水墨丹青凤凰城', url: '#', image: image8 }
                ]
            }
        ];
    }
    handleOnListItemClick (index) {
        const curData = this.props.data[index];
        typeof this.props.onListItemClick === 'function' && this.props.onListItemClick(curData);
    }
    handleOnHeaderClick (index) {
        this.setState({
            currentStep: index
        });
    }
    render () {
        const { theme, data, fixSize, width, height } = this.props;
        const dataList = !data || data.length <= 0 ? this.data : data;
        const fixStyle = fixSize ? {
            width,
            height
        } : {};
        return (
            <div className={classNames([styles.PictureTab, theme])} style={fixStyle}>
                <div className={styles.PictureTabHead}>
                    <div>
                        {
                            dataList && dataList.map && dataList.map((itemData, index) => {
                                const activeClass = index === this.state.currentStep ? styles.active : '';
                                return (
                                    <span tabIndex="0" role="button" key={index}
                                        onClick={() => {
                                            this.handleOnHeaderClick(index);
                                        }}
                                        className={activeClass}
                                    ><i>{itemData.title}</i></span>
                                );
                            })
                        }
                    </div>
                    <a href="javascript:void(0);">更多<i>&gt;</i></a>
                </div>
                <div className={styles.PictureTabCt}>
                    {
                        dataList && dataList.map && dataList.map((itemData, index) => {
                            const activeClass = index === this.state.currentStep ? styles.active : '';
                            return (
                                <div className={classNames([styles.PictureTabPage, activeClass])} key={index}>
                                    <ul className={styles.PictureTabList} >
                                        {
                                            itemData.data && itemData.data.map && itemData.data.map((curData, key) => {
                                                return (
                                                    <li key={key}><a href="javascript:void(0);"><img src={curData.image} alt={curData.alt || 'none'} /><span>{curData.title}</span><i>点击查看</i></a></li>
                                                );
                                            })
                                        }
                                    </ul>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

PictureTab.propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    fixSize: PropTypes.bool,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    theme: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onListItemClick: PropTypes.func
};

PictureTab.defaultProps = {
    data: [],
    themeType: 'yellow',
    title: 'HomePageTitle',
    fixSize: false,
    height: 'auto',
    width: 'auto'
};

export default PictureTab;
