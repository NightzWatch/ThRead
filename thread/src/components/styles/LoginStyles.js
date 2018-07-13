import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Footer, FooterTab, Button, Text, Spinner } from 'native-base';
import { connect } from 'react-redux';
import {  View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import  Logo  from './Logo';
import { loginEmailChanged, loginPasswordChanged, loginUser } from '../actions';
import styled from 'styled-components/native';


const StyledView = styled.View`
  background-color: papayawhip;
  padding: 10px;
`;


class LoginForm extends Component {


    render() {
        return (

        );
    }
}

let styles = StyleSheet.create({

const mapStateToProps = ({ auth }) => {
    const { email, password, loading } = auth;

    return { email, password, loading };
};

export default LoginStyles;
