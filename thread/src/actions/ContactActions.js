import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const sendRequest = (phone_number) => {
    const db = firebase.firestore();
    const usersRef = db.collection('users');
    const userRef = usersRef.where('phone_number', '==', phone_number);
    const { currentUser } = firebase.auth();
    const currentUserRef = db.collection('users').doc(currentUser.uid);

    userRef.get().then(querySnapshot => {       
        const requestedUserDoc = querySnapshot.docs[0];
        const requestedUserData = requestedUserDoc.data();
        const requestedUserRef = requestedUserDoc.ref;

        if (requestedUserData.contact_requests_received.indexOf(currentUser.uid) === -1) {
            requestedUserRef.set({
                contact_requests_received: [...requestedUserData.contact_requests_received, currentUser.uid]
            }, { merge: true });
        }

        currentUserRef.get().then(userDoc => {
            const userData = userDoc.data();

            if (userData.contact_requests_sent.indexOf(requestedUserDoc.id) === -1) {
                currentUserRef.set({
                    contact_requests_sent: [...userData.contact_requests_sent, requestedUserDoc.id]
                }, { merge: true });
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
};

export const acceptRequest = (requestorID) => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();

    const currentUserRef = db.collection('users').doc(currentUser.uid);
    const requestorRef = db.collection('users').doc(requestorID);

    requestorRef.get().then(userDoc => {
        if (userDoc.exists) {
            const userData = userDoc.data();
            const userArrayIndex = userData.contact_requests_sent.indexOf(currentUser.uid);

            if (userArrayIndex !== -1) {
                userData.contact_requests_received.splice(userArrayIndex, 1);
                userData.contact_requests_sent.splice(userArrayIndex, 1);

                requestorRef.set({
                    contact_requests_sent: userData.contact_requests_sent,
                    contact_requests_received: userData.contact_requests_received,
                    contacts: [...userData.contacts, currentUser.uid]
                }, { merge: true });
            }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    currentUserRef.get().then(userDoc => {
        if (userDoc.exists) {
            const userData = userDoc.data();
            const userArrayIndex = userData.contact_requests_received.indexOf(requestorID);

            if (userArrayIndex !== -1) {
                userData.contact_requests_received.splice(userArrayIndex, 1);
                userData.contact_requests_sent.splice(userArrayIndex, 1);

                currentUserRef.set({
                    contact_requests_sent: userData.contact_requests_sent,
                    contact_requests_received: userData.contact_requests_received,
                    contacts: [...userData.contacts, requestorID]
                }, { merge: true });
            }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
};
