const express = require("express");
const connectDB = require("./config/database");
const userModel = require("./models/user")
const { validateSignupData } = require('./utils/validation');
const bcrypt = require('bcrypt')
const app = express();
app.use(express.json())


app.post("/signup", async (req, res) => {
  //Validation of data
  try {
    validateSignupData(req);

    const { password, lastName, emailId, firstName } = req.body;
    //Encrypt tha password
    const hashPassword = await bcrypt.hash(password, 10)
    console.log(hashPassword)
    const user = userModel({
      firstName, lastName, emailId, password: hashPassword
    });

    await user.save()
    res.send("user created successfully");
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message)
  }


})

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await userModel.findOne({ emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("Login Successfull");
    } else {
      throw new Error("Password is not valid");
    }

  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
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

    const ALLOWED_UPDATES = ["userId", "photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) => {
      ALLOWED_UPDATES.includes(k);
    })
    const user = await userModel.findByIdAndUpdate(userId, data, { returnDocument: "after", runValidators: true });
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
