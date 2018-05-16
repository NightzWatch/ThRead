import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Spinner, H3 } from 'native-base';
import { Actions } from 'react-native-router-flux';
import InfoButton from './Messenger/InfoButton';
import CloseButton from './Messenger/CloseButton';
import {
    setChatRoom
} from '../actions';

class Threads extends Component {
    onThreadPress(room) {
        const { createdAt, createdByUserId, id, isPrivate, name, updatedAt, users } = room;
        
        this.props.setChatRoom({
            createdAt, createdByUserId, id, isPrivate, name, updatedAt, users
        });

        Actions.thread({
            title: name,
            roomID: id,
            users,
            left: () => <CloseButton />,
            right: () => <InfoButton />
        });
    }

    renderThreadItem(room) {
        const { id, name, updatedAt, users } = room;

        return (
            <ListItem avatar onPress={() => this.onThreadPress(room)}>
                <Body>
                    <Text>{name}</Text>
                    <Text note>ID: {id}</Text>
                </Body>
                <Right>
                    <Text note>{updatedAt}</Text>
                </Right>
            </ListItem>
        );
    }

    renderThreadList() {
        const { rooms } = this.props;

        if (rooms.length === 0) {
            return (
                <Content contentContainerStyle={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <H3>No ThReads created.</H3>
                    <Text>Create ThRead to start sending cat gifs.</Text>
                </Content>
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
            <Container style={{ backgroundColor: '#fff' }}>
                {this.renderThreadList()}
            </Container>
        );
    }
}

const mapStateToProps = ({ auth, chatRooms }) => {
    const { user, chatUser } = auth;
    const { rooms } = chatRooms;

    return { user, chatUser, rooms };
};

export default connect(mapStateToProps, { setChatRoom })(Threads);
