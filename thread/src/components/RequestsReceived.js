import React, { Component } from 'react';
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, H3, Button, Spinner } from 'native-base';
import { connect } from 'react-redux';
import {
    acceptRequest
} from '../actions';

class RequestsSent extends Component {
    onAcceptPress = (requestorID) => {
        acceptRequest(requestorID, this.props.chatUser);
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

        if (this.props.requests_received_list.length === 0) {
            return (
                <Content contentContainerStyle={{ 
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text>No requests received</Text>
                </Content>
            );
        }
        
        return (
            <Content>
                <List
                    dataArray={this.props.requests_received_list}
                    renderRow={(item) =>
                        <ListItem>
                            <Body>
                                <Text>{item.first_name} {item.last_name}</Text>
                            </Body>
                            <Right>
                                <Button
                                    transparent 
                                    style={{ width: 100 }}
                                    onPress={() => this.onAcceptPress(item.id)}
                                >
                                    <Text>Accept</Text>
                                </Button>
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

const mapStateToProps = ({ requestsReceived, auth }) => {
    const { requests_received_list, loading } = requestsReceived;
    const { chatUser } = auth;

    return { requests_received_list, loading, chatUser };
};

export default connect(mapStateToProps, {})(RequestsSent);
