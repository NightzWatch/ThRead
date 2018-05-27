import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, List, ListItem, Body, Right, Text, Button } from 'native-base';
import { CentredContent, ContentSpinner } from '../Common';
import {
    acceptRequest
} from '../../actions';

class RequestsSent extends Component {

    onAcceptPress = (requestorID) => {
        acceptRequest(requestorID, this.props.chatUser);
    }

    renderList() {
        if (this.props.loading) {
            return <ContentSpinner color="blue" />;
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
    const { chatUser } = auth;

    return { requests_received_list, loading, chatUser };
};

export default connect(mapStateToProps, {})(RequestsSent);
