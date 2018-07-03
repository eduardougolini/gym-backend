import * as mongoose from 'mongoose';

export interface UserExercise extends mongoose.Document {
    user: string,
    routine: number,
    title: string,
    content: string,
    sessions: number,
    repetitions: number
}

const userExerciseSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    routine: {
        type: Number
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    sessions: {
        type: Number
    },
    repetitions: {
        type: Number
    }
});

export const UserExercise = mongoose.model<UserExercise>('UserExercise', userExerciseSchema)