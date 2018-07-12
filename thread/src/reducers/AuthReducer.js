import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    REGISTER_SUCCESS,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    LOGIN_CHAT_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    chatUser: null,
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return {...state, email: action.payload};
        case PASSWORD_CHANGED:
            return {...state, password: action.payload};
        case LOGIN_USER:
            return {...state, loading: true};
        case REGISTER_SUCCESS:
        case LOGIN_USER_SUCCESS:
            return {...state, user: action.payload};
        case LOGIN_USER_FAIL:
            return {...state, password: '', loading: false};
        case LOGOUT_USER_SUCCESS:
            return {...state, ...INITIAL_STATE};
        case LOGIN_CHAT_USER_SUCCESS:
            return {...state, ...INITIAL_STATE, user: state.user, chatUser: action.payload};
        case LOGOUT_USER_FAIL:
            return state;
        default:
            return state;
    }
};
