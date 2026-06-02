import React from 'react';
import { useNavigate } from 'react-router-dom';

import mapBg    from '../assets/Group35.png';
import chest1   from '../assets/chest1.png';
import chest2   from '../assets/chest2.png';
import eyeRa    from '../assets/eye.png';
import lock     from '../assets/lock.png';

import './NileMap.css';

const NileMap = () => {
    const navigate = useNavigate();
 
    return (
        <div className="nile-map">
 
            <img className="nile-map__bg" src={mapBg} alt="" />
 
            <div className="nile-map__title-wrap">
                <h2 className="nile-map__title">Map of the Nile</h2>
            </div>
 
            <div className="nile-map__levels">
 
                <div className="nile-map__level" style={{ animationDelay: '0.4s' }} onClick={() => navigate('/level1concept')}>
                    <div className="nile-map__icon-wrap nile-map__icon-wrap--unlocked">
                        <img src={chest1} alt="Level 1" />
                    </div>
                    <p className="nile-map__label">Level 1</p>
                    <p className="nile-map__name nile-map__name--gold">COURTYARD TRIALS</p>
                </div>
 
                <div className="nile-map__level" style={{ animationDelay: '0.6s' }}>
                    <div className="nile-map__icon-wrap nile-map__icon-wrap--locked">
                        <img src={chest2} alt="Level 2" />
                        <img className="nile-map__lock" src={lock} alt="locked" />
                    </div>
                    <p className="nile-map__label">Level 2</p>
                    <p className="nile-map__name nile-map__name--cyan">INNER SANCTUM</p>
                </div>
 
                <div className="nile-map__level" style={{ animationDelay: '0.8s' }}>
                    <div className="nile-map__icon-wrap nile-map__icon-wrap--locked">
                        <img src={eyeRa} alt="Level 3" />
               
                    </div>
                    <p className="nile-map__label">Level 3</p>
                    <p className="nile-map__name nile-map__name--red">PHARAOH'S THRONE</p>
                </div>
 
            </div>
 
        </div>
    );
};
 
export default NileMap;