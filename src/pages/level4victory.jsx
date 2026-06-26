import React from 'react';
import { useNavigate } from 'react-router-dom';
import './level4victory.css';

// ── Asset Layer Mapping ──────────────────────────────────────────────────────
let bgImg = null;              
let victoryFrameBg = null;    
let counterBadgeBg = null;    
let continueBtnBg = null;     

// Adjusted fallback paths targeted for level 4 assets
try { bgImg          = require('../assets/level4victorybg.png'); } catch(_) {}
try { victoryFrameBg = require('../assets/victoryFrameBg4.png'); } catch(_) {}
try { counterBadgeBg = require('../assets/counterBadgeBg4.png'); } catch(_) {} 
try { continueBtnBg  = require('../assets/continueBtnB4.png'); } catch(_) {}

export default function Level4Victory({ onContinue }) {
  const navigate = useNavigate();

  const handleContinueClick = () => {
    if (onContinue) {
      onContinue();
    }
    // Automatically route straight to the infinite mode board view
    navigate('/infinitegameboard'); 
  };

  return (
    <div className="l4-vic-viewport-frame">
      {/* Game Stage Background Layer */}
      {bgImg && <img src={bgImg} className="l4-vic-screen-bg-layer" alt="" />}
      
      {/* Semi-transparent Dark Tint Backdrop overlay */}
      <div className="l4-vic-dark-backdrop-overlay" />

      {/* Main Victory Card Window */}
      <div className="l4-vic-modal-window">
        {victoryFrameBg && (
          <img src={victoryFrameBg} className="l4-vic-structural-frame" alt="Victory Frame" />
        )}

        {/* Content Layout Area */}
        <div className="l4-vic-content-layout">
          <h1 className="l4-vic-heading-primary">VICTORY</h1>
          <p className="l4-vic-sub-status">YOU HAVE COMPLETED</p>
          <h2 className="l4-vic-level-highlight">LEVEL 4</h2>

          <hr className="l4-vic-divider" />

          {/* Rewards Counter Section */}
          <div className="l4-vic-rewards-section">
            <span className="l4-vic-section-label">REWARDS</span>
            <div className="l4-vic-reward-badge-container">
              {counterBadgeBg && (
                <img src={counterBadgeBg} className="l4-vic-badge-asset-bg" alt="" />
              )}
              <div className="l4-vic-reward-badge-content">
                <span className="l4-vic-reward-value">+1</span>
              </div>
            </div>
          </div>

          <p className="l4-vic-proceeding-txt">PROCEEDING TO</p>
          <h3 className="l4-vic-next-level-txt">INFINITE LEVEL</h3>

          {/* Call-to-Action Action Button */}
          <button className="l4-vic-continue-action-btn" onClick={handleContinueClick}>
            {continueBtnBg && (
              <img src={continueBtnBg} className="l4-vic-btn-slice-bg" alt="" />
            )}
            <span className="l4-vic-btn-label">CONTINUE</span>
          </button>
        </div>
      </div>
    </div>
  );
}