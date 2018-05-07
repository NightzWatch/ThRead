import {
    REQUESTS_SENT_ADD,
    REQUESTS_SENT_RESET,
    REQUESTS_SENT_FETCHED
} from '../actions/types';

const INITIAL_STATE = {
    requests_sent_list: [],
    loading: true
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REQUESTS_SENT_ADD:
            return {...state, requests_sent_list: [...state.requests_sent_list, action.payload]};
        case REQUESTS_SENT_RESET:
            return {...state, ...INITIAL_STATE};
        case REQUESTS_SENT_FETCHED:
            return {...state, loading: false};
        default:
            return state;
    }
};
