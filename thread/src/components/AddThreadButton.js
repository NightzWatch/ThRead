import React, { Component } from 'react';
import { Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

class AddThreadButton extends Component {
    onButtonPress() {
        Actions.createThread();
    }

    render() {
        return (
            <Button transparent onPress={this.onButtonPress.bind(this)}>
                <Icon name="add" />
            </Button>
        );
    }
}

export default AddThreadButton;
