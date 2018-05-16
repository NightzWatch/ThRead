import React, { Component } from 'react';
import { Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

class CloseButton extends Component {
    onButtonPress() {
        Actions.pop();
    }

    render() {
        return (
            <Button transparent onPress={this.onButtonPress.bind(this)}>
                <Icon name="arrow-back" />
            </Button>
        );
    }
}

export default CloseButton;
