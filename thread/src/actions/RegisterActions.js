import { Actions } from 'react-native-router-flux';
import { Keyboard } from 'react-native';
import { Toast } from 'native-base';
import firebase from 'firebase';
import {
    REGISTER_EMAIL_CHANGED,
    REGISTER_FIRST_NAME_CHANGED,
    REGISTER_LAST_NAME_CHANGED,
    REGISTER_PASSWORD_CHANGED,
    REGISTER_SECOND_PASSWORD_CHANGED,
    REGISTER_USER,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

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

export const register = ({ first_name, last_name, email, password, second_password }) => {
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

        if (!password) {
            registerFail(dispatch, { message: 'Password is missing.' });

            return false;
        }

        if (password !== second_password) {
            registerFail(dispatch, { message: 'Password does not match.' });

            return false;
        }


        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => createUserProfile(dispatch, { first_name, last_name, email }))
            .catch(error => registerFail(dispatch, error));
    };
};

// TODO: CREATE CHAT KIT USER USING A LAMBDA FUNCTION
const createUserProfile = (dispatch, { first_name, last_name, email }) => {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const docRef = db.doc(`users/${currentUser.uid}`);

    docRef.set({ first_name, last_name, email, id: currentUser.uid })
        .then(() => registerSuccess(dispatch, currentUser))
        .catch(error => registerFail(dispatch, error));
};

const registerSuccess = (dispatch, user) => {
    dispatch({
        type: REGISTER_SUCCESS,
        payload: user
    });

    Actions.main({ type: 'reset' });
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
