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
    CONTACTS_DATA_FETCHED,
    REQUESTS_SENT_ADD,
    REQUESTS_SENT_RESET,
    REQUESTS_SENT_FETCHED,
    REQUESTS_SENT_DATA_FETCHED,
    REQUESTS_RECEIVED_ADD,
    REQUESTS_RECEIVED_RESET,
    REQUESTS_RECEIVED_FETCHED,
    REQUESTS_RECEIVED_DATA_FETCHED
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
        
        // firebase.auth().signInWithEmailAndPassword(email, password)
        firebase.auth().signInWithEmailAndPassword('test@jordan.com', 'password123')
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


const initChatkit = (dispatch, userId) => {
    const chatManager = new ChatManager({
        userId,
        instanceLocator: 'v1:us1:ce5dc7d7-09b5-4259-a8ce-55d1bcf999ea',
        tokenProvider: new TokenProvider({
            url: 'https://us-central1-reactnative-auth-66287.cloudfunctions.net/chatkitAuthToken',
            queryParams: { userId }
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

        fetchProfile(dispatch, userId);

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

    /**
     * UPDATE USER'S PROFILE
     */
    db.collection('users')
        .doc(userID)
        .onSnapshot(doc => {
            const data = doc.data();

            dispatch({
                type: PROFILE_SET,
                payload: {
                    ...data,
                    doc_id: userID
                }
            });
        });

    /**
     * USER'S CONTACTS
     */

    db.collection('users')
        .doc(userID)
        .collection('contacts')
        .onSnapshot(querySnapshot => {
            dispatch({ type: CONTACTS_RESET });

            const { size } = querySnapshot;
            let index = 0;

            querySnapshot.forEach(contact_doc => {
                const data = {id: contact_doc.id, ...contact_doc.data()};
                const contactRef = db.collection('users').doc(data.id);

                contactRef.get().then(contactDoc => {
                    const contactData = {
                        ...contactDoc.data(),
                        ...data
                    };
                    
                    dispatch({
                        type: CONTACTS_ADD,
                        payload: contactData
                    });
                    
                    if ((index + 1) === size) {
                        dispatch({
                            type: CONTACTS_DATA_FETCHED
                        });
                    }

                    index++;
                });
            });

            dispatch({
                type: CONTACTS_FETCHED,
                payload: {
                    size,
                    loading: (size > 0)
                }
            });
        });
    
    /**
     * UPDATE USER'S REQUESTS SENT
     */
    db.collection('users')
        .doc(userID)
        .collection('contact_requests_sent')
        .onSnapshot(querySnapshot => {
            dispatch({ type: REQUESTS_SENT_RESET });

            const { size } = querySnapshot;
            let index = 0;

            querySnapshot.forEach(doc => {
                const data = doc.data();
                const contactRef = data.user_ref;

                contactRef.get().then(contactDoc => {
                    const contactData = {
                        ...contactDoc.data(),
                        date_sent: data.date_created
                    };
                    
                    dispatch({
                        type: REQUESTS_SENT_ADD,
                        payload: contactData
                    });
                    
                    if ((index + 1) === size) {
                        dispatch({
                            type: REQUESTS_SENT_DATA_FETCHED
                        });
                    }

                    index++;
                }).catch(error => console.log('error getting contact requests sent: ', error));
            });

            dispatch({
                type: REQUESTS_SENT_FETCHED,
                payload: {
                    size,
                    loading: (size > 0)
                }
            });
        });

    /**
     * UPDATE USER'S REQUESTS RECEIVED
     */
    db.collection('users')
        .doc(userID)
        .collection('contact_requests_received')
        .onSnapshot(querySnapshot => {
            dispatch({ type: REQUESTS_RECEIVED_RESET });

            const { size } = querySnapshot;
            let index = 0;

            querySnapshot.forEach(doc => {
                const data = doc.data();
                const contactRef = data.user_ref;

                contactRef.get().then(contactDoc => {
                    const contactData = {
                        ...contactDoc.data(),
                        date_received: data.date_created
                    };

                    dispatch({
                        type: REQUESTS_RECEIVED_ADD,
                        payload: contactData
                    });

                    if ((index + 1) === size) {
                        dispatch({
                            type: REQUESTS_RECEIVED_DATA_FETCHED
                        });
                    }

                    index++;
                }).catch(error => console.log('error getting contact requests received: ', error));
            });

            dispatch({
                type: REQUESTS_RECEIVED_FETCHED,
                payload: {
                    size,
                    loading: (size > 0)
                }
            });
        });
};

const loginUserFail = (dispatch, { code, message }) => {
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
