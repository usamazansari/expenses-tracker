const admin = require('firebase-admin');
const { faker } = require('@faker-js/faker');

process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8088';
process.env.AUTH_EMULATOR_HOST = 'localhost:9099';

const app = admin.initializeApp({
  projectId: 'ua-expenses-tracker'
});

const firestore = admin.firestore(app);
// const auth = admin.auth(app);

// console.log({ app, auth, db: firestore });

const seedDB = () => {
  try {
    // auth.createUser({ email: 'usama@gmail', password: '123456789', uid: '1' });
    // auth.createUser({ email: 'eram@gmail', password: '123456789', uid: '2' });
    // auth.createUser({ email: 'aamir@gmail', password: '123456789', uid: '3' });
    Array.from({ length: 3 }).map((v, i) =>
      firestore.collection('pocketbooks').add({
        owner: '',
        title: `Pocketbook-${i + 1}`,
        collaborators: [],
        description: faker.commerce.productDescription()
      })
    );
    console.log('db seeded');
  } catch (e) {
    console.error({ e });
    console.log('db not seeded');
  }
};

seedDB();
