import {
    CHAT_ROOM_SET,
    CHAT_ROOM_ADD_USER
} from '../actions/types';

const INITIAL_STATE = {
    createdAt: '',
    createdByUserId: '',
    id: '',
    isPrivate: true,
    name: '',
    updatedAt: '',
    users: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHAT_ROOM_SET:
            return {...state, ...INITIAL_STATE, ...action.payload};
        case CHAT_ROOM_ADD_USER:
            return {...state, users: [...state.users, action.payload]};
        default:
            return state;
    }
};
