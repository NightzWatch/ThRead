import React from 'react';
import { Button, Icon } from 'native-base';

const CommonButton = ({onPress, name}) => {
  return(
    <Button transparent onPress={onPress}>
      <Icon name={name} />
    </Button>
  );
}

export default CommonButton
