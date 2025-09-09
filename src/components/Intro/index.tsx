import { image } from '../../constans';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(SplitText);

export default function Intro() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const splitText = SplitText.create(titleRef.current, { type: 'words' });
    const jiText = splitText.words[0];
    const doText = splitText.words[1];

    gsap.set(imageRef.current, {
      clipPath: 'polygon(46% 35%, 52% 35%, 56% 65%, 50% 65%)',
    });

    gsap
      .timeline({
        defaults: {
          ease: 'power4.inOut',
        },
      })
      .to(imageRef.current, {
        duration: 1.5,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        ease: 'power4.inOut',
      })
      .to(
        jiText,
        {
          duration: 1.8,
          x: -(window.innerWidth / 6) - 50,
        },
        0
      )
      .to(
        doText,
        {
          duration: 1.8,
          x: window.innerWidth / 6 + 50,
        },
        0
      );
  }, []);

  return (
    <section className='h-screen bg-black z-50' id='intro'>
      <h1 ref={titleRef} className='absolute inset-0 flex items-center justify-center font-semibold text-white text-8xl z-10 uppercase'>
        Ji do
      </h1>

      <img src={image} alt='1' className='object-cover w-full h-full brightness-75' ref={imageRef} />
    </section>
  );
}
