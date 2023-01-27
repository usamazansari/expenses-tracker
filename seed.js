const admin = require('firebase-admin');
const { faker } = require('@faker-js/faker');

process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8088';

const app = admin.initializeApp({
  projectId: 'ua-expenses-tracker'
});

const db = admin.firestore(app);

const seedDB = () => {
  try {
    Array.from({ length: 3 }).map((v, i) => {
      if (i === 2) {
        return db.collection('quanta').add({
          owner: '',
          title: `Quantum-${i + 1}`,
          collaborators: [],
          description: faker.commerce.productDescription()
        });
      }
      return db.collection('quanta').add({
        owner: '',
        title: `Quantum-${i + 1}`,
        description: faker.commerce.productDescription()
      });
    });
    Array.from({ length: 2 }).map((v, i) =>
      db.collection('quanta').add({
        owner: '',
        title: `Quantum-${i + 1}`,
        description: faker.finance.transactionDescription()
      })
    );
    console.log('db seeded');
  } catch (e) {
    console.log('db not seeded');
  }
};

seedDB();
