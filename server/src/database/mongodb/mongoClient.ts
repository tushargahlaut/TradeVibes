const mongoose = require("mongoose");

const MAX_RETRIES = 5; // Maximum number of retries
const RETRY_DELAY = 2000; // Delay between retries in milliseconds

export const connectMongoDB = async () => {
  let attempts = 0;

  while (attempts < MAX_RETRIES) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URL);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return; // Exit the function if the connection is successful
    } catch (error: any) {
      attempts++;
      console.log(`Attempt ${attempts} - Error: ${error.message}`);
      if (attempts < MAX_RETRIES) {
        console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY)); // Wait for the specified delay before retrying
      } else {
        console.log('Max retries reached. Exiting process.');
        process.exit(1); // Exit the process with a failure code
      }
    }
  }
};
