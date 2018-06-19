import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, List, Text } from 'native-base';
import { CentredContent, ContentSpinner } from '../Common';
import ListItem from './RequestsReceivedItem';

class RequestsReceivedList extends Component {

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
                    renderRow={({ id, first_name, last_name }) => 
                        <ListItem
                            id={id}
                            first_name={first_name}
                            last_name={last_name}
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

const mapStateToProps = ({ requestsReceived }) => {
    const { requests_received_list, loading } = requestsReceived;

    return { requests_received_list, loading };
};

export default connect(mapStateToProps, {})(RequestsReceivedList);
