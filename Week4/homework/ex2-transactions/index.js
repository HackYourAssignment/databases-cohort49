import transfer from './transfer.js';

// Test the transfer function
transfer(101, 102, 1000, 'Payment for services')
  .then(() => console.log('Transaction complete'))
  .catch((error) => console.error('Error in transaction:', error));
