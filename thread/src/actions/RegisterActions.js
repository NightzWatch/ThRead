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
    REGISTER_USER,
    REGISTER_FAIL
} from './types';

import {
    publicInitChatkit
} from './';

export const registerPhoneChanged = (text) => {
    return {
        type: REGISTER_PHONE_CHANGED,
        payload: text
    };
};

export const registerEmailChanged = (text) => {
    return {
        type: REGISTER_EMAIL_CHANGED,
        payload: text
    };
};

export const registerFirstNameChanged = (text) => {
    return {
        type: REGISTER_FIRST_NAME_CHANGED,
        payload: text
    };
};

export const registerLastNameChanged = (text) => {
    return {
        type: REGISTER_LAST_NAME_CHANGED,
        payload: text
    };
};

export const registerPasswordChanged = (text) => {
    return {
        type: REGISTER_PASSWORD_CHANGED,
        payload: text
    };
};

export const secondPasswordChanged = (text) => {
    return {
        type: REGISTER_SECOND_PASSWORD_CHANGED,
        payload: text
    };
};

export const register = ({ phone_number, first_name, last_name, email, password, second_password }) => {
    return (dispatch) => {
        Keyboard.dismiss();
        dispatch({ type: REGISTER_USER });
        
        if (!first_name) {
            registerFail(dispatch, { message: 'First name is missing.' });

            return false;
        }

        if (!last_name) {
            registerFail(dispatch, { message: 'Last name is missing.' });

            return false;
        }

        if (!phone_number) {
            registerFail(dispatch, { message: 'Phone number is missing.' });

            return false;
        }

        if (!password) {
            registerFail(dispatch, { message: 'Password is missing.' });

            return false;
        }

        if (password !== second_password) {
            registerFail(dispatch, { message: 'Password does not match.' });

            return false;
        }


        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => createUserProfile(dispatch, { first_name, last_name, email, phone_number }))
            .catch(error => registerFail(dispatch, error));
    };
};

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
    axios.post('https://gfkz4aqwmk.execute-api.us-east-2.amazonaws.com/prod/user?action=create-user', {
        id, first_name, last_name
    })
    .then(result => {
        registerSuccess(dispatch, user);
    })
    .catch(error => {
        console.log('error', error);
        registerFail(dispatch, error)
    });
}

const registerSuccess = (dispatch, user) => {
    publicInitChatkit(dispatch, user.uid);
};

const registerFail = (dispatch, { code, message }) => {
    dispatch({ type: REGISTER_FAIL });

    Toast.show({
        text: message,
        position: 'bottom',
        buttonText: '',
        duration: 1500
    });
};
