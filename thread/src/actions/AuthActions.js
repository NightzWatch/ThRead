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
    CHAT_ROOMS_SET_ROOMS,
    PROFILE_FETCH,
    PROFILE_SET,
    CONTACTS_ADD,
    CONTACTS_RESET,
    CONTACTS_FETCHED,
    REQUESTS_SENT_ADD,
    REQUESTS_SENT_RESET,
    REQUESTS_SENT_FETCHED,
    REQUESTS_RECEIVED_ADD,
    REQUESTS_RECEIVED_RESET,
    REQUESTS_RECEIVED_FETCHED
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
        
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch(error => loginUserFail(dispatch, error));
    };
};

export const publicInitChatkit = (dispatch, userID) => {
    initChatkit(dispatch, userID);
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    initChatkit(dispatch, user.uid);
};


const initChatkit = (dispatch, userID) => {
    const chatManager = new ChatManager({
        instanceLocator: 'v1:us1:ce5dc7d7-09b5-4259-a8ce-55d1bcf999ea',
        userId: userID,
        tokenProvider: new TokenProvider({
            // TODO: CREATE LAMBDA FUNCTION TO AUTHENTICATE USER
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

        fetchProfile(dispatch, userID);

        Actions.main({ type: 'reset' });
    })
    .catch(err => {
        console.log('Error on connection', err);
    });
};

const fetchProfile = (dispatch, userID) => {
    dispatch({
        type: PROFILE_FETCH
    });

    const db = firebase.firestore();

    db.collection('users')
        .doc(userID)
        .onSnapshot(doc => {

            const data = doc.data();

            /**
             * UPDATE USER'S PROFILE
             */
            dispatch({
                type: PROFILE_SET,
                payload: {
                    ...data,
                    doc_id: userID
                }
            });

            /**
             * UPDATE USER'S CONTACTS
             */
            dispatch({ type: CONTACTS_RESET });

            data.contacts.forEach(contactID => {
                const contactRef = db.collection('users').doc(contactID);
    
                contactRef.get().then(contactDoc => {
                    const contactData = {
                        ...contactDoc.data(),
                        id: contactID
                    };

                    dispatch({
                        type: CONTACTS_ADD,
                        payload: contactData
                    });
                }).catch(function(error) {
                    console.log("Error getting contact document:", error);
                });
            });

            dispatch({ type: CONTACTS_FETCHED });

            /**
             * UPDATE USER'S REQUESTS SENT
             */
            dispatch({ type: REQUESTS_SENT_RESET });

            data.contact_requests_sent.forEach(requestUserID => {
                const requestUserRef = db.collection('users').doc(requestUserID);
    
                requestUserRef.get().then(requestUserDoc => {
                    const requestUserData = {
                        ...requestUserDoc.data(),
                        id: requestUserID
                    };

                    dispatch({
                        type: REQUESTS_SENT_ADD,
                        payload: requestUserData
                    });
                }).catch(function(error) {
                    console.log("Error getting sent user document:", error);
                });
            });

            dispatch({ type: REQUESTS_SENT_FETCHED });

            /**
             * UPDATE USER'S REQUESTS RECEIVED
             */
            dispatch({ type: REQUESTS_RECEIVED_RESET });

            data.contact_requests_received.forEach(requestUserID => {
                const requestUserRef = db.collection('users').doc(requestUserID);
    
                requestUserRef.get().then(requestUserDoc => {
                    const requestUserData = {
                        ...requestUserDoc.data(),
                        id: requestUserID
                    };

                    dispatch({
                        type: REQUESTS_RECEIVED_ADD,
                        payload: requestUserData
                    });
                }).catch(function(error) {
                    console.log("Error getting received user document:", error);
                });
            });

            dispatch({ type: REQUESTS_RECEIVED_FETCHED });

        });
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
