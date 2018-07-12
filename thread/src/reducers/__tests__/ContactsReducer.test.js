import contactsReducer from '../ContactsReducer';
import {
    CONTACTS_ADD,
    CONTACTS_RESET,
    CONTACTS_FETCHED,
    CONTACTS_DATA_FETCHED
} from '../../actions/types';

let contact = {
    id: 'AipCxefrUlQfzS2PGHYeDyJEAYE3',
    avatar: '',
    date_created: new Date('Sun May 27 2018 13:51:32 GMT+0100'),
    email: 'because_I@m_batman.com',
    first_name: 'Bruce',
    last_name: 'Wayne',
    phone_number: '0201287321'
};

it('handles actions of the type CONTACTS_ADD', () => {
    const action = {
        type: CONTACTS_ADD,
        payload: contact
    };

    const newState = contactsReducer(undefined, action);

    expect(newState.contact_list).toEqual([contact]);
});

it('handles actions of the type CONTACTS_RESET', () => {
    const action = { type: CONTACTS_RESET };

    const newState = contactsReducer({
        contact_list: [contact],
        loading: false,
        size: 1
    }, action);
    
    expect(newState).toEqual({
        contact_list: [],
        loading: true,
        size: 0
    });
});

it('handles actions of the type CONTACTS_FETCHED', () => {
    const state = {
        contact_list: [],
        loading: true,
        size: 2
    };

    const action = {
        type: CONTACTS_FETCHED,
        payload: state
    };

    const newState = contactsReducer(undefined, action);

    expect(newState).toEqual(state);
});

it('handles actions of the type CONTACTS_DATA_FETCHED', () => {
    const action = {
        type: CONTACTS_DATA_FETCHED
    };

    const newState = contactsReducer({
        contact_list: [contact],
        loading: true,
        size: 1
    }, action);

    expect(newState).toEqual({
        contact_list: [contact],
        loading: false,
        size: 1
    });
});

it('handles action with unknown TYPE to return initial state', () => {
    const initialState = {
        contact_list: [],
        loading: true,
        size: 0
    };

    const newState = contactsReducer(undefined, {
        type: 'boba_fett'
    });

    expect(newState).toEqual(initialState);
});
