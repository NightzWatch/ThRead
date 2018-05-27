import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { ListItem, Body, Right, Text, Button } from 'native-base';
import { CommonButton, CentredContent, ContentSpinner } from '../Common';
import { createChatRoom } from '../../actions';

class ContactListItem extends Component {
    
    navigateToRoom(first_name, last_name, room_id) {
        Actions.dmThread({
            title: `${first_name}  ${last_name}`,
            roomID: room_id,
            left:  () => <CommonButton onPress={() => Actions.pop()} name={'arrow-back'} />
        });
    }

    onButtonPress = (id, room_id, first_name, last_name) => {
        if (room_id) {
            this.navigateToRoom(first_name, last_name, room_id);
        } else {
            createChatRoom(this.props.chatUser, id, room => {
                this.navigateToRoom(first_name, last_name, room.id);
            });
        }
    }

    renderButton(id, first_name, last_name, room_id) {
        return (
            <Button
                transparent 
                style={{ width: 100 }}
                onPress={() => this.onButtonPress(id, room_id, first_name, last_name)}
            >
                <Text>Message</Text>
            </Button>
        );
    }

    render() {
        const { id, first_name, last_name, room_id } = this.props;

        return (
            <ListItem>
                <Body>
                    <Text>{first_name} {last_name}</Text>
                </Body>
                <Right>
                    {this.renderButton(id, first_name, last_name, room_id)}
                </Right>
            </ListItem>
        );
    }
    
}

export default ContactListItem;
