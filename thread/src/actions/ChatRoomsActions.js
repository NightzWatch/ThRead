import {
    CHAT_ROOMS_ADDED_TO_ROOM
} from './types';

export const chatRoomCreated = (room) => {
    return {
        type: CHAT_ROOMS_ADDED_TO_ROOM,
        payload: room
    };
};
