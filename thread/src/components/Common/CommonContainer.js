import React from 'react';
import {Container} from 'native-base';


const CommonContainer = (props) => (

  <Container
    {...props}
    style={{backgroundColor:'#66bb6a', padding:20}}
  />

);


export default CommonContainer;
