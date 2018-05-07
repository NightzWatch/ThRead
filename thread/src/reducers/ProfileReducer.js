import {
    PROFILE_FETCH,
    PROFILE_SET
} from '../actions/types';

const INITIAL_STATE = {
    loading: true,
    doc_id: '',
    first_name: '',
    last_name: '',
    avatar: '',
    phone_number: '',
    contacts: [],
    contact_requests_received: [],
    contact_requests_sent: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROFILE_FETCH:
            return {...state, ...INITIAL_STATE};
        case PROFILE_SET:
            return {...state, ...INITIAL_STATE, loading: false, ...action.payload};
        default:
            return state;
    }
};
