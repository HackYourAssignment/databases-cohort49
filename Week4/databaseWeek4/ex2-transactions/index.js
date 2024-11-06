const setupAccounts = require('./setup');
const transfer = require('./transfer');

async function main() {
    console.log("Setting up accounts...");
    await setupAccounts();

    console.log("Initiating transfer...");
    await transfer(101, 102, 1000, "Transfer to account 102");
}

main();
