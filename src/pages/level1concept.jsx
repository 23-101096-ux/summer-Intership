import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './level1concept.css';

import bg           from '../assets/bg.png';
import characterImg from '../assets/goldencharecter.png';
import closeIcon    from '../assets/x.svg';
import startBtnImg  from '../assets/startbtn.png';
import ankhIcon     from '../assets/yellowmoftah.png';
import lotusIcon    from '../assets/warda.png';
import lockIcon     from '../assets/bluelock.png';

const PARTICLE_COLORS = ['#D8A43A', '#00e5ff', '#FED700', '#e87cc7'];

const Level1Concept = () => {
    const navigate  = useNavigate();
    const wrapperRef = useRef(null);


    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const particles = [];

        for (let i = 0; i < 28; i++) {
            const p = document.createElement('div');
            p.className = 'level-modal-wrapper__particle';
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
        <div className="level-modal-wrapper" ref={wrapperRef}>
            <img src={bg} className="level-modal-wrapper__bg" alt="" />

            <div className="level-modal">
                {/* Decorative corner brackets */}
                <span className="level-modal__corner level-modal__corner--tl" />
                <span className="level-modal__corner level-modal__corner--tr" />
                <span className="level-modal__corner level-modal__corner--bl" />
                <span className="level-modal__corner level-modal__corner--br" />

                <button
                    className="level-modal__close-btn"
                    onClick={() => navigate(-1)}
                    aria-label="Close"
                >
                    <img src={closeIcon} alt="X" />
                </button>

                <div className="level-modal__left-panel">
                    <img
                        src={characterImg}
                        className="level-modal__character"
                        alt="Character"
                    />
                </div>

                <div className="level-modal__center-panel">
                    <h1 className="level-modal__title">Level Concept</h1>

                    <div className="level-modal__section">
                        <h2 className="level-modal__heading">GAME IDEA</h2>
                        <p className="level-modal__text">
                            Travel through the ancient path inspired by the gods. Roll the dice, move your piece,
                            collect sacred symbols and unlock the temple core!
                        </p>
                    </div>

                    <hr className="level-modal__divider" />

                    <div className="level-modal__section">
                        <h2 className="level-modal__heading">YOUR GOAL</h2>
                        <p className="level-modal__text">
                            Collect 3 sacred symbols to unlock the temple core and complete the level.
                        </p>
                    </div>

                    <div className="level-modal__action">
                        <button
                            className="level-modal__start-btn"
                            onClick={() => navigate('/Gameboard1')}
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