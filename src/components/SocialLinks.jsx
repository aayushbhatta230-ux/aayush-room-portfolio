import React from 'react';
import { SocialIcon } from 'react-social-icons';
import { socialLinks } from '../data/social';

export default function SocialLinks() {
  return (
    <div className="social-media-parent">
      <SocialIcon url={socialLinks.github} style={{ height: 55, width: 55 }} target="_blank" />
      <SocialIcon url={socialLinks.tiktok} style={{ height: 55, width: 55 }} target="_blank" />
      <SocialIcon url={socialLinks.instagram} style={{ height: 55, width: 55 }} target="_blank" />
      <SocialIcon url={socialLinks.mail} style={{ height: 55, width: 55 }} bgColor="#2DC0FF" />
    </div>
  );
}
