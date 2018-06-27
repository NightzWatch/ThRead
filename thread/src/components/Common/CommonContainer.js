import React from 'react';
import {Container} from 'native-base';


const CommonContainer = (props) => (

  <Container
    {...props}
    style={{backgroundColor:'#8bc34a', padding:20}}
  />

);


export default CommonContainer;
