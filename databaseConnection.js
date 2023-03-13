const mongoose = require("mongoose");

function DbConnection() {
  const DB_URL = process.env.MONGO_URI;

  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Errors"));

db.once("open", function(){
    console.log("DB Connected !!")
})
module.exports = DbConnection;
