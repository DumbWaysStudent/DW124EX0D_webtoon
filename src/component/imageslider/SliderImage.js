import React, { Component } from 'react'
import {View} from 'react-native'
import Slideshow from 'react-native-image-slider-show';


export default class SliderImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 1,
      interval: null,
      banners : [{
        title: 'One Piece',
        url: 'https://coverfiles.alphacoders.com/111/thumb-111102.jpg'
      }, {
        title: 'Is The Order A Rabbit?',
        url: 'https://coverfiles.alphacoders.com/111/thumb-111041.jpg'
      }, {
        title: 'Young Mom',
        url: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      }]
    };
  }
  componentDidMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.banners.length ? 0 : this.state.position + 1
        });
      }, 3000)
    });
  }
  render() {
    return (
      <View>
        <Slideshow
          height={170}
          overlay={true}
          arrowSize={0}
          indicatorSelectedColor="#2ce617"
          titleStyle={{color : "white"}}
          dataSource={this.state.banners}
          position={this.state.position}
          onPositionChanged={position => this.setState({ position })} />
      </View>
    );
  }
}
