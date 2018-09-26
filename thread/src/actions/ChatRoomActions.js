import {
    CHAT_ROOM_SET,
    CHAT_ROOM_ADD_USER,
    CHAT_ROOM_CLEAR
} from './types';

export const setChatRoom = room => ({
    type: CHAT_ROOM_SET,
    payload: room
});

export const addUserToRoom = user => ({
    type: CHAT_ROOM_ADD_USER,
    payload: user
});

export const clearChatRoom = () => ({
    type: CHAT_ROOM_CLEAR
});
