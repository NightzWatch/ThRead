import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListItem, Body, Right, Text } from 'native-base';
import * as actions from '../../actions';

class Item extends Component {

    formatDate(dateTime) {
        return (
            dateTime
            .split(/[T|-]/, 3)
            .reverse()
            .join('/')
        );
    }

    formatTime(dateTime) {
        return (
            dateTime
            .split(/T/)[1]
            .slice(0, -1)
        );
    }

    getContactName(user_id, room_name) {
        const contactId = room_name.replace(user_id, '');
        const { first_name, last_name } = this.props.contact_list.find(({ id }) => {
            return id === contactId;
        });

        return `${first_name} ${last_name}`;
    }

    getRoomProperties(room_name) {
        const { uid } = this.props.user;
        const property = (room_name.indexOf(uid) !== -1) ? { 
            room_name: this.getContactName(uid, room_name),
            isGroup: false
        } : { 
            room_name: room_name,
            isGroup: true
        };

        return property;
    }
    
    render() {
        const { name, updatedAt } = this.props.room;
        const { room_name, isGroup } = this.getRoomProperties(name);

        return (
            <ListItem avatar onPress={() => this.props.onThreadPress(this.props.room, room_name, isGroup)}>
                <Body>
                    <Text>{room_name}</Text>
                </Body>
                <Right>
                    <Text note>
                        {this.formatTime(updatedAt)}
                    </Text>
                    <Text note>
                        {this.formatDate(updatedAt)}
                    </Text>
                </Right>
            </ListItem>
        );
    }
}

const mapStateToProps = ({ auth, contacts }) => {
    const { user } = auth;
    const { contact_list } = contacts;

    return { user, contact_list };
};

export default connect(mapStateToProps, actions)(Item);
