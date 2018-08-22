import React, { Component, Fragment } from 'react';
import { Thumbnail } from 'native-base';
import { ContentSpinner } from './Common';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import { StyleSheet } from 'react-native';
import { LoadingButton, CommonContainer, CommonText } from './Common';

class Profile extends Component {
    renderPage() {
        if (this.props.loading) {
            return <ContentSpinner />;
        }

        return (
            <Fragment>
                <Thumbnail large source={{uri: 'http://cdn.onlinewebfonts.com/svg/img_568656.png' }} style={styles.logo} />

                <CommonText text={this.props.first_name} secondaryText={this.props.last_name} />
                <CommonText text={this.props.phone_number} />

                <LoadingButton
                loading={this.props.loading}
                style={styles.buttonStyle}
                text="Logout"
                onPress={() => this.props.logoutUser()}
                rounded
                full
                />
            </Fragment>
        );
    }

    render() {
        return (
            <CommonContainer paddedContent={true} centerContent={true}>
                {this.renderPage()}
            </CommonContainer>
        );
    }
}

let styles = StyleSheet.create({
    buttonStyle: {
        marginTop: 25
    },
    logo: {
        marginTop: 20
    }
});

const mapStateToProps = ({ profile }) => {
    const { loading, first_name, last_name, avatar, phone_number } = profile;

    return { loading, first_name, last_name, avatar, phone_number };
};

export default connect(mapStateToProps, { logoutUser })(Profile);
