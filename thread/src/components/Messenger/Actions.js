import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';

import { Constants, Location, Permissions } from 'expo';

import CameraRollPicker from 'react-native-camera-roll-picker';
import { Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';

class Actions extends Component {
    constructor(props) {
        super(props);
        
        this._images = [];
        this.state = {
        modalVisible: false,
        };
        this.onActionsPress = this.onActionsPress.bind(this);
        this.selectImages = this.selectImages.bind(this);
    }

  setImages(images) {
    this._images = images;
  }

  getImages() {
    return this._images;
  }

  setModalVisible(visible = false) {
    this.setState({modalVisible: visible});
  }

  onActionsPress() {
    const options = ['Choose From Library', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    
    this.context.actionSheet().showActionSheetWithOptions({
      options,
      cancelButtonIndex,
    },
    async (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
            this.setModalVisible(true);
            break;
        case 1:

        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== 'granted') {
            console.log('Permission to access location was denied');
        }

        let { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});

        console.log('SAY GOOD NIGHT TO THE BAD GUY: ', latitude, longitude);

        this.props.onSend({
            text: `${latitude}, ${longitude}`
        });

            // navigator.geolocation.getCurrentPosition(
            //     position => {
            //         // THIS IS WHERE LOCATION GETS SENT
            //         console.log('POSITION: ', position);

            //         this.props.onSend({
            //             location: {
            //                 latitude: position.coords.latitude,
            //                 longitude: position.coords.longitude,
            //             }
            //         });
            //     }, error => alert(error.message), {
            //         enableHighAccuracy: true,
            //         timeout: 20000,
            //         maximumAge: 1000
            //     }
            // );

          break;
        default:
      }
    });
  }

  selectImages(images) {
    this.setImages(images);
  }

  renderHeader() {
      return (
        <Header>
            <Left>
                <Button hasText transparent onPress={() => this.setModalVisible(false)}>
                    <Text style={{ paddingLeft: 0, paddingRight: 0 }}>Cancel</Text>
                </Button>
            </Left>
            <Body>
                <Title>Camera Roll</Title>
            </Body>
            <Right>
                <Button hasText transparent onPress={() => {
                    this.setModalVisible(false);

                    const images = this.getImages().map((image) => {
                        console.log(image);
                        
                        return {
                            image: image.uri,
                        };
                    });

                    console.log('IMAGES: ', images);

                    // THIS IS WHERE THE IMAGES GET SENT
                    // this.props.onSend(images);

                    this.setImages([]);
                }}>
                    <Text style={{ paddingLeft: 0, paddingRight: 0 }}>Send</Text>
                </Button>
            </Right>
        </Header>
      );
  }

    renderIcon() {
        if (this.props.icon) {
            return this.props.icon();
        }
        
        return (
            <View
                style={[styles.wrapper, this.props.wrapperStyle]}
            >
                <Text style={[styles.iconText, this.props.iconTextStyle]} children={'+'} />
            </View>
        );
    }

    render() {
        return (
            <TouchableOpacity
                style={[styles.container, this.props.containerStyle]}
                onPress={this.onActionsPress}
            >
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false);
                    }}
                >

                {this.renderHeader()}

                <CameraRollPicker
                    maximum={4}
                    imagesPerRow={4}
                    callback={this.selectImages}
                    selected={[]}

                />
                </Modal>
                
                {this.renderIcon()}
            </TouchableOpacity>
        );
    }
}

export default Actions;

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

Actions.contextTypes = {
  actionSheet: PropTypes.func,
};

Actions.defaultProps = {
  onSend: () => {},
  options: {},
  icon: null,
  containerStyle: {},
  wrapperStyle: {},
  iconTextStyle: {},
};

Actions.propTypes = {
  onSend: PropTypes.func,
  options: PropTypes.object,
  icon: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  iconTextStyle: Text.propTypes.style,
};
