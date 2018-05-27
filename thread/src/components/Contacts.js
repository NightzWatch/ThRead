import React, { Component } from 'react';
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, H3, Button, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import CommonButton from './common/CommonButton';
import { createChatRoom } from '../actions';

class Contacts extends Component {
    
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

    renderList() {
        if (this.props.loading) {
            return (
                <Content contentContainerStyle={{ 
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Spinner color="blue" />
                </Content>
            );
        }

        if (this.props.contact_list.length === 0) {
            return (
                <Content contentContainerStyle={{ 
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text>You have no one to send cat gifs :(</Text>
                </Content>
            );
        }

        return (
            <Content>
                <List
                    dataArray={this.props.contact_list}
                    renderRow={({ id, first_name, last_name, room_id }) =>
                        <ListItem>
                            <Body>
                                <Text>{first_name} {last_name}</Text>
                            </Body>
                            <Right>
                                {this.renderButton(id, first_name, last_name, room_id)}
                            </Right>
                        </ListItem>
                    }
                >
                </List>
            </Content>
        );
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#fff' }}>
                {this.renderList()}
            </Container>
        );
    }
}

const mapStateToProps = ({ contacts, auth }) => {
    const { contact_list, loading } = contacts;
    const { chatUser } = auth;

    return { contact_list, loading, chatUser };
};

export default connect(mapStateToProps, {})(Contacts);
