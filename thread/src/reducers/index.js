import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RegisterReducer from './RegisterReducer';
import ResetPasswordReducer from './ResetPasswordReducer';
import ChatRoomReducer from './ChatRoomReducer';
import ChatRoomsReducer from './ChatRoomsReducer';
import ProfileReducer from './ProfileReducer';
import ContactsReducer from './ContactsReducer';
import RequestsSentReducer from './RequestsSentReducer';
import RequestsReceivedReducer from './RequestsReceivedReducer';

export default combineReducers({
    auth: AuthReducer,
    register: RegisterReducer,
    resetPassword: ResetPasswordReducer,
    chatRoom: ChatRoomReducer,
    chatRooms: ChatRoomsReducer,
    profile: ProfileReducer,
    contacts: ContactsReducer,
    requestsSent: RequestsSentReducer,
    requestsReceived: RequestsReceivedReducer
});
