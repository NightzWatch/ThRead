import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'native-base';

var logoIMG = require('../../assets/threadlogo.png');

class Logo extends Component{
  render(){
    return(
      <View style={styles.logoStyle}>
          <Image source={logoIMG}/>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  logoStyle: {
      marginLeft:85,
      marginTop: 140,
  },
});

export default Logo;
