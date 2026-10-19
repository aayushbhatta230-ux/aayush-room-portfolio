import React, { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Instructions() {
  const scrollIns = useRef();
  const projectIns = useRef();
  const contactIns = useRef();

  function showScroll() {
    if (scrollIns.current) scrollIns.current.style.opacity = 1;
  }
  function hideScroll() {
    if (scrollIns.current) scrollIns.current.style.opacity = 0;
  }
  function hideProject() {
    if (projectIns.current) {
      projectIns.current.style.opacity = 0;
      projectIns.current.style.animation = 'unset';
    }
  }
  function hideContact() {
    if (contactIns.current) {
      contactIns.current.style.opacity = 0;
      contactIns.current.style.animation = 'unset';
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const trigger = ScrollTrigger.getById('triggers');
      if (!trigger) return;
      const progress = trigger.progress;
      if (progress < 0.124029) {
        showScroll();
        hideProject();
        hideContact();
      } else if (progress >= 0.124029 && progress < 0.175688) {
        hideScroll();
        if (projectIns.current) {
          projectIns.current.style.opacity = 1;
          projectIns.current.style.animation = 'breathing 0.45s 11 alternate-reverse ease-in-out';
        }
        hideContact();
      } else if (progress >= 0.175688 && progress < 0.57284) {
        showScroll();
        hideProject();
        hideContact();
      } else if (progress >= 0.57284 && progress < 0.74594) {
        hideScroll();
        hideProject();
        if (contactIns.current) {
          contactIns.current.style.opacity = 1;
          contactIns.current.style.animation = 'breathing 0.45s 11 alternate-reverse ease-in-out';
        }
      } else if (progress >= 0.74594) {
        showScroll();
        hideProject();
        hideContact();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="instruction-root">
      <div className="instruction-content scroll-ins" ref={scrollIns}>
        <p className="scroll">Scroll to Explore</p>
      </div>
      <div className="instruction-content project-ins" ref={projectIns}>
        <p className="project-instruction">To learn more, tap on a project.</p>
      </div>
      <div className="instruction-content contact-ins" ref={contactIns}>
        <p className="project-instruction">Use this phone to reach me :)</p>
      </div>
    </div>
  );
}
