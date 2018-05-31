import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { ListItem, Body, Right, Text, Button } from 'native-base';
import { CommonButton, CentredContent, ContentSpinner } from '../Common';
// import { createChatRoom } from '../../actions';
// TODO: FINISH THIS LAST ONE
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

    createChatRoom(chatUser, friendUserID, first_name, last_name) {
        console.log(chatUser);

        chatUser.createRoom({
            name: chatUser.uid + friendUserID,
            private: true,
            addUserIds: [chatUser.uid, friendUserID]
        }).then(room => {
            this.navigateToRoom(first_name, last_name, room.id)
                .setState({ buttonPressed: false });

            axios.post('https://us-central1-reactnative-auth-66287.cloudfunctions.net/firestoreCreateChatRecord', {
                userId: chatUser.uid,
                friendUserID,
                roomId: room.id
            })
            .then(response => {
            })
            .catch(error => {
                console.log(`Error storing direct messaging room id ${error}`);
            });

        })
        .catch(error => {
            console.log(`Error creating direct messaging room ${error}`);
        });
    }

    onButtonPress = (id, room_id, first_name, last_name) => {
        this.setState({ buttonPressed: true });

        if (room_id) {
            this.navigateToRoom(first_name, last_name, room_id)
                .setState({ buttonPressed: false });
        } else {
            console.log(this.props);
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
