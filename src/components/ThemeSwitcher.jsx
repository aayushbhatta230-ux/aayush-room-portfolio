import React from 'react';

export default function ThemeSwitcher({ switchTime, time }) {
  return (
    <div className="switcher-container">
      <div className="switch">
        <label htmlFor="toggle">
          <input
            id="toggle"
            className="toggle-switch"
            type="checkbox"
            checked={time === 'day'}
            onChange={(e) => switchTime(e.target)}
          />
          <div className="sun-moon">
            <div className="dots" />
          </div>
          <div className="background">
            <div className="stars1" />
            <div className="stars2" />
          </div>
        </label>
      </div>
    </div>
  );
}
