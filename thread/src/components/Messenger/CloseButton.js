import React, { Component } from 'react';
import { Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

class CloseButton extends Component {
    render() {
        return (
            <Button transparent onPress={() => Actions.pop()}>
                <Icon name="arrow-back" />
            </Button>
        );
    }
}

export default CloseButton;
