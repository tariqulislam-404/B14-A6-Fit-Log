import { fallbackWorkouts, normalizeWorkout, Workout } from './types';

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export async function getWorkouts(): Promise<Workout[]> {
    try {
        const response = await fetch('https://api.abcz.workers.dev/api/fitlog', { next: { revalidate: 300 } });
        if (!response.ok) throw new Error('API unavailable');

        const payload: unknown = await response.json();
        const list = Array.isArray(payload)
            ? payload
            : isRecord(payload)
                ? payload.data ?? payload.workouts
                : null;

        if (!Array.isArray(list) || list.length === 0) return fallbackWorkouts;
        return list.map((item, index) => normalizeWorkout(item, index));
    } catch {
        return fallbackWorkouts;
    }
}

export async function getWorkout(id: string): Promise<Workout | undefined> {
    const workouts = await getWorkouts();
    return workouts.find(item => item.id === id);
}
