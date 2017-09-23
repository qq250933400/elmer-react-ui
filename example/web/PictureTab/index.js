import React, { Component } from 'react';
import { action } from '@storybook/addon-actions';
import { PictureTab } from '../../../src/index';
import img from '../../../src/web/image/mj1.jpg';
import image1 from '../../../src/web/image/tourist/to12.jpg';
import image2 from '../../../src/web/image/tourist/to10.jpg';
import image3 from '../../../src/web/image/tourist/to9.jpg';
import image4 from '../../../src/web/image/tourist/to8.jpg';
import image5 from '../../../src/web/image/tourist/to5.jpg';
import image6 from '../../../src/web/image/tourist/to4.jpg';
import image7 from '../../../src/web/image/tourist/to2.jpg';
import image8 from '../../../src/web/image/tourist/to1.jpg';

class PictureTabExample extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.data = [
            {
                title: '旅游路线多一个字',
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
        this.handleOnListItemClick = this.handleOnListItemClick.bind(this);
    }
    handleOnListItemClick (data) {
        action("onListItemClick", data);
        console.log(data, '---->module example clickEvent');
    }
    render () {
        return (
            <div>
                <div style={{ display: 'inline-block', width: 800 }}>
                    <PictureTab data={this.data} onListItemClick={this.handleOnListItemClick} />
                </div>
            </div>
        );
    }
}

export default PictureTabExample;
