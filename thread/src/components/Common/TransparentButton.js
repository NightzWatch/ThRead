import React from 'react';
import {Text, Button } from 'native-base';

const TransparentButton = ({label, onPress}) => (
  <Button transparent light full onPress={onPress}>
         <Text>{label}</Text>
  </Button>
);

export default TransparentButton;
