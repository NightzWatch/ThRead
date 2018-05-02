import {
    CHAT_ROOMS_ADDED_TO_ROOM,
    CHAT_ROOMS_SET_ROOMS
} from '../actions/types';

const INITIAL_STATE = {
    rooms: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHAT_ROOMS_ADDED_TO_ROOM:
            return {...state, rooms: [...state.rooms, action.payload]};
        case CHAT_ROOMS_SET_ROOMS:
            return {...state, rooms: action.payload};
        default:
            return state;
    }
};
