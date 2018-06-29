import firebase from 'firebase';
import { Permissions, Notifications } from 'expo';
import { showMessage } from "react-native-flash-message";

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

export const handleIncomingNotification = async (notification, chatRoom, rooms, textSuccessCallback) => {
    /**
     * On iOS, when the notifications badge is set to zero, all the notifications are cleared
     */
    await Notifications.setBadgeNumberAsync(0);

    const { type } = notification.data;
    
    if (type === 'text') {
        const { roomID, isGroup, message, title } = notification.data;
        const isUserNotInRoom = chatRoom.id !== roomID;

        const redirectAction = () => {
            const room = rooms.find(room => room.id === roomID);
            textSuccessCallback(room, isGroup);
        };

        if (notification.origin === 'selected' && isUserNotInRoom) {
            redirectAction();
        } else if (notification.origin === 'received' && isUserNotInRoom) {
            showMessage({
                message: title,
                description: message,
                type: "success",
                duration: 2000,
                onPress: () => redirectAction()
            });
        }
    } else if (type === 'contact_request') {
        const { message } = notification.data;

        if (notification.origin === 'received') {
            showMessage({
                message: 'Contact Request',
                description: message,
                type: "success",
                duration: 2000
            });
        }
    }

    return notification;
};
