import React from 'react';

import bg      from '../assets/bg.png';
import NileMap from '../components/NileMap';

import './levels.css';

const Levels = () => {
    return (
        <div className="levels">
            <img className="levels__bg" src={bg} alt="" />
            <div className="levels__overlay" />
            <NileMap />
        </div>
    );
};

export default Levels;