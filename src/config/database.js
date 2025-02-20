const mongoose = require('mongoose');



const connectDB = async () => {
    await mongoose.connect("mongodb+srv://bharatk5003:Megatron@bharat.arwrijo.mongodb.net/?retryWrites=true&w=majority&appName=Bharat/devTinder").catch((err) => {
        console.log(`error while connecting to database ${err}`)
    })

    mongoose.connection.on('connected', () => console.log('connected'));
    mongoose.connection.on('open', () => console.log('open'));
    mongoose.connection.on('disconnected', () => console.log('disconnected'));
    mongoose.connection.on('reconnected', () => console.log('reconnected'));
    mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
    mongoose.connection.on('close', () => console.log('close'));

};


module.exports = connectDB;

