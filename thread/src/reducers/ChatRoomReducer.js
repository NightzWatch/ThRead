import {
    CHAT_ROOM_SET,
    CHAT_ROOM_ADD_USER,
    CHAT_ROOM_CLEAR
} from '../actions/types';

const INITIAL_STATE = {
    createdAt: '',
    createdByUserId: '',
    id: '',
    isPrivate: true,
    isGroup: true,
    name: '',
    updatedAt: '',
    users: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHAT_ROOM_SET:
            return { ...state, ...INITIAL_STATE, ...action.payload };
        case CHAT_ROOM_ADD_USER:
            return { ...state, users: [...state.users, action.payload] };
        case CHAT_ROOM_CLEAR:
            return { ...state, ...INITIAL_STATE };
        default:
            return state;
    }
};
