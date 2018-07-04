import { REGISTER_FAIL } from '../actions/types';
import { registerFail } from '../actions/index';

export default ({ dispatch, getState }) => next => action => {
    // Use next to skip to next action

    if (action.type === 'register_user') {
    const state = getState();

    const { phone_number, first_name, last_name, email, password, second_password } = state.register;

        if (!first_name) {
            registerFail(dispatch, { message: 'First name is missing.' });

            return false;
        }

        if (!last_name) {
            registerFail(dispatch, { message: 'Last name is missing.' });

            return false;
        }

        if (!phone_number) {
            registerFail(dispatch, { message: 'Phone number is missing.' });

            return false;
        }

        if (!password) {
            registerFail(dispatch, { message: 'Password is missing.' });

            return false;
        }

        if (password !== second_password) {
            registerFail(dispatch, { message: 'Password does not match.' });

            return false;
        }

        const Emailpatt = /[a-z0-9+/=?^_`{|}~-]+(?:\.[a-z0-9&!#$%'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
        const validEmail = Emailpatt.test(email);

        if (!validEmail) {
            registerFail(dispatch, { message: 'Invalid Email' });

            return false;
        }
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/gm;
        const validPassword = passwordRegex.test(password);

        if (!validPassword) {
            registerFail(dispatch, { message: 'Your password is not strong enough' });

            return false;
        }

        action.callback(dispatch, { first_name, last_name, email, phone_number, password });

    } else {
        next(action);
    }
};