import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, List, Text } from 'native-base';
import { CommonButton, CentredContent, ContentSpinner } from '../Common';
import ContactListItem from './ContactListItem';

class ContactList extends Component {

    renderList() {
        if (this.props.loading) {
            return <ContentSpinner />;
        }

        if (this.props.contact_list.length === 0) {
            return (
                <CentredContent>
                    <Text>You have no one to send cat gifs :(</Text>
                </CentredContent>
            );
        }

        return (
            <Content>
                <List
                    dataArray={this.props.contact_list}
                    renderRow={({ id, first_name, last_name, room_id }) =>
                        <ContactListItem 
                            id={id}
                            first_name={first_name}
                            last_name={last_name}
                            room_id={room_id}
                        />
                    }
                />
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

const mapStateToProps = ({ contacts }) => {
    const { contact_list, loading } = contacts;

    return { contact_list, loading };
};

export default connect(mapStateToProps, {})(ContactList);
