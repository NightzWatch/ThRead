import { REGISTER_FAIL } from '../actions/types';
import { registerFail, registerPhoneChanged } from '../actions/index';

import axios from 'axios';

export default ({ dispatch, getState }) => next => async action => {

    if (action.type === 'register_user') {
    const state = getState();

    const { phone_number, first_name, last_name, email, password, second_password, phone_ext } = state.register;

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

        const response = await registerPhone(phone_number, phone_ext);
        if (!response.data.valid ) {
            registerFail(dispatch, { message: 'Phone number is invalid.' });

            return false;
        }

        if (!password) {
            registerFail(dispatch, { message: 'Password is missing.' });

            return false;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/gm;
        const validPassword = passwordRegex.test(password);

        if (!validPassword) {
            registerFail(dispatch, { message: 'Your password is not strong enough' });

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

        action.callback(dispatch, { first_name, last_name, email, phone_number, password });

    } else {
        next(action);
    }
};


const registerPhone = (phone_number, phone_ext) => {
    // TODO server this key
    const accessKey = 'f4ee1c095e8c6daca7309a617fc29d61';
    const endpoint = `http://apilayer.net/api/validate?access_key=${accessKey}&number=${phone_number}&country_code=${phone_ext}`;
    return axios.get(endpoint);
}

