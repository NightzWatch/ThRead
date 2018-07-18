import { Actions } from 'react-native-router-flux';
import { Keyboard } from 'react-native';
import { Toast } from 'native-base';
import firebase from 'firebase';
import axios from 'axios';
import {
    REGISTER_EMAIL_CHANGED,
    REGISTER_FIRST_NAME_CHANGED,
    REGISTER_LAST_NAME_CHANGED,
    REGISTER_PHONE_CHANGED,
    REGISTER_PASSWORD_CHANGED,
    REGISTER_SECOND_PASSWORD_CHANGED,
    REGISTER_PHONE_EXT_CHANGED,
    REGISTER_USER,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

import {
    publicInitChatkit
} from './';

export const registerPhoneExtension = (text) => ({
    type: REGISTER_PHONE_EXT_CHANGED,
    payload: text
});

export const registerPhoneChanged = (text) => ({
    type: REGISTER_PHONE_CHANGED,
    payload: text
});

export const registerEmailChanged = (text) => ({
    type: REGISTER_EMAIL_CHANGED,
    payload: text
});

export const registerFirstNameChanged = (text) => ({
    type: REGISTER_FIRST_NAME_CHANGED,
    payload: text
});

export const registerLastNameChanged = (text) => ({
    type: REGISTER_LAST_NAME_CHANGED,
    payload: text
});

export const registerPasswordChanged = (text) => ({
    type: REGISTER_PASSWORD_CHANGED,
    payload: text
});

export const secondPasswordChanged = (text) => ({
    type: REGISTER_SECOND_PASSWORD_CHANGED,
    payload: text
});

export const register = () => dispatch => {
        Keyboard.dismiss();
        dispatch({ type: REGISTER_USER, callback: registerUserFirbase });
    };

const registerUserFirbase = (dispatch, { first_name, last_name, email, phone_number, password }) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => createUserProfile(dispatch, { first_name, last_name, email, phone_number }))
            .catch(error => registerFail(dispatch, error));
}

const createUserProfile = (dispatch, { first_name, last_name, email, phone_number }) => {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const docRef = db.doc(`users/${currentUser.uid}`);

    docRef.set({
        id: currentUser.uid,
        first_name,
        last_name,
        email,
        phone_number,
        contact_requests_received: [],
        contact_requests_sent: [],
        contacts: [],
        avatar: ''
    })
    .then(() => createChatUser(dispatch, { id: currentUser.uid, first_name, last_name }, currentUser))
    .catch(error => registerFail(dispatch, error));
};

const createChatUser = (dispatch, { id, first_name, last_name }, user) => {
    axios.post('https://us-central1-reactnative-auth-66287.cloudfunctions.net/chatkitCreateUser', {
        user: { id, first_name, last_name }
    })
    .then(result => {
        registerSuccess(dispatch, user);
    })
    .catch(error => {
        registerFail(dispatch, error)
    });
}

const registerSuccess = (dispatch, user) => {
    dispatch({ type: REGISTER_SUCCESS, payload: user });
    publicInitChatkit(dispatch, user.uid);
};

export const registerFail = (dispatch, { code, message }) => {
    dispatch({ type: REGISTER_FAIL });

    Toast.show({
        text: message,
        position: 'bottom',
        buttonText: '',
        duration: 1500
    });
};
