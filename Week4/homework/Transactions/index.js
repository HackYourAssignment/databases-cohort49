const { transferAmount } = require('./transfer');

// Transfer 1000 from account 101 to account 102 with a remark
transferAmount(101, 102, 1000, 'Payment for services').catch(console.error);
