/* eslint-disable no-plusplus */
// NOTE: replace 'NvPY9M9MzFTARQ6M816YAzDJxZ72' with your Firebase auth user id (can be taken from Firebase)
export function seedDatabase(firebase) {
  const users = [
    {
      userId: 'NvPY9M9MzFTARQ6M816YAzDJxZ72',
      username: 'karl',
      fullName: 'Karl Hadwen',
      emailAddress: 'karlhadwen@gmail.com',
      following: ['2'],
      followers: ['2', '3', '4'],
      dateCreated: Date.now()
    },
    {
      userId: '2',
      username: 'raphael',
      fullName: 'Raffaello Sanzio da Urbino',
      emailAddress: 'raphael@sanzio.com',
      following: [],
      followers: ['NvPY9M9MzFTARQ6M816YAzDJxZ72'],
      dateCreated: Date.now()
    },
    {
      userId: '3',
      username: 'dali',
      fullName: 'Salvador Dalí',
      emailAddress: 'salvador@dali.com',
      following: [],
      followers: ['NvPY9M9MzFTARQ6M816YAzDJxZ72'],
      dateCreated: Date.now()
    },
    {
      userId: '4',
      username: 'orwell',
      fullName: 'George Orwell',
      emailAddress: 'george@orwell.com',
      following: [],
      followers: ['NvPY9M9MzFTARQ6M816YAzDJxZ72'],
      dateCreated: Date.now()
    }
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection('users').add(users[k]);
  }

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection('photos')
      .add({
        photoId: i,
        userId: '2',
        imagesSrc: [
            `/images/https://firebasestorage.googleapis.com/v0/b/fir-c2322.appspot.com/o/images%2F287f1667-9da8-4324-b740-387d7e77a55d.jpg?alt=media&token=acbe9f05-e88b-4f8b-b602-eb91ba425a11`,
            `/images/https://firebasestorage.googleapis.com/v0/b/fir-c2322.appspot.com/o/images%2F287f1667-9da8-4324-b740-387d7e77a55d.jpg?alt=media&token=acbe9f05-e88b-4f8b-b602-eb91ba425a11`,
            `/images/https://firebasestorage.googleapis.com/v0/b/fir-c2322.appspot.com/o/images%2F10bb6f12-05d4-4be3-9143-894a39863f67.jpg?alt=media&token=24d63052-3877-407f-979d-b9557d7221e1`,
        ],
        caption: 'Saint George and the Dragon',
        likes: [],
        comments: [
          {
            displayName: 'dali',
            comment: 'Love this place, looks like my animal farm!'
          },
          {
            displayName: 'orwell',
            comment: 'Would you mind if I used this picture?'
          }
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now()
      });
  }
}
