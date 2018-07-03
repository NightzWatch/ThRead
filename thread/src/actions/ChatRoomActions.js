import {
    CHAT_ROOM_SET,
    CHAT_ROOM_ADD_USER
} from './types';

export const setChatRoom = (room) => ({
    type: CHAT_ROOM_SET,
    payload: room
});

export const addUserToRoom = (user) => ({
    type: CHAT_ROOM_ADD_USER,
    payload: user
});
