import {
    CONTACTS_ADD,
    CONTACTS_RESET,
    CONTACTS_FETCHED
} from '../actions/types';

const INITIAL_STATE = {
    contact_list: [],
    loading: true
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CONTACTS_ADD:
            return {...state, contact_list: [...state.contact_list, action.payload]};
        case CONTACTS_RESET:
            return {...state, ...INITIAL_STATE};
        case CONTACTS_FETCHED:
            return {...state, loading: false};
        default:
            return state;
    }
};
