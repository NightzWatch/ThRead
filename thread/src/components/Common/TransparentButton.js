import React from 'react';
import { Item, Input, Text } from 'native-base';
import styled from 'styled-components';

const TermsButtonStyle = styled(Text)`
  font-size:14px;
  text-align:center;
  color:white;
  margin-top:20px;
  margin-bottom:20px;
`;


const TransparentButton = ({label, onPress}) => (

      <TermsButtonStyle onPress={onPress}>{label}</TermsButtonStyle>
  
);

export default TransparentButton;
