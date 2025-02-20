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

app.get("/getUsers", async (req, response) => {
  try {
    const users = await userModel.find({});
    console.log(res);
    response.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
})

app.get("/getUserById", async (req, res) => {
  const { emailId } = req.query;
  try {
    const user = await userModel.find({ emailId })
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
})

app.delete("/delete", async (req, res) => {
  const { emailId } = req.query;
  try {
    console.log(emailId);
    const user = userModel.deleteOne({ emailId });
    console.log(user);
    res.status(200).send(user)
  } catch (error) {
    res.send(error)
  }
})

connectDB().then(() => {
  console.log("database connection established");

  app.listen(3000, () => {
    console.log(`App is running on port 3000`);
  });
});
