import { setupDatabase ,CLIENT} from "./setup.js";
import { transfer } from "./transfer.js";

const main = async () => {
  try {
    await setupDatabase();
    await transfer("101", "102", 1000, "Transfer");
  } catch (error) {
    console.error(error);
  }finally{
    if(CLIENT.connect()){
      await CLIENT.close();
    }
  }
};  
main();