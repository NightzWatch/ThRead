import requestsReceivedReducer from '../RequestsReceivedReducer';
import {
    REQUESTS_RECEIVED_ADD,
    REQUESTS_RECEIVED_RESET,
    REQUESTS_RECEIVED_FETCHED,
    REQUESTS_RECEIVED_DATA_FETCHED
} from '../../actions/types';

let request_received_record = {
    id: '2OVqu6vHECez9yT8EilySjxdUOD3',
    date_received: new Date('Sun May 27 2018 13:51:32 GMT+0100'),
    email: 'Mario@test.com',
    first_name: 'Mario',
    last_name: 'Bros',
    phone_number: '1138912312'
};

it('handles actions of the type REQUESTS_RECEIVED_ADD', () => {
    const action = {
        type: REQUESTS_RECEIVED_ADD,
        payload: request_received_record
    };

    const newState = requestsReceivedReducer(undefined, action);

    expect(newState.requests_received_list).toEqual([request_received_record]);
});

it('handles actions of the type REQUESTS_RECEIVED_RESET', () => {
    const action = { type: REQUESTS_RECEIVED_RESET };

    const newState = requestsReceivedReducer({
        requests_received_list: [request_received_record],
        loading: false,
        size: 1
    }, action);

    expect(newState).toEqual({
        requests_received_list: [],
        loading: true,
        size: 0
    });
});

it('handles actions of the type REQUESTS_RECEIVED_FETCHED', () => {
    const state = {
        requests_received_list: [],
        loading: true,
        size: 2
    };

    const action = {
        type: REQUESTS_RECEIVED_FETCHED,
        payload: state
    };

    const newState = requestsReceivedReducer(undefined, action);

    expect(newState).toEqual(state);
});

it('handles actions of the type REQUESTS_RECEIVED_DATA_FETCHED', () => {
    const action = {
        type: REQUESTS_RECEIVED_DATA_FETCHED
    };

    const newState = requestsReceivedReducer({
        requests_received_list: [request_received_record],
        loading: true,
        size: 1
    }, action);

    expect(newState).toEqual({
        requests_received_list: [request_received_record],
        loading: false,
        size: 1
    });
});

it('handles action with unknown TYPE to return initial state', () => {
    const initialState = {
        requests_received_list: [],
        loading: true,
        size: 0
    };

    const newState = requestsReceivedReducer(undefined, {
        type: 'boba_fett'
    });

    expect(newState).toEqual(initialState);
});
