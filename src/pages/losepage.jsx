import React from 'react';
import { useNavigate } from 'react-router-dom';
import './losepage.css';

// Safe asset imports for image slices matching Screenshot 2026-06-13 at 5.50.48 PM.jpg
let screenBgImg = null;
let panelBgImg = null;
let characterImg = null;
let sandstormImg = null;
let btnRedBg = null;

try { screenBgImg  = require('../assets/bg.png');              } catch(_) {}
try { panelBgImg   = require('../assets/lose-panel-bg.png');    } catch(_) {} // The stone frame window
try { characterImg = require('../assets/anubis-fullbody.png');  } catch(_) {} // Anubis character asset
try { sandstormImg = require('../assets/sandstorm-fx.png');     } catch(_) {} // Sandstorm vortex on the right
try { btnRedBg     = require('../assets/btn-redd.png');          } catch(_) {} // Red button base slice

export default function LosePage() {
  const navigate = useNavigate();

  // Route actions
  const handleRetry = () => {
    // Navigates back to gameboard or previous level state
    navigate(-1); 
  };

  return (
    <div className="egypt-lose-viewport">
      {/* 1. Full Screen Outer Background Layer */}
      {screenBgImg && <img src={screenBgImg} className="egypt-lose-screen-bg" alt="" />}

      {/* 2. Main Centered Core Window Bounding Container */}
      <div className="egypt-lose-panel-container">
        {panelBgImg && <img src={panelBgImg} className="egypt-lose-panel-frame" alt="" />}

        {/* 3. Layered Content Elements */}
        <div className="egypt-lose-content-canvas">
          
          {/* Top Headline Text */}
          <h1 className="egypt-lose-headline">THE SANDS HAVE CLAIMED YOU</h1>

          <div className="egypt-lose-visuals-row">
            {/* Left Column: Full Body Character Graphic */}
            <div className="egypt-lose-character-wrapper">
              {characterImg && <img src={characterImg} className="egypt-lose-character-img" alt="Anubis" />}
            </div>

            {/* Right Column: Sandstorm Vortex Graphic Over Board */}
            <div className="egypt-lose-vortex-wrapper">
              {sandstormImg && <img src={sandstormImg} className="egypt-lose-sandstorm-img" alt="Sandstorm" />}
            </div>
          </div>

          {/* Bottom Row: Interactive Sliced Red Action Button */}
          <div className="egypt-lose-actions-area">
            <button className="egypt-lose-retry-btn" onClick={handleRetry} aria-label="Retry Level">
              {btnRedBg && <img src={btnRedBg} className="egypt-lose-btn-slice-bg" alt="" />}
              <span className="egypt-lose-btn-text-label">RETRAY LEVEL</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}