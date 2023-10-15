import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 4
    },
    desc: {
        type: String,
        required: true,
        min: 6
    },
    status: {
        type: String,
        required: true,
        enum: [
            'Open',
            'Closed',
            'Progress',      
        ]
    },
    assigned: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    }
}, {timestamps: true})

export default mongoose?.models?.Task || mongoose.model("Task", TaskSchema)