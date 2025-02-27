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

app.get("/user", async (req, response) => {
  try {
    const users = await userModel.find({});
    if (users.length === 0) {
      res.send("Users not found");
    }
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

app.delete("/user", async (req, res) => {
  const { emailId, userId } = req.query;
  try {
    console.log(userId)
    const user = await userModel.findByIdAndDelete({ userId })
    // console.log(user);
    res.status(200).send("user deleted successfully")
  } catch (error) {
    res.send(error)
  }
})

app.patch("/user", async (req, res) => {
  const { userId, emailId } = req.query;
  const data = req.body;
  try {
    // const user = await userModel.findOneAndUpdate({ _id: userId }, data)
    const user = await userModel.findByIdAndUpdate(userId, data, { returnDocument: "after" });
    res.status(200).send(user);
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
