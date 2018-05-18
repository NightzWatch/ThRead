import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Icon, Button, Text, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { sendRequest } from '../actions';

class AddContactForm extends Component {
    state = {
        phone_number: ''
    }

    onPhoneNumberChange = (text) => {
        this.setState({
            phone_number: text
        });
    }

    requestContact = () => {
        if (!this.state.phone_number) {
            return Toast.show({
                text: 'Phone number cannot be empty',
                position: 'bottom',
                buttonText: ''
            });
        }

        sendRequest(this.state.phone_number);

        Actions.pop();

        return Toast.show({
            text: 'Request sent!',
            position: 'bottom',
            buttonText: ''
        });
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#fff' }}>
                <Content>
                    <Form>
                        <Item stackedLabel>
                            <Label>Phone number</Label>
                            <Input
                                value={this.state.phone_number}
                                onChangeText={this.onPhoneNumberChange}
                            />
                        </Item>
                    </Form>
                    <Button full style={{ marginTop: 50 }} onPress={this.requestContact}>
                        <Text>Send</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default AddContactForm;
