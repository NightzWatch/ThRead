import { Keyboard } from 'react-native';
import { Toast } from 'native-base';
import firebase from 'firebase';
import {
    RESET_PASSWORD_FIRST_EMAIL_CHANGED,
    RESET_PASSWORD_SECOND_EMAIL_CHANGED,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL
} from './types';

export const firstEmailChanged = (text) => ({
    type: RESET_PASSWORD_FIRST_EMAIL_CHANGED,
    payload: text
});

export const secondEmailChanged = (text) => ({
    type: RESET_PASSWORD_SECOND_EMAIL_CHANGED,
    payload: text
});

export const resetPassword = ({ first_email, second_email }) => {
    return (dispatch) => {
        Keyboard.dismiss();
        dispatch({ type: RESET_PASSWORD });

        if (first_email !== second_email) {
            resetPasswordFail(dispatch, { message: 'Emails do not match.' });

            return false;
        }
    
        firebase.auth().sendPasswordResetEmail(first_email)
            .then(() => resetPasswordSuccess(dispatch))
            .catch(error => resetPasswordFail(dispatch, error));
    };
};

const resetPasswordSuccess = (dispatch) => {
    dispatch({ type: RESET_PASSWORD_SUCCESS });

    Toast.show({
        text: 'Email has been sent.',
        position: 'bottom',
        buttonText: ''
    });
};

const resetPasswordFail = (dispatch, { message }) => {
    dispatch({ type: RESET_PASSWORD_FAIL });

    Toast.show({
        text: message,
        position: 'bottom',
        buttonText: '',
        duration: 1500
    });
};
