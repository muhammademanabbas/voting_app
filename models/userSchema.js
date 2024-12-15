const mongoose  =  require('mongoose')

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

const User = mongoose.model('user',userSchema);

module.exports  =  User;