import React, { Component } from 'react';
import { Container, Content, H3, Thumbnail, Button, Text, Spinner } from 'native-base';
import { connect } from 'react-redux';
import {
    logoutUser
} from '../actions';

class Profile extends Component {
    renderPage() {
        if (this.props.loading) {
            return <Spinner color="blue" style={{ flex: 1 }} />
        }

        return (
            <Content contentContainerStyle={{ alignItems: 'center' }}>
                <Thumbnail large source={{uri: 'http://cdn.onlinewebfonts.com/svg/img_568656.png' }} style={{ marginTop: 50 }} />

                <H3 style={{ marginTop: 10 }}>{this.props.first_name} {this.props.last_name}</H3>

                <Button primary full style={{ marginTop: 150 }}>
                    <Text>Edit Profile</Text>
                </Button>

                <Button primary full style={{ marginTop: 25 }} onPress={() => this.props.logoutUser()}>
                    <Text>Logout</Text>
                </Button>
            </Content>
        );
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#fff' }}>
                {this.renderPage()}
            </Container>
        );
    }
}

const mapStateToProps = ({ profile }) => {
    const { loading, first_name, last_name, avatar, phone_number } = profile;

    return { loading, first_name, last_name, avatar, phone_number };
};

export default connect(mapStateToProps, { logoutUser })(Profile);