import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    age: number,
    daysWithoutTraining: number,
    weight: number,
    height: number
}

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: false
    },
    age: {
        type: Number
    },
    daysWithoutTraining: {
        type: Number
    },
    weight: {
        type: Number
    },
    height: {
        type: Number
    }
});

export const User = mongoose.model<User>('User', userSchema)