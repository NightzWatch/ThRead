import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Spinner, H3 } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { CommonButton, CentredContent, ContentSpinner } from './Common';
import {
    setChatRoom
} from '../actions';

import { Notifications } from 'expo';

class Threads extends Component {

    constructor(props) {
        super(props);

        console.log('JORDAN I HAVE BEEN INSTANTIATED');
    }

    componentDidMount() {
        // Handle notifications that are received or selected while the app
        // is open. If the app was closed and then opened by tapping the
        // notification (rather than just tapping the app icon to open it),
        // this function will fire on the next tick after the app starts
        // with the notification data.
        this.notificationSubscription = Notifications.addListener(this.handleNotification);
    }

    handleNotification = notification => {
        if (notification.origin === 'selected') {
            
            const { type, roomID, isGroup } = notification.data; // DO SOMETHING WITH TYPE 

            console.log('notification: ', notification);
            // console.log('screen: ', screen);

            const room = this.props.rooms.find(room => room.id === roomID);
            const { name } = room;

            console.log('ROOM NAME: ', name);
            console.log('ROOM ID: ', roomID);

            /**
             BUGS:
                i. if the user is already on a screen, reset all the screens then navigate - DONE
            */

            // getRoomProperties

            Actions.reset('main');
            this.onThreadPress(room, name, isGroup);

            /*
                DATA NEEDED FOR SCREEN:

                - roomID,
                - title/room_name
                - isGroup
             */

            // FIND ROOM BASED ON ITS ID



            // Actions[screen]({
            //     roomID,
            //     title: name,
            //     left:  () => <CommonButton onPress={() => Actions.pop()} name={'arrow-back'} />,
            //     right: () => <CommonButton onPress={() => Actions.info()} name={"information-circle"} />
            // });
        }

        return notification;
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

    renderThreadList() {
        const { rooms } = this.props;

        if (this.props.loading) {
            return <ContentSpinner />;
        }

        if (rooms.length === 0) {
            return (
                <CentredContent>
                    <H3>No ThReads created.</H3>
                    <Text>Create ThRead to start sending cat gifs.</Text>
                </CentredContent>
            );
        };

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

const mapStateToProps = ({ auth, chatRooms, contacts }) => {
    const { user, chatUser } = auth;
    const { rooms } = chatRooms;
    const { contact_list, loading } = contacts;

    return { user, chatUser, rooms, contact_list, loading };
};

export default connect(mapStateToProps, { setChatRoom })(Threads);
