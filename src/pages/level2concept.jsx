import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './level2concept.css';

import bg              from '../assets/bg.png';
import characterImg    from '../assets/goldencharecter2.png';
import closeIcon       from '../assets/x.svg';
import startBtnImg     from '../assets/startbtn.png';
import challengeBg     from '../assets/newchallenge.png';
import ankhIcon        from '../assets/yellowmoftah.png';
import lotusIcon       from '../assets/warda.png';
import lockIcon        from '../assets/bluelock.png';
import fireIcon        from '../assets/fire.png';
import goalSymbolIcon  from '../assets/goal1.svg';
import goalSealIcon    from '../assets/goal1.svg';
import goalTrapIcon    from '../assets/goal2.svg';
import goalCoreIcon    from '../assets/goal3.svg';

const PARTICLE_COLORS = ['#D8A43A', '#00e5ff', '#FED700', '#e87cc7'];

const Level2Concept = () => {
    const navigate   = useNavigate();
    const wrapperRef = useRef(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        const particles = [];

        for (let i = 0; i < 28; i++) {
            const p     = document.createElement('div');
            p.className = 'l2-wrapper__particle';
            const size  = 2 + Math.random() * 3;
            const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];

            p.style.cssText = [
                `width: ${size}px`,
                `height: ${size}px`,
                `background: ${color}`,
                `left: ${Math.random() * 100}%`,
                `top: ${Math.random() * 100}%`,
                `--d: ${3 + Math.random() * 5}s`,
                `--delay: ${Math.random() * 4}s`,
                `--op: ${0.15 + Math.random() * 0.35}`,
                `--tx: ${-15 + Math.random() * 30}px`,
                `--ty: ${-30 + Math.random() * 10}px`,
                `filter: blur(${Math.random() > 0.5 ? '0' : '1px'})`,
            ].join('; ');

            wrapper.appendChild(p);
            particles.push(p);
        }

        return () => particles.forEach(p => p.remove());
    }, []);

    return (
        <div className="l2-wrapper" ref={wrapperRef}>
            <img src={bg} className="l2-wrapper__bg" alt="" />

            <div className="l2-modal">

    
                <span className="l2-corner l2-corner--tl" />
                <span className="l2-corner l2-corner--tr" />
                <span className="l2-corner l2-corner--bl" />
                <span className="l2-corner l2-corner--br" />

                <button
                    className="l2-close-btn"
                    onClick={() => navigate(-1)}
                    aria-label="Close"
                >
                    <img src={closeIcon} alt="X" />
                </button>

                <div className="l2-left-panel">
                    <img src={characterImg} className="l2-character" alt="Character" />
                </div>

                <div className="l2-center-panel">
                    <h1 className="l2-title">Level Concept</h1>

                    <h2 className="l2-heading">GAME IDEA</h2>
                    <p className="l2-text">
                        The Temple's Magic Grows Stronger Activate The Ancient Seals , Avoid Deadly Traps, And Reach The Temple Core Before Your Spirit Energy Fades
                    </p>

                    <hr className="l2-divider" />

                    <h2 className="l2-heading">YOUR GOAL</h2>

                    <ul className="l2-goals">
                        <li className="l2-goal-item">
                            <img src={goalSymbolIcon} className="l2-goal-icon" alt="" />
                            Collect 2 sacred symbols
                        </li>
                        <li className="l2-goal-item">
                            <img src={goalSealIcon} className="l2-goal-icon" alt="" />
                            Activate 2 temple seals
                        </li>
                        <li className="l2-goal-item">
                            <img src={goalTrapIcon} className="l2-goal-icon" alt="" />
                            Avoid traps and don't loose all sprits energy
                        </li>
                        <li className="l2-goal-item">
                            <img src={goalCoreIcon} className="l2-goal-icon" alt="" />
                            Reach the <span className="l2-goal-item--highlight">Temple Core</span> to complete the level
                        </li>
                    </ul>

                    <div className="l2-action">
                        <button
                            className="l2-start-btn"
                            onClick={() => navigate('/game-play-screen')}
                            style={{ backgroundImage: `url(${startBtnImg})` }}
                        >
                            START LEVEL
                        </button>
                    </div>
                </div>

                <div className="l2-right-panel">
                    <div className="l2-icon-grid">
                        <div className="l2-icon-box l2-icon-box--gold">
                            <img src={ankhIcon} alt="Ankh" />
                        </div>
                        <div className="l2-icon-box l2-icon-box--purple">
                            <img src={lotusIcon} alt="Lotus" />
                        </div>
                        <div className="l2-icon-box l2-icon-box--teal">
                            <img src={lockIcon} alt="Lock" />
                        </div>
                        <div className="l2-icon-box l2-icon-box--red">
                            <img src={fireIcon} alt="Fire" />
                        </div>
                    </div>

                    <div
                        className="l2-challenge"
                        style={{ backgroundImage: `url(${challengeBg})` }}
                    >
                        <p className="l2-challenge__title">New Challenge</p>
                        <p className="l2-challenge__text">
                            daily traps locked pathes , and limited spirits energy make this journey even harder
                        </p>
                        <div className="l2-challenge__footer">
                            <span className="l2-challenge__diamond" aria-hidden="true" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Level2Concept;