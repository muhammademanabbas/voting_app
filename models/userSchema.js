const mongoose  =  require('mongoose')
const bcrypt = require("bcrypt");

const userSchema  = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    email:{
        type: String,
    },
    mobile:{
        type: String,
    },
    address:{
        type: String,
        required: true,
    },
    CNIC:{
        type: Number,
        required: true,
        unique: true
    },
    role:{
        type: String,
        enum: ['voter','admin'],
        default: 'voter'
    },
    password:{
        type:String,
        required: true
    },
    isVoted:{
        type: Boolean,
        default: false,
    },
})

userSchema.pre("save",async function(next){
    const user  =  this;
    if(!user.isModified('password')) return next()
    try {
        const password = user.password;
        const salt  =  await bcrypt.genSalt(10);
        const hashedPassword  = await bcrypt.hash(password,salt);
        user.password =  hashedPassword;
        next()
    } catch (error) {
        return next(error)
    }
})

userSchema.methods.comparePassword = async function (plainPassword) {
    try {
        const isMatch = await bcrypt.compare(plainPassword,this.password)
        return isMatch;
    } catch (error) {
        console.error("Error: ",error);
    }
}

const User = mongoose.model('user',userSchema);

module.exports  =  User;