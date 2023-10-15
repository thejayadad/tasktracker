import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    pendingTask: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Task",
        default: []
    }
}, {timestamps: true})

export default mongoose?.models?.User || mongoose.model("User", UserSchema)