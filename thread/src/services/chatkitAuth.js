import { ChatManager, TokenProvider } from '@pusher/chatkit';

export const initChatkit = async (dispatch, userId, actionTypes, successCallback) => {
    const { CHAT_ROOMS_ADDED_TO_ROOM, LOGIN_CHAT_USER_SUCCESS, CHAT_ROOMS_SET_ROOMS } = actionTypes;
    const chatManager = new ChatManager({
        userId,
        instanceLocator: 'v1:us1:ce5dc7d7-09b5-4259-a8ce-55d1bcf999ea',
        tokenProvider: new TokenProvider({
            url: 'https://us-central1-reactnative-auth-66287.cloudfunctions.net/chatkitAuthToken',
            queryParams: { userId }
        })
    });
 
    try {
        const currentUser = await chatManager.connect({
            onAddedToRoom: room => {
                dispatch({
                    type: CHAT_ROOMS_ADDED_TO_ROOM,
                    payload: room
                });
            }
        });

        dispatch({
            type: LOGIN_CHAT_USER_SUCCESS,
            payload: currentUser
        });

        dispatch({
            type: CHAT_ROOMS_SET_ROOMS,
            payload: currentUser.rooms
        });

        successCallback();
    } catch (err) {
        console.log('Error on chatkit connection: ', err);   
    }
};
