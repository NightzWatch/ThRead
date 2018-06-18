import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'native-base';
import styled from "styled-components";


const StyledView = styled.View`

  padding-left:80px;
  padding-top:140px;
  width:100%;

`;


var logoIMG = require('../../assets/threadlogoMid.png');

class Logo extends Component{
  render(){
    return(
      <StyledView>
          <Image source={logoIMG}/>
      </StyledView>
    )
  }
}



export default Logo;
