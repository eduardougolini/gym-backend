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
        type: String,
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
    },
    exerciseImage:{
        type: String
    }
});

export const RoutineExercise = mongoose.model<RoutineExercise>('RoutineExercise', routineExerciseSchema)