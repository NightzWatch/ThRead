import React, { Component } from 'react';
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, H3, Spinner } from 'native-base';
import { connect } from 'react-redux';

class RequestsSent extends Component {
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

        if (this.props.contact_requests_sent.length === 0) {
            return (
                <Content contentContainerStyle={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text>No requests sent</Text>
                </Content>
            );
        }

        return (
            <Content>
                <List
                    dataArray={this.props.requests_sent_list}
                    renderRow={(item) =>
                        <ListItem>
                            <Body>
                                <Text>Phone Number:  <Text note>{item.phone_number}</Text></Text>
                            </Body>
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

const mapStateToProps = ({ profile, requestsSent }) => {
    const { contact_requests_sent } = profile;
    const { requests_sent_list, loading } = requestsSent;

    return { contact_requests_sent, requests_sent_list, loading };
};

export default connect(mapStateToProps, {})(RequestsSent);
