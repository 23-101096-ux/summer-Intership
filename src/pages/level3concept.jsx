import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './level3concept.css';

import bg              from '../assets/bgbg.png';
import characterImg    from '../assets/anubiss3.png'; 
import closeIcon       from '../assets/x.svg';
import startBtnImg     from '../assets/startbtn.png';
import goalSymbolIcon  from '../assets/goal1.svg';
import goalSealIcon    from '../assets/goal1.svg';
import goalTrapIcon    from '../assets/goal2.svg';
import goalCoreIcon    from '../assets/goal3.svg';

const PARTICLE_COLORS = ['#D8A43A', '#00e5ff', '#FED700', '#ff3333'];

const Level3Concept = () => {
    const navigate   = useNavigate();
    const wrapperRef = useRef(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        const particles = [];

        for (let i = 0; i < 28; i++) {
            const p     = document.createElement('div');
            p.className = 'l3-wrapper__particle';
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
        <div className="l3-wrapper" ref={wrapperRef}>
            <img src={bg} className="l3-wrapper__bg" alt="" />

            <div className="l3-modal-outer-frame">
                <div className="l3-modal">
                    <div className="l3-main-container">

                        {/* Left Character Panel */}
                        <div className="l3-left-panel">
                            <img src={characterImg} className="l3-character" alt="Character" />
                        </div>

                        {/* Right Content Panel */}
                        <div className="l3-center-panel">
                            <button
                                className="l3-close-btn"
                                onClick={() => navigate(-1)}
                                aria-label="Close"
                            >
                                <img src={closeIcon} alt="X" />
                            </button>

                            <h1 className="l3-title">Level Concept</h1>

                            <h2 className="l3-heading">GAME IDEA</h2>
                            <p className="l3-text">
                                The Temple's Magic Grows Stronger Activate The Ancient Seals , Avoid Deadly Traps, And Reach The Temple Core Before Your Spirit Energy Fades
                            </p>

                            <hr className="l3-divider" />

                            <div className="l3-goal-section">
                                <h2 className="l3-heading">YOUR GOAL</h2>
                                <ul className="l3-goals">
                                    <li className="l3-goal-item">
                                        <img src={goalSymbolIcon} className="l3-goal-icon" alt="" />
                                        <span>Collect 2 sacred symbols</span>
                                    </li>
                                    <li className="l3-goal-item">
                                        <img src={goalSealIcon} className="l3-goal-icon" alt="" />
                                        <span>Activate 2 temple seals</span>
                                    </li>
                                    <li className="l3-goal-item">
                                        <img src={goalTrapIcon} className="l3-goal-icon" alt="" />
                                        <span>Avoid traps and don't loose all sprits energy</span>
                                    </li>
                                    <li className="l3-goal-item">
                                        <img src={goalCoreIcon} className="l3-goal-icon" alt="" />
                                        <span>Reach the <span className="l3-goal-item--highlight">Temple Core</span> to complete the level</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    {/* Bottom Centered Start Button Row */}
                    <div className="l3-action">
                        <button
                            className="l3-start-btn"
                            onClick={() => navigate('/Gameboard3')}
                            style={{ backgroundImage: `url(${startBtnImg})` }}
                        >
                            START LEVEL
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Level3Concept;