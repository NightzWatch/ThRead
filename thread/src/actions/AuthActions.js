import { ChatManager, TokenProvider } from '@pusher/chatkit';
import { Keyboard } from 'react-native';
import { Toast } from 'native-base';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    LOGIN_CHAT_USER_SUCCESS,
    CHAT_ROOMS_ADDED_TO_ROOM,
    CHAT_ROOMS_SET_ROOMS
} from './types';

export const loginEmailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const loginPasswordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({email, password}) => {
    return (dispatch) => {
        Keyboard.dismiss();

        dispatch({ type: LOGIN_USER });


        // TODO: REMOVE THIS HACK OF A CODE
        firebase.auth().signInWithEmailAndPassword('test@jordan.com', 'password123')
        // firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch(error => loginUserFail(dispatch, error));
    };
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    initChatkit(dispatch, user.uid);
};

const loginUserFail = (dispatch, { code, message }) => {

    // TODO: THIS NEEDS TO BE IN A SEPARATE FUNCTION
    let errorMessage = message;

    switch (code) {
        case 'auth/user-not-found':
            errorMessage = 'The email and password is invalid.';
            break;
        case 'auth/wrong-password':
            errorMessage = 'The password is invalid.';
            break;
        case 'auth/invalid-email':
            errorMessage = 'The email address is badly formatted.';
            break;
    }
    // REFACTOR TOP BLOCK

    dispatch({
        type: LOGIN_USER_FAIL
    });

    Toast.show({
        text: errorMessage,
        position: 'bottom',
        buttonText: ''
    });
};

export const logoutUser = () => {
    return (dispatch) => {
        firebase.auth().signOut()
            .then(() => logoutUserSuccess(dispatch))
            .catch(error => logoutUserFail(dispatch, error));
    };
};

const logoutUserSuccess = (dispatch) => {
    dispatch({
        type: LOGOUT_USER_SUCCESS
    });

    Actions.login({ type: 'reset' });
};

const logoutUserFail = (dispatch, { code, message }) => {
    dispatch({
        type: LOGOUT_USER_FAIL
    });

    Toast.show({
        text: message,
        position: 'bottom',
        buttonText: ''
    });
};

const initChatkit = (dispatch, userID) => {
    const chatManager = new ChatManager({
        instanceLocator: 'v1:us1:ce5dc7d7-09b5-4259-a8ce-55d1bcf999ea',
        userId: userID,
        tokenProvider: new TokenProvider({
            url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/ce5dc7d7-09b5-4259-a8ce-55d1bcf999ea/token'
        })
    });
    
    chatManager.connect({
        onAddedToRoom: room => {
            console.log(`Added to room ${room.name}`);

            dispatch({
                type: CHAT_ROOMS_ADDED_TO_ROOM,
                payload: room
            });
        }
    })
    .then(currentUser => {
        dispatch({
            type: LOGIN_CHAT_USER_SUCCESS,
            payload: currentUser
        });

        dispatch({
            type: CHAT_ROOMS_SET_ROOMS,
            payload: currentUser.rooms
        });

        Actions.main({ type: 'reset' });
    })
    .catch(err => {
        console.log('Error on connection', err);
    });
};
