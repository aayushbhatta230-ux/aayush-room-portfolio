import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assetsPaths } from '../data/textures';

gsap.registerPlugin(ScrollTrigger);

export default function LoadingScreen({ percentage, loading }) {
  const progressBarRef = useRef();
  const loadingDivRef = useRef();
  const videoRef = useRef();
  const [hidden, setHidden] = useState(false);
  const [displayedPercent, setDisplayedPercent] = useState(percentage);

  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${percentage / 100})`;
    }
    const obj = { p: displayedPercent };
    gsap.to(obj, {
      p: percentage,
      duration: 1,
      onUpdate: () => {
        setDisplayedPercent(Math.round(obj.p));
      }
    });

    if (!loading) {
      gsap.to('.content', {
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.5,
        onComplete: () => {
          gsap.to('.start-button', {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            pointerEvents: 'all'
          });
        }
      });
    }
  }, [percentage, loading]);

  const handleEnter = () => {
    if (!loading && loadingDivRef.current) {
      gsap.to(loadingDivRef.current, {
        yPercent: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
        onComplete: () => {
          if (loadingDivRef.current) loadingDivRef.current.style.display = 'none';
          const proxy = document.getElementById('proxy-container');
          if (proxy) proxy.style.display = 'block';
          setHidden(true);
          document.body.style.overflow = 'auto';
          gsap.to('.instruction-root', { opacity: 1, duration: 2, ease: 'none' });
          ScrollTrigger.refresh();
        }
      });

      const vrButton = document.getElementById('VRButton');
      if (vrButton && vrButton.innerHTML === 'ENTER VR') {
        vrButton.style.display = 'block';
        vrButton.style.opacity = '0';
        gsap.to('#VRButton', { opacity: 1, duration: 2, ease: 'none' });
      }

      const switcher = document.querySelector('.switcher-container');
      if (switcher) {
        switcher.style.display = 'block';
        gsap.to('.switcher-container', { opacity: 1, duration: 2, ease: 'none' });
      }
    }
  };

  if (hidden) return null;

  return (
    <div className="loading" ref={loadingDivRef}>
      <div className="content">
        <video
          width="500"
          ref={videoRef}
          height="100%"
          className="video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={assetsPaths.loadingVideo} type="video/webm" />
        </video>
        <div className="progress-bar" ref={progressBarRef}>
          <div className="progress-bar--progress" />
        </div>
        <span className="percentage">{displayedPercent}%</span>
      </div>
      <button className="start-button" onClick={handleEnter}>
        Enter
      </button>
    </div>
  );
}
