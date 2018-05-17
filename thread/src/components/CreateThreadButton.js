import React, { Component } from 'react';
import { Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

class AddThreadButton extends Component {
    render() {
        return (
            <Button transparent onPress={() => Actions.createThread()}>
                <Icon name="add" />
            </Button>
        );
    }
}

export default AddThreadButton;
