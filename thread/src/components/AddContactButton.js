import React, { Component } from 'react';
import { Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

class AddContactButton extends Component {
    render() {
        return (
            <Button transparent onPress={() => Actions.addContact()}>
                <Icon name="add" />
            </Button>
        );
    }
}

export default AddContactButton;
