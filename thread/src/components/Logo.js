import React, { Component } from 'react';
import { Image } from 'react-native';
import styled from "styled-components";


const StyledView = styled.View`

  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom:30px;
  width:100%;
  padding-top:35%;
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
