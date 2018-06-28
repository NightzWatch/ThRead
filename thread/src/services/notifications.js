import firebase from 'firebase';
import { Permissions, Notifications } from 'expo';

export const storeDevicePushTokenId = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        /*
            Android remote notification permissions are granted during the app
            install, so this will only ask on iOS
        */
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        return;
    }

    let token = await Notifications.getExpoPushTokenAsync();
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const docRef = db.doc(`users/${currentUser.uid}`);

    docRef.set({ token }, { merge: true })
        .then(() => console.log('Device saved push notification token successfully!'))
        .catch(error => console.warn(error));
};
