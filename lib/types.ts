import banner from '../assets/banner.png';

export type Workout = {
    id: string;
    name: string;
    categories: string[];
    equipment: string;
    duration: number;
    calories: number;
    rating: number;
    difficulty: string;
    sets: number;
    reps: string;
    image: string;
    description: string;
    instructions: string[];
};

type WorkoutFields = Omit<Workout, 'id' | 'image' | 'description' | 'instructions'>;

const fallbackFields: WorkoutFields[] = [
    { name: 'Barbell Bench Press', categories: ['Chest', 'Arms'], equipment: 'Barbell, Bench', duration: 25, calories: 180, rating: 4.8, difficulty: 'Intermediate', sets: 4, reps: '6-8' },
    { name: 'Back Squat', categories: ['Legs', 'Glutes'], equipment: 'Barbell, Rack', duration: 35, calories: 240, rating: 4.9, difficulty: 'Advanced', sets: 4, reps: '5-8' },
    { name: 'Deadlift', categories: ['Back', 'Legs'], equipment: 'Barbell', duration: 30, calories: 260, rating: 4.8, difficulty: 'Advanced', sets: 4, reps: '5-6' },
    { name: 'Dumbbell Row', categories: ['Back', 'Arms'], equipment: 'Dumbbells, Bench', duration: 20, calories: 145, rating: 4.7, difficulty: 'Intermediate', sets: 3, reps: '8-12' },
    { name: 'Overhead Press', categories: ['Shoulders', 'Arms'], equipment: 'Barbell', duration: 22, calories: 155, rating: 4.6, difficulty: 'Intermediate', sets: 3, reps: '8-10' },
    { name: 'Cable Fly', categories: ['Chest'], equipment: 'Cable Machine', duration: 18, calories: 120, rating: 4.5, difficulty: 'Beginner', sets: 3, reps: '10-15' },
    { name: 'Romanian Deadlift', categories: ['Legs', 'Glutes'], equipment: 'Barbell', duration: 28, calories: 210, rating: 4.8, difficulty: 'Intermediate', sets: 3, reps: '8-10' },
    { name: 'Pull Up', categories: ['Back', 'Arms'], equipment: 'Pull-up Bar', duration: 20, calories: 170, rating: 4.7, difficulty: 'Advanced', sets: 4, reps: '6-10' },
    { name: 'Goblet Squat', categories: ['Legs'], equipment: 'Kettlebell', duration: 18, calories: 130, rating: 4.6, difficulty: 'Beginner', sets: 3, reps: '10-12' },
    { name: 'Lateral Raise', categories: ['Shoulders'], equipment: 'Dumbbells', duration: 15, calories: 90, rating: 4.5, difficulty: 'Beginner', sets: 3, reps: '12-15' },
    { name: 'Bicep Curl', categories: ['Arms'], equipment: 'Dumbbells', duration: 15, calories: 85, rating: 4.4, difficulty: 'Beginner', sets: 3, reps: '10-12' },
    { name: 'Russian Twist', categories: ['Core'], equipment: 'Medicine Ball', duration: 12, calories: 100, rating: 4.6, difficulty: 'Beginner', sets: 3, reps: '20' }
];

export const fallbackWorkouts: Workout[] = fallbackFields.map((fields, index) => ({
    ...fields,
    id: String(index + 1),
    image: banner.src,
    description: 'A focused movement designed to build strength, control, and confident training intent.',
    instructions: [
        'Set up with a stable stance and controlled posture.',
        'Brace your core and move through the full range.',
        'Keep the tempo steady without rushing the hard part.',
        'Return to the start and repeat for each prescribed rep.'
    ]
}));

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readText(value: unknown, fallback: string): string {
    return typeof value === 'string' && value.trim() ? value : fallback;
}

function readNumber(value: unknown, fallback: number): number {
    const number = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(number) ? number : fallback;
}

export function normalizeWorkout(value: unknown, index: number): Workout {
    const item = isRecord(value) ? value : {};
    const base = fallbackWorkouts[index % fallbackWorkouts.length];
    const rawCategories = item.categories ?? item.category;
    const categories = Array.isArray(rawCategories)
        ? rawCategories.filter((category): category is string => typeof category === 'string' && category.trim().length > 0)
        : typeof rawCategories === 'string' && rawCategories.trim()
            ? [rawCategories]
            : base.categories;
    const rawId = item.id;
    const id = typeof rawId === 'string' || typeof rawId === 'number' ? String(rawId) : base.id;
    const rawReps = item.reps;

    return {
        ...base,
        id,
        name: readText(item.name ?? item.title, base.name),
        categories: categories.length ? categories : base.categories,
        equipment: readText(item.equipment, base.equipment),
        duration: readNumber(item.duration, base.duration),
        calories: readNumber(item.calories, base.calories),
        rating: readNumber(item.rating, base.rating),
        difficulty: readText(item.difficulty, base.difficulty),
        sets: readNumber(item.sets, base.sets),
        reps: typeof rawReps === 'string' || typeof rawReps === 'number' ? String(rawReps) : base.reps,
        image: readText(item.image ?? item.imageUrl, base.image),
        description: readText(item.description, base.description),
        instructions: Array.isArray(item.instructions)
            ? item.instructions.filter((instruction): instruction is string => typeof instruction === 'string')
            : base.instructions
    };
}