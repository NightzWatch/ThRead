
import React, { Component } from 'react';
import { Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

class InfoButton extends Component {
    onButtonPress = () => {
        Actions.info();
    }

    render() {
        return (
            <Button transparent onPress={this.onButtonPress}>
                <Icon name="information-circle" />
            </Button>
        );
    }
}

export default InfoButton;
