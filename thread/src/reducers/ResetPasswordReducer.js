import {
    RESET_PASSWORD_FIRST_EMAIL_CHANGED,
    RESET_PASSWORD_SECOND_EMAIL_CHANGED,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    first_email: '',
    second_email: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESET_PASSWORD_FIRST_EMAIL_CHANGED:
            return {...state, first_email: action.payload};
        case RESET_PASSWORD_SECOND_EMAIL_CHANGED:
            return {...state, second_email: action.payload};
        case RESET_PASSWORD:
            return {...state, loading: true};
        case RESET_PASSWORD_FAIL:
            return {...state, loading: false};
        case RESET_PASSWORD_SUCCESS:
            return {...state, ...INITIAL_STATE};
        default:
            return state;
    }
};
