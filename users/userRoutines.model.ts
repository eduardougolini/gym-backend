import * as mongoose from 'mongoose';

export interface UserRoutine extends mongoose.Document {
    user: string,
    name: String
}

const userRoutineSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    routineImage: {
        type: String,
    },
    name: {
        type: String
    }
});

export const UserRoutine = mongoose.model<UserRoutine>('UserRoutine', userRoutineSchema)