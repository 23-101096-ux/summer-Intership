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

    const handleStartLevel = () => {
        if (navigate) {
            navigate('/game-play-screen'); 
        } else {
            window.location.href = '/game-play-screen';
        }
    };

    const handleClose = () => {
        if (navigate) {
            navigate(-1);
        } else {
            window.history.back();
        }
    };

    return (
        <div className="level-modal-wrapper">
              <img src={bg} className="level-modal__bg" alt="" />
            <div className="level-modal">
             
              
                <button className="level-modal__close-btn" onClick={handleClose}>
                    <img src={closeIcon} alt="X" />
                </button>

                {/* Character Left Frame */}
                <div className="level-modal__left-panel">
                    <img src={characterImg} className="level-modal__character" alt="Character" />
                </div>

                {/* Center Content Text Details */}
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

                    {/* Start Button Zone */}
                    <div className="level-modal__action">
                        <button 
                            className="level-modal__start-btn" 
                            onClick={handleStartLevel}
                            style={{ backgroundImage: `url(${startBtnImg})` }}
                        >
                            START LEVEL
                        </button>
                    </div>
                </div>

                {/* Collectible Icons Right Column */}
                <div className="level-modal__right-panel">
                    <div className="level-modal__icon-box level-modal__icon-box--gold">
                        <img src={ankhIcon} alt="Ankh Symbol" />
                    </div>
                    
                    <div className="level-modal__icon-box level-modal__icon-box--purple">
                        <img src={lotusIcon} alt="Lotus Symbol" />
                    </div>
                    
                    <div className="level-modal__icon-box level-modal__icon-box--teal">
                        <img src={lockIcon} alt="Locked Status" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Level1Concept;