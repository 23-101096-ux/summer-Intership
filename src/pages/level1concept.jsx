import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './level1concept.css';

import bg          from '../assets/bg.png';            
import characterImg from '../assets/goldencharecter.png';     
import closeIcon    from '../assets/x.svg';       
import startBtnImg  from '../assets/startbtn.png'; 
import ankhIcon     from '../assets/yellowmoftah.png';            
import lotusIcon    from '../assets/warda.png';         
import lockIcon     from '../assets/bluelock.png';          

const Level1Concept = () => {
    const navigate = useNavigate();

    return (
        <div className="level-modal-wrapper">
            <img src={bg} className="level-modal-wrapper__bg" alt="" />
            
            <div className="level-modal">
                <button className="level-modal__close-btn" onClick={() => navigate(-1)}>
                    <img src={closeIcon} alt="X" />
                </button>

                <div className="level-modal__left-panel">
                    <img src={characterImg} className="level-modal__character" alt="Character" />
                </div>

                <div className="level-modal__center-panel">
                    <h1 className="level-modal__title">Level Concept</h1>
                    
                    <div className="level-modal__section">
                        <h2 className="level-modal__heading">GAME IDEA</h2>
                        <p className="level-modal__text">
                            Travel through the ancient path inspired by the gods. Roll the dice, move your piece, 
                            collect sacred symbols and the unlock the temple Core!
                        </p>
                    </div>

                    <hr className="level-modal__divider" />

                    <div className="level-modal__section">
                        <h2 className="level-modal__heading">YOUR GOAL</h2>
                        <p className="level-modal__text">
                            Collect 3 sacred symbols to unlock the temple core and complete the level
                        </p>
                    </div>

                    <div className="level-modal__action">
                        <button 
                            className="level-modal__start-btn" 
                            onClick={() => navigate('/game-play-screen')}
                            style={{ backgroundImage: `url(${startBtnImg})` }}
                        >
                            START LEVEL
                        </button>
                    </div>
                </div>

                <div className="level-modal__right-panel">
                    <div className="level-modal__icon-row level-modal__icon-row--top">
                        <div className="level-modal__icon-box">
                            <img src={ankhIcon} alt="Ankh Symbol" />
                        </div>
                    </div>
                    
                    <div className="level-modal__icon-row level-modal__icon-row--mid">
                        <div className="level-modal__icon-box">
                            <img src={lotusIcon} alt="Lotus Symbol" />
                        </div>
                    </div>
                    
                    <div className="level-modal__icon-row level-modal__icon-row--bot">
                        <div className="level-modal__icon-box">
                            <img src={lockIcon} alt="Locked Status" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Level1Concept;