const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String
        },
        emailId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String
        },
        age: {
            type: String
        },
        gender: {
            type: String,
            validate(value) {
                if (!["male", "female", "others"].includes(value)) {
                    throw new Error("Gender data is not valid")
                }
            }
        },
        skills: {
            type: [String]
        },
        photoUrl: {
            type: String,
            default: ""
        }
    }, {
    timestamps: true
}
)

const User = mongoose.model("User", userSchema)
module.exports = User;