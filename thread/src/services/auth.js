import { SecureStore } from 'expo';

export const storeUserAuthDetailsOnDevice = async (email, password) => {
    try {
        await SecureStore.setItemAsync('email', email);
        await SecureStore.setItemAsync('password', password);        
    } catch (error) {
        console.warn('Storing encrypted user auth details error: ', error);
    }
};

export const deleteUserAuthDetailsFromDevice = async () => {
    try {
        await SecureStore.deleteItemAsync('email');
        await SecureStore.deleteItemAsync('password');
    } catch (error) {
        console.warn('Deleting encrypted user auth details error: ', error);
    }
};
