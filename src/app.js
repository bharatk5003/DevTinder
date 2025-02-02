const express = require("express");
const connectDB = require("./config/database");
const userModel = require("./models/user")
const app = express();
app.use(express.json())


app.use("/signup", async (req, res) => {

  const user = userModel(req.body);
  try {
    await user.save()
    res.send("user created successfully");
  } catch (error) {
    console.log(error);
  }


})

connectDB().then(() => {
  console.log("database connection established");

  app.listen(3000, () => {
    console.log(`App is running on port 3000`);
  });
});
