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
