import * as mongoose from 'mongoose';

export interface RoutineExercise extends mongoose.Document {
    routine: number,
    title: string,
    content: string,
    sessions: number,
    repetitions: number
}

const routineExerciseSchema = new mongoose.Schema({
    routine: {
        type: Number,
        required: true
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    alreadyTrained: {
        type: Boolean
    }
});

export const RoutineExercise = mongoose.model<RoutineExercise>('RoutineExercise', routineExerciseSchema)