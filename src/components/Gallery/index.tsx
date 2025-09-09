import { useEffect, useRef } from 'react';
import { images } from '../../constans';
import gsap from 'gsap';

export default function Gallery() {
  const preview = useRef<HTMLDivElement | null>(null);
  const minimap = useRef<HTMLDivElement | null>(null);
  const previewImageRefs = useRef<HTMLImageElement[] | null[]>([]);

  useEffect(() => {
    const handleLoad = () => {
      const previewEl = preview.current;
      const minimapEl = minimap.current;

      if (!previewEl || !minimapEl) return;

      const docEl = document.documentElement;

      const minimapTo = gsap.quickTo(minimap.current, 'y', {
        duration: 0.2,
        ease: 'power4',
      });

      const maxPreviewScroll = docEl.scrollHeight - window.innerHeight;
      const maxMinimapScroll = minimapEl.scrollHeight + 50;

      const minimapRatio = maxMinimapScroll / maxPreviewScroll;

      const handleScroll = () => {
        const scrollY = window.scrollY;

        minimapTo(-scrollY * minimapRatio);
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    };

    window.addEventListener('load', handleLoad);
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  const scrollToPreview = (index: number) => {
    const img = previewImageRefs.current[index] as HTMLImageElement;
    if (img) {
      const top = img.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className='grid grid-cols-3 bg-black z-30'>
      <div className='col-span-2 grid grid-cols-1 gap-10 py-20 px-50 will-change-auto' ref={preview}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Gallery image ${index}`}
            className='object-cover w-full h-full'
            ref={(el) => {
              previewImageRefs.current[index] = el;
            }}
          />
        ))}
      </div>

      <div className='hidden  sticky top-0 lg:flex flex-col items-center translate-y-75 h-screen cursor-pointer '>
        <div className='absolute w-48 h-30 border border-white -translate-y-50 z-2 ' />

        <div className='flex flex-col gap-5  will-change-transform' ref={minimap}>
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Gallery image ${index}`} draggable='false' className='object-cover w-42 h-24 brightness-75 grayscale-50 hover:brightness-100' onClick={() => scrollToPreview(index)} />
          ))}
        </div>
      </div>
    </section>
  );
}
