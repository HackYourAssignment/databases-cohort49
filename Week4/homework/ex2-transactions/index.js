import setupAccounts from "./setup.js";
import transfer from "./transfer.js";

const transferMoney = async () => {
  await setupAccounts();
  await transfer(101, 102, 1000, "gift");
};

transferMoney();
