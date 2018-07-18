import {
    REGISTER_EMAIL_CHANGED,
    REGISTER_FIRST_NAME_CHANGED,
    REGISTER_LAST_NAME_CHANGED,
    REGISTER_PHONE_CHANGED,
    REGISTER_PASSWORD_CHANGED,
    REGISTER_SECOND_PASSWORD_CHANGED,
    REGISTER_PHONE_EXT_CHANGED,
    REGISTER_USER,
    REGISTER_FAIL,
    LOGIN_CHAT_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    password: '',
    second_password: '',
    phone_ext: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTER_EMAIL_CHANGED:
            return {...state, email: action.payload};
        case REGISTER_FIRST_NAME_CHANGED:
            return {...state, first_name: action.payload};
        case REGISTER_LAST_NAME_CHANGED:
            return {...state, last_name: action.payload};
        case REGISTER_PHONE_CHANGED:
            return {...state, phone_number: action.payload};
        case REGISTER_PASSWORD_CHANGED:
            return {...state, password: action.payload};
        case REGISTER_SECOND_PASSWORD_CHANGED:
            return {...state, second_password: action.payload};
        case REGISTER_PHONE_EXT_CHANGED:
            return {...state, phone_ext: action.payload};
        case REGISTER_USER:
            return {...state, loading: true};
        case LOGIN_CHAT_USER_SUCCESS:
            return {...state, ...INITIAL_STATE};
        case REGISTER_FAIL:
            return {...state, loading: false};
        default:
            return state;
    }
};
