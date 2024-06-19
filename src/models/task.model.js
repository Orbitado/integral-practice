import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

export const taskModel = model('tasks', taskSchema);