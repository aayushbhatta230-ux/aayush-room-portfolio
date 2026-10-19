import React, { useRef, useState, useEffect } from 'react';
import { projects } from '../data/projects';
import { assetsPaths } from '../data/textures';

export default function ProjectModal({ id, showModal, closeModal, currentTime }) {
  const videoRef = useRef();
  const playBtnRef = useRef();
  const [theme, setTheme] = useState('day');

  const project = projects[id] || projects[0];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.controls = false;
    }
    if (playBtnRef.current) {
      playBtnRef.current.style.display = 'flex';
    }
  }, [showModal]);

  useEffect(() => {
    setTheme(currentTime);
  }, [currentTime]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [id]);

  if (!project || !showModal) return null;

  return (
    <div className="project-modal-backdrop">
      <article
        className="project-modal"
        itemScope
        itemType="http://schema.org/Article"
        style={{
          backgroundColor: theme === 'day' ? 'rgba(255, 255, 255, 0.692)' : 'rgba(0, 0, 0, 0.692)'
        }}
      >
        <div className="project-content">
          <header className="header">
            <h1
              className="title"
              itemProp="headline"
              style={{ color: theme === 'day' ? '#000' : '#fff' }}
            >
              {project.title}
            </h1>
            <img
              src={assetsPaths.closeIcon}
              className="close-icon"
              style={{ filter: theme === 'day' ? 'invert(0)' : 'invert(1)' }}
              onClick={closeModal}
              alt="Close Icon"
            />
          </header>

          <div className="side-content">
            <div className="project-video-container">
              <div className="play-button-container" ref={playBtnRef}>
                <img
                  src={assetsPaths.playIcon}
                  className="play-button"
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.play();
                      videoRef.current.controls = true;
                    }
                    if (playBtnRef.current) {
                      playBtnRef.current.style.display = 'none';
                    }
                  }}
                  alt="Play Button"
                />
              </div>
              <div>
                <video ref={videoRef} className="project-video" playsInline>
                  <source src={project.video} />
                  <source src={project.video2} />
                </video>
              </div>
            </div>
          </div>

          {project.url && (
            <a
              id="project-link"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="web-link">See For Yourself</div>
            </a>
          )}

          <div
            className="description"
            itemProp="description"
            style={{ color: theme === 'day' ? '#000' : '#fff' }}
          >
            {project.description}
          </div>

          <div className="skills">
            {project.skills &&
              project.skills.map((skill, index) => (
                <div key={index} className="skill">
                  {skill}
                </div>
              ))}
          </div>
        </div>
      </article>
    </div>
  );
}
