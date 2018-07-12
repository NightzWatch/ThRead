import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Spinner, H3 } from 'native-base';
import { Actions } from 'react-native-router-flux';
import CommonButton from './Common/CommonButton'
import {
    setChatRoom
} from '../actions';

class Threads extends Component {

    formatDate(dateTime){
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
      return <Text note children={content} />
    }

    onThreadPress(room) {
        const { createdAt, createdByUserId, id, isPrivate, name, updatedAt, users } = room;

        this.props.setChatRoom({
            createdAt, createdByUserId, id, isPrivate, name, updatedAt, users
        });

        Actions.thread({
            title: name,
            roomID: id,
            users,
            left:  () => <CommonButton onPress={() => Actions.pop()} name={'arrow-back'} />,
            right: () => <CommonButton onPress={() => Actions.info()} name={"information-circle"} />
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
                    { this.renderText(this.formatTime(updatedAt)) }
                    { this.renderText(this.formatDate(updatedAt)) }
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
