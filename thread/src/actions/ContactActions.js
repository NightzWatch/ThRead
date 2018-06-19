import firebase from 'firebase';

// TODO: MOVE ALL THIS CODE BELOW TO THE SERVER (CREATE GOOGLE CLOUD FUNCTIONS)
export const createChatRoom = (chatUser, friendUserID, callback) => {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();

    chatUser.createRoom({
        name: currentUser.uid + friendUserID,
        private: true,
        addUserIds: [currentUser.uid, friendUserID]
    }).then(room => {
        callback(room);

        const currentUserRef = db.collection('users').doc(currentUser.uid);
        const friendRef = db.collection('users').doc(friendUserID);
        const batch = db.batch();

        const currentUserContactRef = currentUserRef
            .collection('contacts')
            .doc(friendUserID);
        
        const friendContactRef = friendRef
            .collection('contacts')
            .doc(currentUser.uid);
        
        batch.update(currentUserContactRef, { room_id: room.id });
        batch.update(friendContactRef, { room_id: room.id });

        batch.commit()
            .then(() => {
                console.log('Successfully created room for direct messaging');
            })
            .catch(error => {
                console.log('Error performing batch updates on contacts to store room ID: ', error);
            });
    })
    .catch(err => {
        console.log(`Error creating direct messaging room ${err}`);
    });
};

export const sendRequest = (phone_number) => {
    const db = firebase.firestore();
    const usersRef = db.collection('users');
    const userRef = usersRef.where('phone_number', '==', phone_number);

    const { currentUser } = firebase.auth();
    const currentUserRef = db.collection('users').doc(currentUser.uid);

    userRef.get().then(querySnapshot => {
        const batch = db.batch();
        const requestedUserDoc = querySnapshot.docs[0];
        const requestedUserData = requestedUserDoc.data();
        const requestedUserRef = requestedUserDoc.ref;

        const currentUserRequestsSentRef = currentUserRef
            .collection('contact_requests_sent')
            .doc(requestedUserDoc.id);
        
        const requestorRequestsReceivedRef = requestedUserRef
            .collection('contact_requests_received')
            .doc(currentUser.uid);

        batch.set(currentUserRequestsSentRef, {
            user_id: requestedUserDoc.id,
            user_ref: requestedUserRef,
            date_created: new Date()
        });

        batch.set(requestorRequestsReceivedRef, {
            user_id: currentUser.uid,
            user_ref: currentUserRef,
            date_created: new Date()
        });

        batch.commit()
            .then(() => {
                console.log('Current user has successfully sent request');
            })
            .catch(error => {
                console.log('Error performing batch updates on contact request: ', error);
            });
    }).catch(error => {
        console.log('Error getting requested user document: ', error);
    });
};

export const acceptRequest = (requestorID) => {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const batch = db.batch();
    const currentUserRef = db.collection('users').doc(currentUser.uid);
    const requestorRef = db.collection('users').doc(requestorID);
    
    const currentUserContactsRef = currentUserRef
        .collection('contacts')
        .doc(requestorID);
    
    const requestorContactsRef = requestorRef
        .collection('contacts')
        .doc(currentUser.uid);
    
    const currentUserRequestsReceivedRef = currentUserRef
        .collection('contact_requests_received')
        .doc(requestorID);
    
    const requestorRequestsReceivedRef = requestorRef
        .collection('contact_requests_received')
        .doc(currentUser.uid);
    
    const currentUserRequestsSentRef = currentUserRef
        .collection('contact_requests_sent')
        .doc(requestorID);
    
    const requestorRequestsSentRef = requestorRef
        .collection('contact_requests_sent')
        .doc(currentUser.uid);

    batch.set(currentUserContactsRef, {
        user_id: requestorID,
        doc_ref: requestorRef,
        room_id: '',
        date_created: new Date()
    });
    
    batch.set(requestorContactsRef, {
        user_id: currentUser.uid,
        doc_ref: currentUserRef,
        room_id: '',
        date_created: new Date()
    });

    batch.delete(currentUserRequestsReceivedRef);
    batch.delete(requestorRequestsReceivedRef);
    batch.delete(currentUserRequestsSentRef);
    batch.delete(requestorRequestsSentRef);

    batch.commit()
        .then(() => {
            console.log('Current user has successfully accepted request');
        })
        .catch(error => {
            console.log('Error performing batch updates on accepting request: ', error);
        });
};
