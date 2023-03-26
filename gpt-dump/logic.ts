// @ts-ignore
const db = firebase.firestore();
const TRANSACTIONS_PER_PAGE = 50;
const transactions: any[] = [];
let balance = 0;
let lastTransactionTimestamp: unknown = null;

// Fetch the first page of transactions from Firestore
fetchTransactionsPage();

// Listen for new transactions
db.collection('transactions')
  .orderBy('timestamp')
  .startAfter(lastTransactionTimestamp)
  .onSnapshot((snapshot: { docChanges: () => any[] }) => {
    snapshot.docChanges().forEach((change: { doc: { data: () => any }; type: string }) => {
      const transaction = change.doc.data();
      if (change.type === 'added') {
        // Add the new transaction to the array and update the balance
        transactions.push(transaction);
        balance += transaction.amount;
      } else if (change.type === 'removed') {
        // Remove the deleted transaction from the array and update the balance
        const index = transactions.findIndex(t => t.timestamp === transaction.timestamp);
        if (index >= 0) {
          transactions.splice(index, 1);
          balance -= transaction.amount;
        }
      }
      // Update the UI with the new balance
      updateBalanceUI();
    });
  });

function fetchTransactionsPage() {
  let query = db.collection('transactions').orderBy('timestamp').limit(TRANSACTIONS_PER_PAGE);
  if (lastTransactionTimestamp) {
    query = query.startAfter(lastTransactionTimestamp);
  }
  query
    .get()
    .then(
      (querySnapshot: {
        size: number;
        docs: { data: () => { (): any; new (): any; timestamp: any } }[];
        forEach: (arg0: (doc: any) => void) => void;
      }) => {
        if (querySnapshot.size > 0) {
          // Update the last transaction timestamp to fetch the next page
          lastTransactionTimestamp =
            querySnapshot.docs[querySnapshot.size - 1].data().timestamp;
          // Update the transactions array and balance
          querySnapshot.forEach((doc: { data: () => any }) => {
            const transaction = doc.data();
            transactions.push(transaction);
            balance += transaction.amount;
          });
          // Update the UI with the new balance
          updateBalanceUI();
        }
      }
    );
}

function updateBalanceUI() {
  // Update the UI with the current balance
  // For example:
  // @ts-ignore
  document.getElementById('balance')?.innerText = balance.toFixed(2);
}

// Load more transactions when the user scrolls to the bottom of the page
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    fetchTransactionsPage();
  }
});
