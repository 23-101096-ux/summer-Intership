import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './winpage2.css';

// ── Safe asset imports ──────────────────────────────────────────────────────
let winBgImg      = null; 
let heroImg       = null; 
let chestImg      = null; 
let progressBgImg = null; 
let openBtnBgImg  = null; 

try { winBgImg      = require('../assets/bg.png');               } catch(_) {}
try { heroImg       = require('../assets/anubis-full.png');      } catch(_) {}
try { chestImg       = require('../assets/treasure-chest.png');   } catch(_) {}
try { progressBgImg = require('../assets/spirit-staff.png');     } catch(_) {}
try { openBtnBgImg  = require('../assets/btn-gold.png');   } catch(_) {}

// Particle positions: [left%, bottom%, delay_s, color]
const PARTICLES = [
  [22,  8,  0.0, '#FED700'], [31, 12,  0.4, '#00e5ff'],
  [38,  5,  0.8, '#FED700'], [45, 15,  0.2, '#b3f7ff'],
  [53,  7,  0.6, '#00e5ff'], [62, 11,  0.1, '#FED700'],
  [70,  4,  0.9, '#b3f7ff'], [78, 14,  0.5, '#00e5ff']
];

export default function WinPage2() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5); 

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/levels3'); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleManualSkip = () => {
    navigate('/level3concept'); 
  };

  return (
    <div className="win2-wrapper">
      
      {winBgImg && <img src={winBgImg} className="win2-bg-graphic" alt="" />}

      <div className="win2-particles-container">
        {PARTICLES.map((p, idx) => (
          <div
            key={idx}
            className="win2-particle-dot"
            style={{
              left: `${p[0]}%`,
              bottom: `${p[1]}%`,
              animationDelay: `${p[2]}s`,
              backgroundColor: p[3]
            }}
          />
        ))}
      </div>

      <div className="win2-top-title-banner">
        <h1 className="win2-main-headline">ANUBIS'S TOMB CONQUERED</h1>
        <p className="win2-sub-countdown">Advancing to Level 3 in {countdown}s...</p>
      </div>

      <div className="win2-content-container">
        
        <div className="win2-character-panel">
          {heroImg && <img src={heroImg} className="win2-hero-graphic" alt="Anubis Hero" />}
        </div>

        <div className="win2-reward-action-panel">
          
          <div className="win2-chest-display-box">
            {chestImg && <img src={chestImg} className="win2-chest-graphic" alt="Treasure Chest" />}
          </div>

          <div className="win2-progress-bar-container">
            <div className="win2-progress-track-wrap">
              {progressBgImg && <img src={progressBgImg} className="win2-progress-staff-frame" alt="" />}
              <div className="win2-progress-gradient-fill" />
            </div>
          </div>

          <button className="win2-open-action-btn" onClick={handleManualSkip}>
            {openBtnBgImg && <img src={openBtnBgImg} className="win2-btn-background-asset" alt="" />}
            <div className="win2-btn-shimmer-effect" />
            <span className="win2-btn-label-text">CONTINUE</span>
          </button>

        </div>
      </div>
    </div>
  );
}