import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RegisterReducer from './RegisterReducer';
import ResetPasswordReducer from './ResetPasswordReducer';
import ChatRoomsReducer from './ChatRoomsReducer';
import ProfileReducer from './ProfileReducer';

export default combineReducers({
    auth: AuthReducer,
    register: RegisterReducer,
    resetPassword: ResetPasswordReducer,
    chatRooms: ChatRoomsReducer,
    profile: ProfileReducer
});
