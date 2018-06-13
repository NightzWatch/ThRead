import React, { Component } from 'react';
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, H3, Button, Spinner } from 'native-base';
import { connect } from 'react-redux';

class Contacts extends Component {
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

        if (this.props.contacts.length === 0) {
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
            <Content style={{ padding:10, marginLeft:-8}}>
                <List
                    dataArray={this.props.contact_list}
                    renderRow={(item) =>
                        <ListItem>
                            <Body>
                                <Text>{item.first_name} {item.last_name}</Text>
                            </Body>
                            <Right>
                                <Button
                                    transparent
                                    style={{ width: 100 }}
                                >
                                    <Text>Message</Text>
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

const mapStateToProps = ({ profile, contacts }) => {
    const { contact_list, loading } = contacts;

    return { contact_list, loading, contacts: profile.contacts };
};

export default connect(mapStateToProps, {})(Contacts);
