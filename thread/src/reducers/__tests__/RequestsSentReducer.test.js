import requestsSentReducer from '../RequestsSentReducer';
import {
    REQUESTS_SENT_ADD,
    REQUESTS_SENT_RESET,
    REQUESTS_SENT_FETCHED,
    REQUESTS_SENT_DATA_FETCHED
} from '../../actions/types';

let request_sent_record = {
    id: 'JFs478OvInQ7qzvFSOsP7Qa3umV2',
    date_sent: new Date('Sun May 27 2018 13:51:32 GMT+0100'),
    email: 'Jordan@test.com',
    first_name: 'Jordan',
    last_name: 'Rios',
    phone_number: '075126152112'
};

it('handles actions of the type REQUESTS_SENT_ADD', () => {
    const action = {
        type: REQUESTS_SENT_ADD,
        payload: request_sent_record
    };

    const newState = requestsSentReducer(undefined, action);

    expect(newState.requests_sent_list).toEqual([request_sent_record]);
});

it('handles actions of the type REQUESTS_SENT_RESET', () => {
    const action = { type: REQUESTS_SENT_RESET };

    const newState = requestsSentReducer({
        requests_sent_list: [request_sent_record],
        loading: false,
        size: 1
    }, action);

    expect(newState).toEqual({
        requests_sent_list: [],
        loading: true,
        size: 0
    });
});

it('handles actions of the type REQUESTS_SENT_FETCHED', () => {
    const state = {
        requests_sent_list: [],
        loading: true,
        size: 2
    };

    const action = {
        type: REQUESTS_SENT_FETCHED,
        payload: state
    };

    const newState = requestsSentReducer(undefined, action);

    expect(newState).toEqual(state);
});

it('handles actions of the type REQUESTS_SENT_DATA_FETCHED', () => {
    const action = {
        type: REQUESTS_SENT_DATA_FETCHED
    };

    const newState = requestsSentReducer({
        requests_sent_list: [request_sent_record],
        loading: true,
        size: 1
    }, action);

    expect(newState).toEqual({
        requests_sent_list: [request_sent_record],
        loading: false,
        size: 1
    });
});

it('handles action with unknown TYPE to return initial state', () => {
    const initialState = {
        requests_sent_list: [],
        loading: true,
        size: 0
    };

    const newState = requestsSentReducer(undefined, {
        type: 'boba_fett'
    });

    expect(newState).toEqual(initialState);
});
