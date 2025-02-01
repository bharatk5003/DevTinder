const express = require('express');
const connectDB=require('./config/database')
const app= express();


connectDB().then(()=>{
    console.log("database connection established");

    app.listen(3000,()=>{
        console.log(`App is running on port 3000`);
     })
})

