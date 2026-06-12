import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './winpage.css';

// ── Safe asset imports ────────────────────────────────────────────────────────
let winBgImg      = null; 
let heroImg       = null; 
let chestImg      = null; 
let progressBgImg = null; 
let openBtnBgImg  = null; 
let winVideoSrc   = null; 

try { winBgImg      = require('../assets/bg.png');           } catch(_) {}
try { heroImg       = require('../assets/anubis-full.png');      } catch(_) {}
try { chestImg      = require('../assets/treasure-chest.png');   } catch(_) {}
try { progressBgImg = require('../assets/spirit-staff.png');     } catch(_) {}
try { openBtnBgImg  = require('../assets/btn-open-chest.png');   } catch(_) {}
try { winVideoSrc   = require('../assets/win-video.mp4');        } catch(_) {}

// Particle positions: [left%, bottom%, delay_s, color]
const PARTICLES = [
  [22,  8,  0.0, '#FED700'], [31, 12,  0.4, '#00e5ff'],
  [38,  5,  0.8, '#FED700'], [45, 15,  0.2, '#b3f7ff'],
  [53,  7,  0.6, '#00e5ff'], [62, 11,  0.1, '#FED700'],
  [70,  4,  0.9, '#b3f7ff'], [78, 14,  0.5, '#00e5ff']
];

export default function WinPage() {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  const handleOpenChest = () => {
    if (winVideoSrc) {
      setShowVideo(true);
    } else {
      navigate('/levels2');
    }
  };

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play().catch(() => {
        navigate('/gameboard2');
      });
    }
  }, [showVideo, navigate]);

  const handleVideoEnd = () => {
    navigate('/gameboard2');
  };

  const handleSkip = () => {
    navigate('/gameboard2');
  };

  return (
    <div className="win-wrapper">
      
      {/* Background Graphic Asset */}
      {winBgImg && <img src={winBgImg} className="win-bg-graphic" alt="" />}

      {/* Floating Sparkle Ambient Particles */}
      <div className="win-particles-container">
        {PARTICLES.map((p, idx) => (
          <div
            key={idx}
            className="win-particle-dot"
            style={{
              left: `${p[0]}%`,
              bottom: `${p[1]}%`,
              animationDelay: `${p[2]}s`,
              backgroundColor: p[3]
            }}
          />
        ))}
      </div>

      
      <div className="win-top-title-banner">
        <h1 className="win-main-headline">VALLEY OF KINGS REACHED</h1>
      </div>


      <div className="win-content-container">
        

        <div className="win-character-panel">
          {heroImg && <img src={heroImg} className="win-hero-graphic" alt="Anubis Hero" />}
        </div>

        <div className="win-reward-action-panel">
          

          <div className="win-chest-display-box">
            {chestImg && <img src={chestImg} className="win-chest-graphic" alt="Treasure Chest" />}
          </div>


          <div className="win-progress-bar-container">
            <div className="win-progress-track-wrap">
              {progressBgImg && <img src={progressBgImg} className="win-progress-staff-frame" alt="" />}
             
            </div>
          </div>


          <button className="win-open-action-btn" onClick={handleOpenChest}>
            {openBtnBgImg && <img src={openBtnBgImg} className="win-btn-background-asset" alt="" />}
            <div className="win-btn-shimmer-effect" />

          </button>

        </div>

      </div>


      {showVideo && (
        <div className="win-video-overlay">
          {winVideoSrc ? (
            <video
              ref={videoRef}
              className="win-video-player"
              src={winVideoSrc}
              onEnded={handleVideoEnd}
              playsInline
            />
          ) : (
            <div className="win-video-fallback-box">
              <span className="win-fallback-icon">✨</span>
              <span className="win-fallback-title">Victory Cinematic</span>
              <span className="win-fallback-subtitle">Add win-video.mp4 to assets</span>
            </div>
          )}
          <button className="win-video-skip" onClick={handleSkip}>
            SKIP ▶
          </button>
        </div>
      )}

    </div>
  );
}