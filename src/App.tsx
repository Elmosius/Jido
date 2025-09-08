import { useEffect, useRef } from 'react';
import Gallery from './components/Gallery';
import Intro from './components/Intro';
import gsap from 'gsap';
import { ReactLenis } from 'lenis/react';
import type { LenisRef } from 'lenis/react';

export default function App() {
  const lenisRef = useRef<LenisRef | null>(null);

  useEffect(() => {
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <main className='min-h-screen'>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      {/* <Intro /> */}
      <Gallery />
    </main>
  );
}
