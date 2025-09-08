import { useEffect, useRef } from 'react';
import { images } from '../../constans';
import gsap from 'gsap';

export default function Gallery() {
  const preview = useRef<HTMLDivElement | null>(null);
  const minimap = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleLoad = () => {
      const previewEl = preview.current;
      const minimapEl = minimap.current;

      if (!previewEl || !minimapEl) return;

      const minimapTo = gsap.quickTo(minimap.current, 'y', {
        duration: 0.2,
        ease: 'power4',
      });

      const maxPreviewScroll = previewEl.scrollHeight - window.innerHeight;
      const maxMinimapScroll = minimapEl.scrollHeight - 100;

      console.info(maxPreviewScroll, maxMinimapScroll);

      const minimapRatio = maxMinimapScroll / maxPreviewScroll;

      const handleScroll = () => {
        const scrollY = window.scrollY;

        console.info(scrollY);

        minimapTo(-scrollY * minimapRatio);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    };

    window.addEventListener('load', handleLoad);
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <section className='grid grid-cols-[3fr_1fr] bg-black'>
      <div className='grid grid-cols-1 gap-10 py-20 px-50 will-change-auto' ref={preview}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Gallery image ${index}`} className='object-cover w-full h-full' />
        ))}
      </div>

      <div className='sticky top-0 flex flex-col items-center py-50 h-screen'>
        <div className='absolute w-48 h-30 border border-white z-2 will-change-transform' />

        <div className='flex flex-col gap-5 mt-3 will-change-transform' ref={minimap}>
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Gallery image ${index}`} draggable='false' className='object-cover w-42 h-24 brightness-75 grayscale-50' />
          ))}
        </div>
      </div>
    </section>
  );
}
