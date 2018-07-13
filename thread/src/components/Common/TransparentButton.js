import React from 'react';
import { Item, Input, Text, Button } from 'native-base';
import styled from 'styled-components';


const TransparentButton = ({label, onPress}) => (
  <Button transparent light onPress={onPress}>
         <Text style={{marginLeft: 40, marginTop: 70, marginBottom: 30}}>{label}</Text>
  </Button>
);

export default TransparentButton;
