import React from 'react';

import bg      from '../assets/bg.png';
import NileMap2 from '../components/NileMap2';

import './levels.css';


const Levels2 = () => {
    return (
        <div className="levels">
            <img className="levels__bg" src={bg} alt="" />
            <div className="levels__overlay" />
            <NileMap2 />
        </div>
    );
};

export default Levels2;