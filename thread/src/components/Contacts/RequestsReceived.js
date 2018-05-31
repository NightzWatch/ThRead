import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Container, Content, List, ListItem, Body, Right, Text, Button, Toast } from 'native-base';
import { CentredContent, ContentSpinner } from '../Common';
import {
    acceptRequest
} from '../../actions';

class RequestsSent extends Component {

    onAcceptPress = async (requestorID) => {
        // TODO: THIS IS SLOW BECAUSE WE ARE WAITING FOR SERVER RESPONSE. MAKE IT FASTER
        try {
            await axios.post('https://us-central1-reactnative-auth-66287.cloudfunctions.net/firestoreAcceptRequest', {
                userId: this.props.user.uid,
                requestorID
            });
        } catch (error) {
            console.log(error);
            Toast.show({
                text: 'Something has went wrong',
                position: 'bottom',
                buttonText: ''
            });
        }
    }

    renderList() {
        if (this.props.loading) {
            return <ContentSpinner />;
        }

        if (this.props.requests_received_list.length === 0) {
            return (
                <CentredContent>
                    <Text>No requests received</Text>
                </CentredContent>
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
            <Container>
                {this.renderList()}
            </Container>
        );
    }
}

const mapStateToProps = ({ requestsReceived, auth }) => {
    const { requests_received_list, loading } = requestsReceived;
    const { chatUser, user } = auth;

    return { requests_received_list, loading, chatUser, user };
};

export default connect(mapStateToProps, {})(RequestsSent);
