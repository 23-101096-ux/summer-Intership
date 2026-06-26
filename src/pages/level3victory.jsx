import React from 'react';
import { useNavigate } from 'react-router-dom';
import './level3victory.css';

// ── Asset Layer Mapping ──────────────────────────────────────────────────────
let bgImg = null;              
let victoryFrameBg = null;    
let counterBadgeBg = null;    
let continueBtnBg = null;     

try { bgImg          = require('../assets/level3victorybg.png'); } catch(_) {}
try { victoryFrameBg = require('../assets/victoryFrameBg.png'); } catch(_) {}
try { counterBadgeBg = require('../assets/counterBadgeBg.png'); } catch(_) {} 
try { continueBtnBg  = require('../assets/continueBtnB.png'); } catch(_) {}

export default function Level3Victory({ onContinue }) {
  const navigate = useNavigate();

  const handleContinueClick = () => {
    // If a custom callback parent function was provided, execute it first
    if (onContinue) {
      onContinue();
    }
    // Navigate automatically to gameboard 4
    navigate('/gameboard4'); 
  };

  return (
    <div className="vic-viewport-frame">
      {/* Game Stage Background Layer */}
      {bgImg && <img src={bgImg} className="vic-screen-bg-layer" alt="" />}
      
      {/* Semi-transparent Dark Tint Backdrop overlay */}
      <div className="vic-dark-backdrop-overlay" />

      {/* Main Victory Card Window */}
      <div className="vic-modal-window">
        {victoryFrameBg && (
          <img src={victoryFrameBg} className="vic-structural-frame" alt="Victory Frame" />
        )}

        {/* Content Layout Area */}
        <div className="vic-content-layout">
          <h1 className="vic-heading-primary">VICTORY</h1>
          <p className="vic-sub-status">YOU HAVE COMPLETED</p>
          <h2 className="vic-level-highlight">LEVEL 3</h2>

          <hr className="vic-divider" />

          {/* Rewards Counter Section */}
          <div className="vic-rewards-section">
            <span className="vic-section-label">REWARDS</span>
            <div className="vic-reward-badge-container">
              {counterBadgeBg && (
                <img src={counterBadgeBg} className="vic-badge-asset-bg" alt="" />
              )}
              <div className="vic-reward-badge-content">
                <span className="vic-reward-value">+1</span>
              </div>
            </div>
          </div>

          <p className="vic-proceeding-txt">PROCEEDING TO</p>
          <h3 className="vic-next-level-txt">LEVEL 4</h3>

          {/* Call-to-Action Action Button */}
          <button className="vic-continue-action-btn" onClick={handleContinueClick}>
            {continueBtnBg && (
              <img src={continueBtnBg} className="vic-btn-slice-bg" alt="" />
            )}
            <span className="vic-btn-label">CONTINUE</span>
          </button>
        </div>
      </div>
    </div>
  );
}