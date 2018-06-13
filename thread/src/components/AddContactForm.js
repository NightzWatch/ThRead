import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Icon, Button, Text, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {StyleSheet} from 'react-native';
import { sendRequest } from '../actions';
import styled from 'styled-components';

const TextStyle = styled(Text)`
    font-size:13px;
    text-align:center;
    font-weight:700;
    color:white;
    margin-top:10px;
  `;

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
            <Container style={{ backgroundColor: '#8bc34a' }}>
                <Content>
                    <Form style={{padding:20, marginLeft: -20}}>
                        <Item stackedLabel>
                            <TextStyle>Phone number</TextStyle>
                            <Input
                               style={{color:'white',fontSize:13}}
                                value={this.state.phone_number}
                                onChangeText={this.onPhoneNumberChange}
                            />
                        </Item>
                    </Form>
                    <Button rounded style={styles.buttonStyle} onPress={this.requestContact}>
                        <Text>Send</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

let styles = StyleSheet.create({

     buttonStyle: {
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        width: 340
     }
 })

export default AddContactForm;
