import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Container, Header, Content, Form, Item, Input, Label, Icon, Button, Text, Toast, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { LoadingButton } from '../Common';

class AddContactForm extends Component {
    state = {
        phone_number: '',
        requesting: false
    }

    showToast = (text) => {
        Toast.show({
            text,
            position: 'bottom',
            buttonText: ''
        });
    }

    onPhoneNumberChange = (text) => {
        this.setState({
            phone_number: text
        });
    }

    requestContact = () => {
        if (!this.state.phone_number) {
            return this.showToast('Phone number cannot be empty');
        }

        this.setState({ requesting: true });

        axios.post('https://us-central1-reactnative-auth-66287.cloudfunctions.net/firestoreSendRequest', {
            userId: this.props.user.uid,
            phoneNumber: this.state.phone_number
        })
        .then(response => {
            Actions.pop();
            this.showToast('Request sent!');
        })
        .catch(error => {
            this.showToast('Error has occurred');
            this.setState({ requesting: false });
        });
    }

    render() {
        return (
            <Container>
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
                    <LoadingButton
                        loading={this.state.requesting}
                        style={{ marginTop: 50 }}
                        onPress={this.requestContact}
                        text="Send"
                    />
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { user } = auth;

    return { user };
};

export default connect(mapStateToProps, {})(AddContactForm);
