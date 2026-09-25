'use client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Workout } from '@/lib/types';
type Context = { plan: Workout[]; saved: Workout[]; addPlan: (w: Workout) => void; save: (w: Workout) => void; removePlan: (id: string) => void; removeSaved: (id: string) => void; done: (id: string) => void; toast: (message: string) => void; message: string };
const AppContext = createContext<Context | null>(null);
export function AppProvider({ children }: { children: React.ReactNode }) {
    const [plan, setPlan] = useState<Workout[]>([]);
    const [saved, setSaved] = useState<Workout[]>([]);
    const [message, setMessage] = useState('');
    const [hydrated, setHydrated] = useState(false);
    const toastTimer = useRef<number | null>(null);

    useEffect(() => {
        let active = true;
        const timer = window.setTimeout(() => {
            try {
                const storedPlan: unknown = JSON.parse(localStorage.getItem('fitlog-plan') || '[]');
                const storedSaved: unknown = JSON.parse(localStorage.getItem('fitlog-saved') || '[]');
                setPlan(Array.isArray(storedPlan) ? storedPlan : []);
                setSaved(Array.isArray(storedSaved) ? storedSaved : []);
            } catch {
                setPlan([]);
                setSaved([]);
            } finally {
                if (active) setHydrated(true);
            }
        }, 0);

        return () => {
            active = false;
            window.clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (!hydrated) return;
        localStorage.setItem('fitlog-plan', JSON.stringify(plan));
    }, [hydrated, plan]);

    useEffect(() => {
        if (!hydrated) return;
        localStorage.setItem('fitlog-saved', JSON.stringify(saved));
    }, [hydrated, saved]);

    useEffect(() => () => {
        if (toastTimer.current) window.clearTimeout(toastTimer.current);
    }, []);

    const toast = (text: string) => {
        if (toastTimer.current) window.clearTimeout(toastTimer.current);
        setMessage(text);
        toastTimer.current = window.setTimeout(() => {
            setMessage('');
            toastTimer.current = null;
        }, 2600);
    };

    const addPlan = (workout: Workout) => {
        if (plan.some(item => item.id === workout.id)) return toast('Already in today\'s plan');
        if (plan.length >= 5) return toast('Today\'s plan is full');
        setPlan([...plan, workout]);
        toast('Added to today\'s plan');
    };

    const save = (workout: Workout) => {
        if (saved.some(item => item.id === workout.id)) return toast('Already saved');
        setSaved([...saved, workout]);
        toast('Saved for later');
    };

    const removePlan = (id: string) => {
        setPlan(plan.filter(item => item.id !== id));
        toast('Removed from plan');
    };

    const removeSaved = (id: string) => {
        setSaved(saved.filter(item => item.id !== id));
        toast('Removed from saved');
    };

    const done = (id: string) => {
        setPlan(plan.filter(item => item.id !== id));
        toast('Workout marked as done');
    };

    return <AppContext.Provider value={{ plan, saved, addPlan, save, removePlan, removeSaved, done, toast, message }}>{children}</AppContext.Provider>;
}
export function useApp() { const context = useContext(AppContext); if (!context) throw new Error('useApp must be used inside AppProvider'); return context }