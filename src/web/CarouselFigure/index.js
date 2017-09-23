import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

class CarouselFigure extends Component {
    constructor (props) {
        super(props);
        this.state = {
            itemHeight: 0,
            isSupportCss3: this.supportCss3('transform')
        };
        this.currentIndex = 0;
        this.isAnimation = false;
        this.timeCount = true;
        this.setImageContainerSize = this.setImageContainerSize.bind(this);
        this.handleImageLoadCompleted = this.handleImageLoadCompleted.bind(this);
        this.handleOnNextClick = this.handleOnNextClick.bind(this);
        this.handleOnPrevClick = this.handleOnPrevClick.bind(this);
        this.handleOnFocusClick = this.handleOnFocusClick.bind(this);
        this.handleOnContainerMouseIn = this.handleOnContainerMouseIn.bind(this);
        this.handleonContainerMouseOut = this.handleonContainerMouseOut.bind(this);
        this.setCss3 = this.setCss3.bind(this);
        this.toNextItem = this.toNextItem.bind(this);
        this.timeTick = this.timeTick.bind(this);
    }
    componentDidMount () {
        this.setImageContainerSize();
        this.isRender = true;
        this.timeTick();
    }
    componentDidUpdate () {
        this.setImageContainerSize();
        this.isRender = true;
    }
    componentWillUnmount () {
        this.isRender = false;
    }
    handleOnContainerMouseIn () {
        this.timeCount = false;
        this.mouseIn = true;
    }
    handleonContainerMouseOut () {
        this.timeCount = true;
        this.mouseIn = false;
    }
    timeTick () {
        const { timeOut } = this.props;
        let curTime = 0;
        const next = () => {
            const { currentIndex } = this;
            const { data } = this.props;
            const nextIndex = currentIndex < data.length - 1 ? currentIndex + 1 : 0;
            this.toNextItem(nextIndex, true);
        };
        const tim = () => {
            if (this.timeCount && this.isRender) {
                curTime++;
                if (curTime >= timeOut) {
                    this.timeCount = false;
                    curTime = 0;
                    next();
                }
            } else {
                curTime = 0;
            }
            setTimeout(tim, 1000);
        };
        tim();
    }
    setCss3 (sender, property, value) {
        if (Object.prototype.toString.call(property) === '[object String]' && property.length > 0 && sender) {
            const exArr = property.match(/_([a-zA-Z0-9])/g);
            let newProperty = property;
            if (exArr && exArr.length > 0) {
                exArr.map((splitCode) => {
                    newProperty = newProperty.replace(splitCode, splitCode.replace('_', '').toUpperCase());
                });
            }
            const mProperty = [newProperty.substr(0, 1).toUpperCase(), newProperty.substr(1)].join('');
            const webkitProperty = ['webkit', mProperty].join('');
            const mozProperty = ['moz', mProperty].join('');
            const msProperty = ['ms', mProperty].join('');
            const oProperty = ['o', mProperty].join('');
            if (sender.style[newProperty] !== undefined) {
                sender.style[newProperty] = value;
            } else if (sender.style[webkitProperty] !== undefined) {
                sender.style[webkitProperty] = value;
            } else if (sender.style[mozProperty] !== undefined) {
                sender.style[mozProperty] = value;
            } else if (sender.style[msProperty] !== undefined) {
                sender.style[msProperty] = value;
            } else if (sender.style[oProperty] !== undefined) {
                sender.style[oProperty] = value;
            }
        }
    }
    initImageItemPosition () {
        if (this.ImageList) {
            const { currentIndex } = this;
            for (let i = 0; i < this.ImageList.children.length; i++) {
                const tmpItem = this.ImageList.children[i];
                if (i !== currentIndex) {
                    if (this.state.isSupportCss3) {
                        this.setCss3(tmpItem, 'transform', 'translateX(100%)');
                    } else {
                        this.setCss3(tmpItem, 'left', '100%');
                    }
                } else {
                    if (this.state.isSupportCss3) {
                        this.setCss3(tmpItem, 'transform', 'translateX(0%)');
                    } else {
                        this.setCss3(tmpItem, 'left', '0%)');
                    }
                }
            }
        }
    }
    setImageContainerSize () {
        if (this.ImageList) {
            let initHeight = 0;
            for (const image of this.ImageList.children) {
                const tmpImage = image.querySelectorAll('img')[0];
                const tmpHeight = tmpImage ? tmpImage.clientHeight : image.clientHeight;
                initHeight = initHeight < tmpHeight ? tmpHeight : initHeight;
            }
            if (initHeight > 0) {
                if (initHeight !== this.state.itemHeight) {
                    this.setState({
                        itemHeight: initHeight
                    });
                }
            }
            this.initImageItemPosition();
        }
    }
    handleImageLoadCompleted () {
        this.setImageContainerSize();
    }
    renderItem () {
        const { data, fixSize } = this.props;
        const { currentIndex } = this;
        let ImageItems = [];
        let BtnItems = [];
        const ItemStyle = {
            height: `${this.state.itemHeight}px`
        };
        if (fixSize) {
            ItemStyle.height = this.props.height;
            ItemStyle.width = this.props.width;
        }
        data && data.map && data.map((curData, index) => {
            const activeClassName = index === currentIndex ? styles.active : '';
            const btn = (
                <li className={activeClassName} key={index}
                    onClick={() => {
                        this.handleOnFocusClick(index);
                    }}
                ><i>{index}</i></li>
            );
            const ImageItem = (
                <li key={index} style={ItemStyle}>
                    <div style={ItemStyle}><img src={curData.image} onLoad={this.handleImageLoadCompleted.bind(this)} /></div>
                </li>
            );
            BtnItems.push(btn);
            ImageItems.push(ImageItem);
        });
        return {
            BtnItems,
            ImageItems,
            ItemStyle
        };
    }
    supportCss3 (style) {
        const prefix = ['webkit', 'Moz', 'ms', 'o'];
        const humpString = [];
        const htmlStyle = document.documentElement.style;
        const _toHumb = (string) => {
            return string.replace(/-(\w)/g, ($0, $1) => {
                return $1.toUpperCase();
            });
        };

        for (const i in prefix) {
            humpString.push(_toHumb(prefix[i] + '-' + style));
        }
        humpString.push(_toHumb(style));
        for (const key in humpString) {
            if (humpString[key] in htmlStyle) {
                return true;
            }
        }
        return false;
    }
    handleOnFocusClick (index) {
        const { currentIndex } = this;
        if (index !== currentIndex) {
            this.toNextItem(index, index > currentIndex);
        }
    }
    handleOnPrevClick () {
        const { currentIndex } = this;
        const { data } = this.props;
        const nextIndex = currentIndex > 0 ? currentIndex - 1 : data.length - 1;
        this.toNextItem(nextIndex, false);
    }
    handleOnNextClick () {
        const { currentIndex } = this;
        const { data } = this.props;
        const nextIndex = currentIndex < data.length - 1 ? currentIndex + 1 : 0;
        this.toNextItem(nextIndex, true);
    }
    toNextItem (index, isToLeft) {
        if (!this.isAnimation && this.isRender) {
            this.timeCount = false;
            if (isToLeft) {
                // before animation,set default position
                if (this.state.isSupportCss3) {
                    this.setCss3(this.ImageList.children[index], 'transform', 'translateX(100%)');
                } else {
                    this.setCss3(this.ImageList.children[index], 'left', '100%');
                }
                // start transform animation
                let curTime = 0;
                const { currentIndex } = this;
                const { interval } = this.props;
                const animation = () => {
                    if (curTime < interval) {
                        const orignPercent = parseFloat(curTime / interval);
                        const percent = orignPercent * 100;
                        const toPercent = 100 - percent;
                        if (this.state.isSupportCss3) {
                            this.setCss3(this.ImageList.children[index], 'transform', `translateX(${toPercent}%)`);
                            this.setCss3(this.ImageList.children[currentIndex], 'transform', `translateX(-${percent}%)`);
                        } else {
                            this.setCss3(this.ImageList.children[index], 'left', `${toPercent}%`);
                            this.setCss3(this.ImageList.children[currentIndex], 'left', `-${percent}%`);
                        }
                        curTime++;
                        setTimeout(animation, 1);
                    } else {
                        this.animation = false;
                        this.currentIndex = index;
                        if (this.state.isSupportCss3) {
                            this.setCss3(this.ImageList.children[index], 'transform', 'translateX(0%)');
                            this.setCss3(this.ImageList.children[currentIndex], 'transform', 'translateX(-100%)');
                        } else {
                            this.setCss3(this.ImageList.children[index], 'left', '0%');
                            this.setCss3(this.ImageList.children[currentIndex], 'left', '-100%');
                        }
                        this.setState({});
                    }
                };
                this.animation = true;
                animation();
            } else {
                // before animation,set default position
                if (this.state.isSupportCss3) {
                    this.setCss3(this.ImageList.children[index], 'transform', 'translateX(-100%)');
                } else {
                    this.setCss3(this.ImageList.children[index], 'left', '-100%');
                }
                // start transform animation
                let curTime = 0;
                const { currentIndex } = this;
                const { interval } = this.props;
                const animation = () => {
                    if (curTime < interval) {
                        const orignPercent = parseFloat(curTime / interval);
                        const percent = orignPercent * 100;
                        const toPercent = 100 - percent;
                        if (this.state.isSupportCss3) {
                            this.setCss3(this.ImageList.children[index], 'transform', `translateX(-${toPercent}%)`);
                            this.setCss3(this.ImageList.children[currentIndex], 'transform', `translateX(${percent}%)`);
                        } else {
                            this.setCss3(this.ImageList.children[index], 'left', `-${toPercent}%`);
                            this.setCss3(this.ImageList.children[currentIndex], 'left', `${percent}%`);
                        }
                        curTime++;
                        setTimeout(animation, 1);
                    } else {
                        this.animation = false;
                        this.currentIndex = index;
                        if (this.state.isSupportCss3) {
                            this.setCss3(this.ImageList.children[index], 'transform', 'translateX(0%)');
                            this.setCss3(this.ImageList.children[currentIndex], 'transform', 'translateX(100%)');
                        } else {
                            this.setCss3(this.ImageList.children[index], 'left', '0%');
                            this.setCss3(this.ImageList.children[currentIndex], 'left', '100%');
                        }
                        this.setState({});
                        if (!this.mouseIn) {
                            this.timeCount = true;
                        }
                    }
                };
                this.animation = true;
                animation();
            }
        }
    }
    render () {
        const { ImageItems, BtnItems, ItemStyle } = this.renderItem();
        return (
            <div className={styles.CarouselFigure}
                onMouseEnter={this.handleOnContainerMouseIn}
                onMouseLeave = {this.handleonContainerMouseOut}
                ref={(self) => {
                    this.carouse = self;
                }}
            >
                <div style={ItemStyle} className={styles.CarouselFigure_Items}>
                    <ul style={ItemStyle} ref={(self) => {
                        this.ImageList = self;
                    }}
                    >
                        {ImageItems}
                    </ul>
                </div>
                <ul className={styles.CarouselFigure_focusBtn}>
                    {BtnItems}
                </ul>
                <button className={styles.CarouselFigure_PrevButton} onClick={this.handleOnPrevClick}>&lt;</button>
                <button className={styles.CarouselFigure_NextButton} onClick={this.handleOnNextClick}>&gt;</button>
            </div>
        );
    }
}

CarouselFigure.propTypes = {
    data: PropTypes.array.isRequired,
    interval: PropTypes.number.isRequired,
    timeOut: PropTypes.number.isRequired,
    animation: PropTypes.string,
    fixSize: PropTypes.bool,
    height: PropTypes.number,
    width: PropTypes.number
};

CarouselFigure.defaultProps = {
    interval: 200,
    animation: 'none',
    timeOut: 4,
    width: 300,
    height: 200,
    isSetSize: false
};

export default CarouselFigure;
