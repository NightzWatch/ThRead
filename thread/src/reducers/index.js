import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RegisterReducer from './RegisterReducer';
import ResetPasswordReducer from './ResetPasswordReducer';
import ChatRoomsReducer from './ChatRoomsReducer';

export default combineReducers({
    auth: AuthReducer,
    register: RegisterReducer,
    resetPassword: ResetPasswordReducer,
    chatRooms: ChatRoomsReducer
});
