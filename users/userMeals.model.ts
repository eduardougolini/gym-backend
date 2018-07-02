import * as mongoose from 'mongoose';

export interface UserMeal extends mongoose.Document {
    userId: string,
    fats: number,
    carbs: number,
    proteins: number,
    type: string,
    date: string
}

const userMealSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    fats: {
        type: Number
    },
    carbs: {
        type: Number
    },
    proteins: {
        type: Number
    },
    type: {
        type: String
    },
    date: {
        type: String
    }
});

export const UserMeal = mongoose.model<UserMeal>('UserMeal', userMealSchema)