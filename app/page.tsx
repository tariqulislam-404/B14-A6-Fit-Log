import Image from 'next/image';
import banner from '../assets/banner.png';
import { getWorkouts } from '@/lib/api';
import { HomeLibrary } from '@/components/home-library';

export default async function Home() {
    const workouts = await getWorkouts();

    return (
        <>
            <section className="hero container">
                <div className="hero-copy">
                    <span className="eyebrow">WORKOUT LIBRARY</span>
                    <h1>TRAIN WITH INTENT. LOG EVERY SET.</h1>
                    <p>
                        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
                    </p>
                    <a className="button" href="#library">↓ Browse workouts</a>
                </div>
                <div className="hero-media">
                    <Image src={banner} alt="Illustration of a seated cable workout" width={512} height={512} priority />
                </div>
            </section>
            <HomeLibrary workouts={workouts} />
        </>
    );
}