import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, List, ListItem, Body, Right, Text, H3 } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { CommonButton, CentredContent, ContentSpinner } from './Common';
import * as actions from '../actions';
import { handleIncomingNotification } from '../services';
import { Notifications } from 'expo';

class Threads extends Component {

    componentDidMount() {
        this.notificationSubscription = Notifications.addListener(
            notification => handleIncomingNotification(
                notification,
                this.props.chatRoom,
                this.props.rooms,
                (room, isGroup) => {
                    Actions.reset('main');
                    this.onThreadPress(room, room.name, isGroup);
                }
            )
        );
    }

    componentWillUnmount() {
        this.notificationSubscription.remove();
    }

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

    renderText(content) {
        return <Text note children={content} />;
    }

    onThreadPress(room, room_name, isGroup) {
        const { createdAt, createdByUserId, id, isPrivate, updatedAt, users } = room;
        const action = isGroup ? 'thread' : 'dmThread';
        const rightComponent = isGroup ? <CommonButton onPress={() => Actions.info()} name={"information-circle"} /> : null;

        this.props.setChatRoom({
            createdAt, createdByUserId, id, isPrivate, name: room_name, updatedAt, users, isGroup
        });

        Actions[action]({
            title: room_name,
            roomID: id,
            left:  () => <CommonButton onPress={() => Actions.pop()} name={'arrow-back'} />,
            right: () => rightComponent
        });
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
    
    renderThreadItem(room) {
        const { id, name, updatedAt } = room;
        const { room_name, isGroup } = this.getRoomProperties(name);

        return (
            <ListItem avatar onPress={() => this.onThreadPress(room, room_name, isGroup)}>
                <Body>
                    <Text>{room_name}</Text>
                    <Text note>ID: {id}</Text>
                </Body>
                <Right>
                    {this.renderText(this.formatTime(updatedAt))}
                    {this.renderText(this.formatDate(updatedAt))}
                </Right>
            </ListItem>
        );
    }

    orderRooms(a,b) {
        const date1 = new Date(a.updatedAt);
        const date2 = new Date(b.updatedAt);

        if (date1 === date2) {
            return 0;
        }

        return date1 < date2 ? 1 : -1;
    };


    renderThreadList() {
        if (this.props.loading) {
            return <ContentSpinner />;
        }

        const { rooms } = this.props;

        if (rooms.length === 0) {
            return (
                <CentredContent>
                    <H3>No ThReads created.</H3>
                    <Text>Create ThRead to start sending cat gifs.</Text>
                </CentredContent>
            );
        };

        rooms.sort(this.orderRooms);

        return (
            <Content>
                <List
                    dataArray={rooms}
                    renderRow={item => this.renderThreadItem(item)}
                >
                </List>
            </Content>
        );
    }

    render() {
        return (
            <Container>
                {this.renderThreadList()}
            </Container>
        );
    }
}

const mapStateToProps = ({ auth, chatRooms, chatRoom, contacts }) => {
    const { user, chatUser } = auth;
    const { rooms } = chatRooms;
    const { contact_list, loading } = contacts;

    return { user, chatUser, chatRoom, rooms, contact_list, loading };
};

export default connect(mapStateToProps, actions)(Threads);
