import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Spinner, H3 } from 'native-base';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class Threads extends Component {
    renderThreadItem(item) {
        return (
            <ListItem avatar onPress={() => Actions.chat({
                title: item.name,
                roomID: item.id
            })}>
                <Body>
                    <Text>{item.name}</Text>
                    <Text note>ID: {item.id}</Text>
                </Body>
                <Right>
                    <Text note>{item.updatedAt}</Text>
                </Right>
            </ListItem>
        );
    }

    renderThreadList() {
        //const { rooms } = this.props.chatUser;
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

export default connect(mapStateToProps, {})(Threads);
