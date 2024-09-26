import { asc, desc, eq } from "drizzle-orm"
import { db } from "./db";
import {
    completedExercise,
    exercise, 
    ExerciseInsert,
    schemaRepsOnly,
    schemaTimeOnly,
    schemaWeightReps,
    schemaWeightThrows,
    workout 
} from "./schema";
import { UpdateWorkoutData } from "./types";

export const getAllExercises = async () => await db.select().from(exercise).where(eq(exercise.hidden, false)).orderBy(asc(exercise.name));

export const createExercise = async (data: ExerciseInsert) => await db.insert(exercise).values(data);

export const hideExercise = async (id: number) => await db.update(exercise).set({ hidden: true }).where(eq(exercise.id, id));

export const getExercise = async (id: number) => await db.select().from(exercise).where(eq(exercise.id, id));

export const editExercise = async (id: number, name: string, description: string | undefined | null) => await db.update(exercise).set({ name: name, description: description}).where(eq(exercise.id, id));

export const getAllWorkouts = async () => await db.select().from(workout).orderBy(desc(workout.startTimestamp));

export const getWorkoutExercises = async (workoutId: number) => await db
    .select({
        id: completedExercise.id,
        exerciseId: completedExercise.exerciseId,
        name: exercise.name,
        notes: completedExercise.notes,
        schema: exercise.schema
    })
    .from(completedExercise)
    .innerJoin(exercise, eq(completedExercise.exerciseId, exercise.id))
    .where(eq(completedExercise.workoutId, workoutId))
    .orderBy(completedExercise.orderNumber);

export const getCompletedExerciseWeightReps = async (completedExerciseId: number) => await db
    .select({
        id: schemaWeightReps.id,
        weight: schemaWeightReps.weight,
        reps: schemaWeightReps.reps
    })
    .from(schemaWeightReps)
    .where(eq(schemaWeightReps.completedExerciseId, completedExerciseId))
    .orderBy(schemaWeightReps.setNumber);

export const getCompletedExerciseWeightThrows = async (completedExerciseId: number) => await db
    .select({
        id: schemaWeightThrows.id,
        weight: schemaWeightThrows.weight,
        throws: schemaWeightThrows.throws
    })
    .from(schemaWeightThrows)
    .where(eq(schemaWeightThrows.completedExerciseId, completedExerciseId))
    .orderBy(schemaWeightThrows.setNumber);

export const getCompletedExerciseRepsOnly = async (completedExerciseId: number) => await db
    .select({
        id: schemaRepsOnly.id,
        reps: schemaRepsOnly.reps
    })
    .from(schemaRepsOnly)
    .where(eq(schemaRepsOnly.completedExerciseId, completedExerciseId))
    .orderBy(schemaRepsOnly.setNumber);

export const getCompletedExerciseTimeOnly = async (completedExerciseId: number) => await db
    .select({
        id: schemaTimeOnly.id,
        time: schemaTimeOnly.time
    })
    .from(schemaTimeOnly)
    .where(eq(schemaTimeOnly.completedExerciseId, completedExerciseId))
    .orderBy(schemaTimeOnly.setNumber);

export const updateWorkout = async (data: UpdateWorkoutData) => await db
    .update(workout)
    .set({
        name: data.name,
        notes: data.notes
    })
    .where(eq(workout.id, data.id));

export const deleteExercise = async (id: number) => await db.delete(completedExercise).where(eq(completedExercise.id, id));