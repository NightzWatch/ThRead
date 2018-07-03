import {
    REQUESTS_RECEIVED_ADD,
    REQUESTS_RECEIVED_RESET,
    REQUESTS_RECEIVED_FETCHED,
    REQUESTS_RECEIVED_DATA_FETCHED
} from '../actions/types';

const INITIAL_STATE = {
    requests_received_list: [],
    loading: true,
    size: 0
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REQUESTS_RECEIVED_ADD:
            return {...state, requests_received_list: [...state.requests_received_list, action.payload]};
        case REQUESTS_RECEIVED_RESET:
            return {...state, ...INITIAL_STATE};
        case REQUESTS_RECEIVED_FETCHED:
            return {...state, ...action.payload};
        case REQUESTS_RECEIVED_DATA_FETCHED:
            return {...state, loading: false};
        default:
            return state;
    }
};
