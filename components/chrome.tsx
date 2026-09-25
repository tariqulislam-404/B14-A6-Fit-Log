'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logo from '../assets/logo.png';
import { useApp } from './app-provider';

export function Navbar() { const path = usePathname(); const { plan, saved, message } = useApp(); return <><header className="container nav"><Link href="/" className="brand"><Image src={logo} alt="FitLog logo" width={28} height={28} />FITLOG</Link><nav className="nav-links"><Link className={path === '/' ? 'active' : ''} href="/">Workout</Link><Link className={path === '/my-plan' ? 'active' : ''} href="/my-plan">My Plan</Link></nav><div className="badges"><Link className="badge primary" href="/my-plan">Plan <strong>{plan.length}</strong></Link><Link className="badge" href="/my-plan">Saved <strong>{saved.length}</strong></Link></div></header>{message && <div className="toast" role="status">{message}</div>}</> }

export function Footer() { return <footer className="footer"><div className="container"><div className="brand"><Image src={logo} alt="FitLog logo" width={24} height={24} />FITLOG</div><span>© 2026 FitLog — Workout Library. Train hard, log honest.</span></div></footer> }