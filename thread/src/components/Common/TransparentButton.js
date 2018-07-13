import React from 'react';
import { Item, Input, Text, Button } from 'native-base';
import styled from 'styled-components';


const TransparentButton = ({label, onPress}) => (
  <Button transparent light full onPress={onPress}>
         <Text>{label}</Text>
  </Button>
);

export default TransparentButton;
