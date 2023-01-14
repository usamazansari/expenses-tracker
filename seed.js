const admin = require('firebase-admin');
const faker = require('@faker-js/faker');

process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8088';

admin.initializeApp({
  projectId: 'ua-expenses-tracker'
});

const db = admin.firestore();

try {
  Array.from({ length: 10 }).map((v, i) =>
    db.collection('quanta').add({
      owner: faker.faker.internet.email(),
      title: `Quantum-${i + 1}`,
      description: faker.faker.commerce.productDescription()
    })
  );
  console.log('database seed was successful');
} catch (error) {
  console.log(error, 'database seed failed');
}
