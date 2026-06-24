import React from 'react';

import bg      from '../assets/bg.png';
import NileMap3 from '../components/NileMap3';

import './levels.css';


const Levels3 = () => {
    return (
        <div className="levels">
            <img className="levels__bg" src={bg} alt="" />
            <div className="levels__overlay" />
            <NileMap3 />
        </div>
    );
};

export default Levels3;