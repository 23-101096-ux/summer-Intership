import React from 'react';
import './LevelConcept.css'; 

const StartButton = ({ onClick }) => {
    return (
        <button className="level-modal__start-btn" onClick={onClick}>
            START LEVEL
        </button>
    );
};

export default StartButton;