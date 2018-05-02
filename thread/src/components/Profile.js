import React, { Component } from 'react';
import { Container, Content, H1 } from 'native-base';

class Profile extends Component {
    render() {
        return (
            <Container style={{ backgroundColor: '#fff' }}>
                <Content>
                    <H1>Profile will go here</H1>
                </Content>
            </Container>
        );
    }
}

export default Profile;
