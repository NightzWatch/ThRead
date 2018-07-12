import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'native-base';
import styled from "styled-components";


const StyledView = styled.View`

  padding-left:70px;
  padding-top:120px;
  margin-bottom:30px;
  width:100%;

`;


var logoIMG = require('../../assets/threadlogo.png');

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
