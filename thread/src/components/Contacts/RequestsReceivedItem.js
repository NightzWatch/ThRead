import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { ListItem, Body, Right, Text, Button, Toast } from 'native-base';

class RequestsReceivedItem extends Component {

    state = {
        button_pressed: false
    }

    onAcceptPress = async (requestorID) => {
        this.setState({ button_pressed: true });

        try {
            await axios.post('https://us-central1-reactnative-auth-66287.cloudfunctions.net/firestoreAcceptRequest', {
                userId: this.props.user.uid,
                requestorID
            });
        } catch (error) {
            this.setState({ button_pressed: false });
            Toast.show({
                text: 'Something has went wrong',
                position: 'bottom',
                buttonText: ''
            });
        }
    }

    renderButton(user_id) {
        if (this.state.button_pressed) {
            return <Text style={{ width: 100 }}>Accepting...</Text>;
        }

        return (
            <Button
                transparent 
                style={{ width: 100 }}
                onPress={() => this.onAcceptPress(user_id)}
            >
                <Text>Accept</Text>
            </Button>
        );
    }

    render() {
        const { id, first_name, last_name } = this.props;

        return (
            <ListItem>
                <Body>
                    <Text>{first_name} {last_name}</Text>
                </Body>
                <Right>
                    {this.renderButton(id)}
                </Right>
            </ListItem>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { chatUser, user } = auth;

    return { chatUser, user };
};

export default connect(mapStateToProps, {})(RequestsReceivedItem);
