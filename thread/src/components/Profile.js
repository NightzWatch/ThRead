import React, { Component } from 'react';
import { Container, Content, H3, Thumbnail, Button, Text, Spinner } from 'native-base';
import { ContentSpinner } from './Common';
import { connect } from 'react-redux';
import {
    logoutUser
} from '../actions';
import {StyleSheet} from 'react-native';
import {LoadingButton, CommonContainer} from './Common';
import styled from "styled-components";

const TermsTextStyle = styled(Text)`
  font-size:14px;
  text-align:center;
  color:white;
  margin-top:20px;
`;

class Profile extends Component {
    renderPage() {
        if (this.props.loading) {
            return <ContentSpinner />;
        }

        return (

              <Content contentContainerStyle={{ alignItems: 'center' }} style={{padding: 20}}>
                <Thumbnail clarge source={{uri: 'http://cdn.onlinewebfonts.com/svg/img_568656.png' }}  />

                <TermsTextStyle>{this.props.first_name} {this.props.last_name}</TermsTextStyle>
                <TermsTextStyle>{this.props.phone_number}</TermsTextStyle>

                <LoadingButton
                  loading={this.props.loading}
                  style={styles.buttonStyle}
                  text="Logout"
                  onPress={() => this.props.logoutUser()}
                  rounded
                  full
                />

              </Content>

        );
    }

    render() {
        return (
            <CommonContainer>
                {this.renderPage()}
            </CommonContainer>
        );
    }
}

let styles = StyleSheet.create({

      buttonStyle: {
         marginTop: 25
      },

  })

const mapStateToProps = ({ profile }) => {
    const { loading, first_name, last_name, avatar, phone_number } = profile;

    return { loading, first_name, last_name, avatar, phone_number };
};

export default connect(mapStateToProps, { logoutUser })(Profile);
