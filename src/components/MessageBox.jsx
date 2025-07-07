import React from 'react';
import '../styles/OverlayBox.css';

const OverlayBox = ({ header, message, isSuccess }) => {

  return (
    <div className="overlay-container">
      <div className="overlay-box">
        <h2 className="overlay-header">{header}</h2>

        <div className={`overlay-icon ${isSuccess ? 'success' : 'error'}`}>
          {isSuccess ? '✓' : '✕'}
        </div>

        <p className="overlay-message">{message}</p>
      </div>
    </div>
  );
};

export default OverlayBox;
