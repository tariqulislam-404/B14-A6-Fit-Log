'use client';
import { Workout } from '@/lib/types';
import { useApp } from './app-provider';
export function DetailActions({workout}:{workout:Workout}){const {addPlan,save,plan}=useApp();return <div className="actions"><button className="button" disabled={plan.some(x=>x.id===workout.id)||plan.length>=5} onClick={()=>addPlan(workout)}>＋ Add to today&apos;s plan</button><button className="button secondary" onClick={()=>save(workout)}>♡ Save for later</button></div>}