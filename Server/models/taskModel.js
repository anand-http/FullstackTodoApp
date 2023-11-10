import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({


    title: {
        type: String,
        required: true
    },
    description: {
        type: String,

    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

export const Task = mongoose.model('Task', taskSchema);