import React, { Component } from 'react';
import { Container, Content, H3, Thumbnail, Button, Text, Spinner } from 'native-base';
import { ContentSpinner } from './Common';
import { connect } from 'react-redux';
import {
    logoutUser
} from '../actions';
import {StyleSheet} from 'react-native';

class Profile extends Component {
    renderPage() {
        if (this.props.loading) {
            return <ContentSpinner />;
        }

        return (
            <Content contentContainerStyle={{ alignItems: 'center' }}>
                <Thumbnail large source={{uri: 'http://cdn.onlinewebfonts.com/svg/img_568656.png' }} style={{ marginTop: 50 }} />

                <H3 style={{ marginTop: 10 }}>{this.props.first_name} {this.props.last_name}</H3>
                <Text style={{ marginTop: 10 }}>{this.props.phone_number}</Text>

                <Button rounded style={styles.buttonStyle} onPress={() => this.props.logoutUser()}>
                    <Text>Logout</Text>
                </Button>
            </Content>
        );
    }

    render() {
        return (
            <Container>
                {this.renderPage()}
            </Container>
        );
    }
}

let styles = StyleSheet.create({

      buttonStyle: {
         marginTop: 25,
         alignItems: 'center',
        justifyContent: 'center',
         marginLeft: 20,
         width: 340
      }
  })

const mapStateToProps = ({ profile }) => {
    const { loading, first_name, last_name, avatar, phone_number } = profile;

    return { loading, first_name, last_name, avatar, phone_number };
};

export default connect(mapStateToProps, { logoutUser })(Profile);
