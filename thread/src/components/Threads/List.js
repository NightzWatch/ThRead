import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, List, Text, H3 } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { CommonButton, CentredContent, ContentSpinner } from '../Common';
import * as actions from '../../actions';
import { handleIncomingNotification } from '../../services';
import { Notifications } from 'expo';
import Thread from './Item';

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

    onThreadPress = (room, room_name, isGroup) => {
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
                    renderRow={room => <Thread room={room} onThreadPress={this.onThreadPress} />}
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

const mapStateToProps = ({ chatRooms, chatRoom, contacts }) => {
    const { rooms } = chatRooms;
    const { loading } = contacts;

    return { chatRoom, rooms, loading };
};

export default connect(mapStateToProps, actions)(Threads);
