import React from 'react';
import { Text, Button } from 'native-base';

const TransparentButton = ({ text, onPress }) => (
  <Button transparent light full onPress={onPress}>
         <Text>{text}</Text>
  </Button>
);

export default TransparentButton;
