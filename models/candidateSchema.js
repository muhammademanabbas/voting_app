const mongoose  = require('mongoose')

const candidateSchema =  mongoose.Schema({

    name:{
        type: String,
        requireed: true
    },
    party:{
        type: String,
        requied: true,
    },
    age:{
        type: Number,
        required: true,
    },
    votes:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "userSchema",
                required: true,
            },
            votedAt:{
                type: Date,
                default: Date.now(),
            }
        }
    ],
    voteCount:{
        type: Number,
        default: false,
    }
})

const Candidate = mongoose.model("candidate",candidateSchema);
module.exports  = Candidate;