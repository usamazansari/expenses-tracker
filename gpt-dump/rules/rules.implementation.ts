// Rules Implementation
// Add a transaction
firebase
  // @ts-ignore
  .firestore()
  .collection('pocketbooks')
  // @ts-ignore
  .doc(pocketbookId)
  .collection('transactions')
  .add({
    amount: 10,
    description: 'Some transaction'
    // Other transaction data
  });

// Edit a transaction
firebase
  // @ts-ignore
  .firestore()
  .collection('pocketbooks')
  // @ts-ignore
  .doc(pocketbookId)
  .collection('transactions')
  // @ts-ignore
  .doc(transactionId)
  .update({
    amount: 20,
    description: 'Updated transaction'
    // Other updated transaction data
  });

// Delete a transaction
firebase
  // @ts-ignore
  .firestore()
  .collection('pocketbooks')
  // @ts-ignore
  .doc(pocketbookId)
  .collection('transactions')
  // @ts-ignore
  .doc(transactionId)
  .delete();
