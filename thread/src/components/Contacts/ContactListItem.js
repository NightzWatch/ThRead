import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { ListItem, Body, Right, Text, Button } from 'native-base';
import { CommonButton, CentredContent, ContentSpinner } from '../Common';

class ContactListItem extends Component {

    state = {
        buttonPressed: false
    }
    
    navigateToRoom(first_name, last_name, room_id) {
        Actions.dmThread({
            title: `${first_name}  ${last_name}`,
            roomID: room_id,
            left:  () => <CommonButton onPress={() => Actions.pop()} name={'arrow-back'} />
        });

        return this;
    }

    async createChatRoom(chatUser, friendUserID, first_name, last_name) {
        try {
            const room = await chatUser.createRoom({
                name: chatUser.id + friendUserID,
                private: true,
                addUserIds: [chatUser.id, friendUserID]
            });
    
            this.navigateToRoom(first_name, last_name, room.id)
                .setState({ buttonPressed: false });

            await axios.post('https://us-central1-reactnative-auth-66287.cloudfunctions.net/firestoreCreateChatRecord', {
                userId: chatUser.id,
                friendUserID,
                roomId: room.id
            });
        } catch (error) {
            console.log(`Error creating direct messaging room ${error}`);
        }
    }

    onButtonPress = (id, room_id, first_name, last_name) => {
        this.setState({ buttonPressed: true });

        if (room_id) {
            this.navigateToRoom(first_name, last_name, room_id)
                .setState({ buttonPressed: false });
        } else {
            this.createChatRoom(this.props.chatUser, id, first_name, last_name);
        }
    }

    getButtonProps() {
        const { id, first_name, last_name, room_id } = this.props;
        
        if (this.state.buttonPressed) {
            return {
                transparent: true,
                style: { width: 105 },
                children: <Text>Loading...</Text>
            };
        }

        return {
            transparent: true,
            style: { width: 100 },
            onPress: () => this.onButtonPress(id, room_id, first_name, last_name),
            children: <Text>Message</Text>
        };
    }

    renderButton() {
        const buttonProps = this.getButtonProps();

        return <Button {...buttonProps} />;
    }

    render() {
        const { first_name, last_name } = this.props;

        return (
            <ListItem>
                <Body>
                    <Text>{first_name} {last_name}</Text>
                </Body>
                <Right>
                    {this.renderButton()}
                </Right>
            </ListItem>
        );
    }

}

const mapStateToProps = ({ auth }) => {
    const { chatUser } = auth;

    return { chatUser };
};

export default connect(mapStateToProps, {})(ContactListItem);
