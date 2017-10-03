import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';


class Tags3D extends Component {
    constructor (props) {
        super(props);
        this.startAnimation = this.startAnimation.bind(this);
        this.isAnimation = false;
    }
    componentDidMount () {
        this.startAnimation();
    }
    componentDidUpdate () {
        this.startAnimation();
    }
    startAnimation () {
        if (!this.isAnimation && this.container) {
            const { width } = this.props;
            const tagEle = this.container.querySelectorAll('a');
            const paper = this.container;
            const RADIUS = width / 2,
                fallLength = width,
                tags = [],
                CX = paper.offsetWidth / 2,
                CY = paper.offsetHeight / 2,
                EX = paper.offsetLeft + document.body.scrollLeft + document.documentElement.scrollLeft,
                EY = paper.offsetTop + document.body.scrollTop + document.documentElement.scrollTop;
            let angleX = Math.PI / fallLength,
                angleY = Math.PI / fallLength;
            class tag {
                constructor (ele, x, y, z, colorString) {
                    this.x = x;
                    this.y = y;
                    this.z = z;
                    this.ele = ele;
                    this.color = colorString;
                }
                move () {
                    const scale = fallLength / (fallLength - this.z) * 0.9;
                    const alpha = (this.z + RADIUS) / (2 * RADIUS);
                    const left = [this.x + CX - this.ele.offsetWidth / 2, 'px'].join('');
                    const top = [this.y + CY - this.ele.offsetHeight / 2, 'px'].join('');
                    const zIndex = parseInt(scale * 100, 10);
                    const transform = [
                        `-o-transform:translate(${left},${top}) scale(${scale});`,
                        `-ms-transform:translate(${left},${top}) scale(${scale});`,
                        `-moz-transform:translate(${left},${top}) scale(${scale});`,
                        `-webkit-transform:translate(${left},${top}) scale(${scale});`,
                        `transform:translate(${left},${top}) scale(${scale});`
                    ].join('');
                    const newStyle = `opacity:${alpha};z-index:${zIndex};${transform}color:${this.color};`;
                    this.ele.setAttribute('style', newStyle);
                }
            }
            const init = () => {
                for (let i = 0; i < tagEle.length; i++) {
                    const k = -1 + (2 * (i + 1) - 1) / tagEle.length;
                    const a = Math.acos(k);
                    const b = a * Math.sqrt(tagEle.length * Math.PI);
                    const x = RADIUS * Math.sin(a) * Math.cos(b);
                    const y = RADIUS * Math.sin(a) * Math.sin(b);
                    const z = RADIUS * Math.cos(a);
                    const colorStr = `rgb(${parseInt(Math.random() * 255, 10)}, ${parseInt(Math.random() * 255, 10)}, ${parseInt(Math.random() * 255, 10)})`;
                    const t = new tag(tagEle[i], x, y, z, colorStr);
                    tags.push(t);
                    t.move();
                }
            };
            const rotateX = () => {
                const cos = Math.cos(angleX);
                const sin = Math.sin(angleX);
                for (const tag of tags) {
                    const y1 = tag.y * cos - tag.z * sin;
                    const z1 = tag.z * cos + tag.y * sin;
                    tag.y = y1;
                    tag.z = z1;
                }
            };
            const rotateY = () => {
                const cos = Math.cos(angleY);
                const sin = Math.sin(angleY);
                for (const tag of tags) {
                    const x1 = tag.x * cos - tag.z * sin;
                    const z1 = tag.z * cos + tag.x * sin;
                    tag.x = x1;
                    tag.z = z1;
                }
            };
            const animate = () => {
                rotateX();
                rotateY();
                for (const tag of tags) {
                    tag.move();
                }
                if (this.container) {
                    requestAnimationFrame(animate);
                }
            };
            const paperEvent = () => {
                const eventFun = (event) => {
                    const x = event.clientX - EX - CX;
                    const y = event.clientY - EY - CY;
                    angleX = x * 0.0001;
                    angleY = y * 0.0001;
                };
                if (paper.addEventListener) {
                    paper.addEventListener('mousemove', eventFun);
                } else {
                    paper.attachEvent('onmousemove', eventFun);
                }
            };
            init();
            animate();
            paperEvent();
            this.isAnimation = true;
        }
    }
    render () {
        const { data, width, height } = this.props;
        const resetStyle = {
            width,
            height
        };
        return (
            <div className={styles.Tags3D} style={resetStyle}
                ref={(self) => {
                    this.container = self;
                }}
            >
                {
                    data && data.map && data.map((item, index) => {
                        return (
                            <a href={item.url} key={index} href={item.url}><span>{item.title}</span></a>
                        );
                    })
                }
                {this.props.children}
            </div>
        );
    }
}

Tags3D.propTypes = {
    data: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.element,
        PropTypes.node
    ])
};

Tags3D.defaultProps = {
    width: 200,
    height: 200
};

export default Tags3D;
