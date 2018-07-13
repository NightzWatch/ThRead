import React from 'react';
import { Item, Input, Text } from 'native-base';
import styled from 'styled-components';

const TextStyle = styled(Text)`
    font-size:13px;
    text-align:center;
    font-weight:700;
    color:white;
  `;

const InputStyle = styled(Input)`
  color: white;
  font-size:15px;
  text-align:center;
`;

const CommonField = ({onChangeText, value, label, style, secureTextEntry = false}) => (
  <Item style={style} stackedLabel>
      <TextStyle>{label}</TextStyle>
      <InputStyle
          onChangeText={onChangeText}
          value={value}
          secureTextEntry = {secureTextEntry}
      />
  </Item>
);

export default CommonField;
