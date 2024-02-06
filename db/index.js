const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  console.log(process.env.DB_NAME);
  await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
  console.log("connect Success");
}
