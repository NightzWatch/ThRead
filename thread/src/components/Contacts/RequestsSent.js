import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, List, ListItem, Body, Text } from 'native-base';
import { CentredContent, ContentSpinner } from '../Common';

class RequestsSent extends Component {
    renderList() {
        if (this.props.loading) {
            return <ContentSpinner color="blue" />;
        }

        if (this.props.requests_sent_list.length === 0) {
            return (
                <CentredContent>
                    <Text>No requests sent</Text>
                </CentredContent>
            );
        }
        
        return (
            <Content>
                <List
                    dataArray={this.props.requests_sent_list}
                    renderRow={item =>
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
            <Container>
                {this.renderList()}
            </Container>
        );
    }
}

const mapStateToProps = ({ requestsSent }) => {
    const { requests_sent_list, loading } = requestsSent;

    return { requests_sent_list, loading };
};

export default connect(mapStateToProps, {})(RequestsSent);
