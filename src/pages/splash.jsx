import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import bgVideo   from '../assets/BG_splash.mp4';
import logo      from '../assets/logo.svg';
import barEmpty  from '../assets/empty_progress.png';
import barFilled from '../assets/progress.png';

import './splash.css';

const LOAD_DURATION = 3000;

const Splash = () => {
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const intervalTime = 30;
        const step = (100 / LOAD_DURATION) * intervalTime;

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + step;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, []);


    useEffect(() => {
        if (progress >= 100) {
            navigate('/menu');
        }
    }, [progress, navigate]);

    return (
        <div className="splash">

            <video
                className="splash__video"
                src={bgVideo}
                autoPlay
                loop
                muted={true}
                playsInline
            />

            <div className="splash__content">
                <img className="splash__logo" src={logo} alt="Neon Nephthys" />

                <div className="splash__bar-wrapper">
                    <img className="splash__bar-empty" src={barEmpty} alt="" />
                    <div className="splash__bar-fill-clip" style={{ width: `${progress}%` }}>
                        <img className="splash__bar-filled" src={barFilled} alt="" />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Splash;