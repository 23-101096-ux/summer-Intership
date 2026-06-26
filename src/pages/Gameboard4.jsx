import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Gameboard4.css';

// ── Asset Layer Mapping ──────────────────────────────────────────────────────
let bgImg=null, boardImg=null, tokenImg=null;
let pauseIconImg=null, counterBg=null, timerEmptyImg=null;
let dice1=null, dice2=null, dice3=null, dice4=null, dice5=null, dice6=null;
let pauseMenuBg=null, gameLogoImg=null, btnGreenBg=null, btnGoldBg=null, btnRedBg=null;
let diceStrategyBg=null, singleDiceBtnBg=null, doubleDiceBtnBg=null, activeDiceBtnBg=null;
let spiritBarBg=null;

try { bgImg            = require('../assets/bg4.png');                    } catch(_) {}
try { boardImg         = require('../assets/board-level4.png');          } catch(_) {}
try { tokenImg         = require('../assets/anubis4.png');                } catch(_) {}
try { pauseIconImg     = require('../assets/pause-btn4.png');             } catch(_) {}
try { counterBg        = require('../assets/counter-badge-bg4.png');      } catch(_) {}
try { timerEmptyImg    = require('../assets/timer-empty44.png');           } catch(_) {}
try { dice1            = require('../assets/dice4-1.png');                } catch(_) {}
try { dice2            = require('../assets/dice4-2.png');                } catch(_) {}
try { dice3            = require('../assets/dice4-3.png');                } catch(_) {}
try { dice4            = require('../assets/dice4-4.png');                } catch(_) {}
try { dice5            = require('../assets/dice4-5.png');                } catch(_) {}
try { dice6            = require('../assets/dice4-6.png');                } catch(_) {}
try { pauseMenuBg      = require('../assets/pause-menu-bg4.png');         } catch(_) {}
try { gameLogoImg      = require('../assets/game-logo4.png');             } catch(_) {}
try { btnGreenBg       = require('../assets/btn-green4.png');             } catch(_) {}
try { btnGoldBg       = require('../assets/btn-gold4.png');              } catch(_) {}
try { btnRedBg         = require('../assets/btn-red4.png');               } catch(_) {}
try { diceStrategyBg   = require('../assets/dice-strategy-bg.png');       } catch(_) {}
try { singleDiceBtnBg  = require('../assets/single-dice-btn.png');        } catch(_) {}
try { doubleDiceBtnBg  = require('../assets/double-dice-btn.png');        } catch(_) {}
try { activeDiceBtnBg  = require('../assets/active-dice-bg.png');         } catch(_) {}
try { spiritBarBg      = require('../assets/spirit-staff.png');           } catch(_) {}
try { pauseMenuBg   = require('../assets/pause-menu-panel.png'); } catch(_) {}
try { gameLogoImg   = require('../assets/game-logo.png');        } catch(_) {}
try { btnGreenBg    = require('../assets/btn-green.png');        } catch(_) {}
try { btnGoldBg     = require('../assets/btn-golddd.png');         } catch(_) {}
try { btnRedBg      = require('../assets/btn-red.png');          } catch(_) {}
// try { soundOnIcon   = require('../assets/sound-toggle.png');     } catch(_) {}
// try { musicOnIcon   = require('../assets/music-toggle.png');     } catch(_) {}

const DICE_IMGS = [null, dice1, dice2, dice3, dice4, dice5, dice6];

// Standard Level 4 Matrix Nodes
const BOARD_LAYOUT = [
  { row:0, col:0 }, { row:0, col:1 }, { row:0, col:2 }, { row:0, col:3 }, { row:0, col:4 }, { row:0, col:5 }, { row:0, col:6 }, { row:0, col:7 },
  { row:1, col:0 }, { row:1, col:1 }, { row:1, col:2 }, { row:1, col:3 }, { row:1, col:4 }, { row:1, col:5 }, { row:1, col:6 }, { row:1, col:7 },
  { row:2, col:0 }, { row:2, col:1 }, { row:2, col:2 }, { row:2, col:3 }, { row:2, col:4 }, { row:2, col:5 }, { row:2, col:6 }, { row:2, col:7 },
  { row:3, col:0 }, { row:3, col:1 }, { row:3, col:2 }, { row:3, col:3 }, { row:3, col:4 }, { row:3, col:5 }, { row:3, col:6 }, { row:3, col:7 }
];

// Matrix Walk path indexes across Level 4 
const WALK_PATH = [24, 25, 26, 18, 10, 11, 12, 4, 5, 6, 14, 22, 21, 20, 28, 29, 30, 31];

export default function Gameboard4() {
  const navigate = useNavigate();

  // State Hooks
  const [diceVal1, setDiceVal1] = useState(4);
  const [diceVal2, setDiceVal2] = useState(2);
  const [isDoubleDiceMode, setIsDoubleDiceMode] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [tokenStep, setTokenStep] = useState(0);
  const [spiritEnergy, setSpiritEnergy] = useState(20); 
  const [hasWon, setHasWon] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Synchronized References to Avoid Stale Closures
  const tokenRef = useRef(0);
  const isAnimRef = useRef(false);
  const pauseRef = useRef(false);
  const winRef = useRef(false);

  useEffect(() => { tokenRef.current = tokenStep; }, [tokenStep]);
  useEffect(() => { isAnimRef.current = isAnimating; }, [isAnimating]);
  useEffect(() => { pauseRef.current = isPaused; }, [isPaused]);
  useEffect(() => { winRef.current = hasWon; }, [hasWon]);

  // Handle Level Step Animations
  const moveCharacterDirectly = useCallback((targetIndex) => {
    setIsAnimating(true);
    isAnimRef.current = true;

    const tick = () => {
      if (pauseRef.current) {
        setTimeout(tick, 200);
        return;
      }

      const next = tokenRef.current + 1;
      tokenRef.current = next;
      setTokenStep(next);

      setSpiritEnergy(prev => Math.min(100, prev + 5));

      if (next >= targetIndex || next >= WALK_PATH.length - 1) {
        setIsAnimating(false);
        isAnimRef.current = false;
        
        if (next >= WALK_PATH.length - 1) {
          setHasWon(true);
          setSpiritEnergy(100);
          // Complete navigation out of the board straight to your standalone page route
          navigate('/level4victory');
        }
        return;
      }
      setTimeout(tick, 220);
    };
    setTimeout(tick, 220);
  }, [navigate]);

  const triggerDiceRoll = () => {
    if (isRolling || isAnimRef.current || winRef.current || pauseRef.current) return;
    setIsRolling(true);
    let ticks = 0;

    const interval = setInterval(() => {
      setDiceVal1(Math.floor(Math.random() * 6) + 1);
      setDiceVal2(Math.floor(Math.random() * 6) + 1);
      ticks++;

      if (ticks >= 10) {
        clearInterval(interval);
        
        const finalR1 = Math.floor(Math.random() * 6) + 1;
        const finalR2 = Math.floor(Math.random() * 6) + 1;
        setDiceVal1(finalR1);
        setDiceVal2(finalR2);
        setIsRolling(false);

        const currentRollTracker = rollCount + 1;
        setRollCount(currentRollTracker);

        if (currentRollTracker === 1) {
          moveCharacterDirectly(8);
        } else {
          moveCharacterDirectly(WALK_PATH.length - 1);
        }
      }
    }, 70);
  };

  const restartQuest = () => {
    setDiceVal1(4);
    setDiceVal2(2);
    setTokenStep(0);
    setRollCount(0);
    setSpiritEnergy(20);
    setHasWon(false);
    setIsDoubleDiceMode(false);
    setIsPaused(false);
    setIsAnimating(false);
    tokenRef.current = 0;
    isAnimRef.current = false;
  };

  const currentLayoutIndex = WALK_PATH[tokenStep];
  const activeTile = BOARD_LAYOUT[currentLayoutIndex] || { row: 3, col: 0 };
  const computedLeft = `${(activeTile.col * 12.5) + 6.25}%`;
  const computedTop = `${(activeTile.row * 25) + 12.5}%`;

  return (
    <div className="l4g-viewport-frame">
      {bgImg && <img src={bgImg} className="l4g-canvas-backdrop" alt="" />}

      <div className="l4g-hud-interface-wrapper">
        
        {/* ── TOP HEADERS & METERS ── */}
        <div className="l4g-hud-top-bar">
          <div className="l4g-level-identity-titles">
            <h1 className="l4g-main-headline">FINAL LEVEL 4</h1>
            <p className="l4g-sub-headline">UNDERWORLD MATRIX</p>
          </div>

          <div className="l4g-spirit-energy-progress-container">
            {timerEmptyImg && <img src={timerEmptyImg} className="l4g-spirit-frame-asset" alt="" />}
            {/* {spiritBarBg && <img src={spiritBarBg} className="l4g-spirit-frame-asset" style={{ zIndex: 3 }} alt="" />} */}
            <div 
              className="l4g-spirit-gradient-bar-fill" 
              style={{ width: `${spiritEnergy * 0.64}%` }} 
            />
          </div>

          <div className="l4g-top-right-system-nodes">
            <div className="l4g-counter-badge-node">
              {counterBg && <img src={counterBg} className="l4g-badge-backing" alt="" />}
              <span className="l4g-badge-value-text">{hasWon ? "3/3" : `${rollCount}/2`}</span>
            </div>
            
            <button className="l4g-pause-toggle-node" onClick={() => setIsPaused(true)}>
              {pauseIconImg && <img src={pauseIconImg} alt="Pause" />}
            </button>
          </div>
        </div>

        {/* ── WORKSPACE SPLIT ── */}
        <div className="l4g-hud-main-workspace">
          
          {/* COLUMN 1: INTERACTIVE DOUBLE DICE PANEL */}
          <div 
            className={`l4g-workspace-left-dice-panel ${isRolling ? 'l4g-dice-rolling-active' : ''}`}
            onClick={triggerDiceRoll}
          >
            {diceStrategyBg && <img src={diceStrategyBg} className="l4g-panel-background-frame" alt="" />}
            
            <div className="l4g-left-panel-dice-content-layer">
              <div className="l4g-dice-flex-arena-row">
                <div className="l4g-dice-individual-slot">
                  {DICE_IMGS[diceVal1] && <img src={DICE_IMGS[diceVal1]} className="l4g-dice-node-image" alt="" />}
                </div>
                <div className="l4g-dice-individual-slot">
                  {DICE_IMGS[diceVal2] && <img src={DICE_IMGS[diceVal2]} className="l4g-dice-node-image" alt="" />}
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: CENTER LABYRINTH MATRIX */}
          <div className="l4g-workspace-middle-board-frame">
            {boardImg && <img src={boardImg} className="l4g-actual-board-asset" alt="Matrix Board" />}
            
            {/* Dynamic Moving Character Token Component */}
            {tokenImg && (
              <div 
                className="l4g-anubis-token-avatar-anchor"
                style={{ left: computedLeft, top: computedTop, transition: isAnimating ? 'left 0.22s linear, top 0.22s linear' : 'none' }}
              >
                <img src={tokenImg} className="l4g-token-graphic-node" alt="Anubis Token" />
              </div>
            )}
          </div>

          {/* COLUMN 3: STRATEGY INTERACTIVES */}
          <div className="l4g-workspace-right-strategy-panel">
            {activeDiceBtnBg && <img src={activeDiceBtnBg} className="l4g-panel-background-frame" alt="" />}
            
            <div className="l4g-right-panel-strategy-content-layer">
              <div className="l4g-strategy-vertical-stack">
                <button className="l4g-strategy-interactive-item" onClick={() => setIsDoubleDiceMode(false)}>
                  {singleDiceBtnBg && <img src={singleDiceBtnBg} className="l4g-btn-state-asset" alt="" />}
                  {!isDoubleDiceMode && activeDiceBtnBg && (
                    <img src={activeDiceBtnBg} className="l4g-btn-active-overlay" alt="" />
                  )}
                  <span className={`l4g-btn-inner-text ${!isDoubleDiceMode ? 'active-gold' : ''}`}>SINGLE CHAOS</span>
                </button>

                <button className="l4g-strategy-interactive-item" onClick={() => setIsDoubleDiceMode(true)}>
                  {doubleDiceBtnBg && <img src={doubleDiceBtnBg} className="l4g-btn-state-asset" alt="" />}
                  {isDoubleDiceMode && activeDiceBtnBg && (
                    <img src={activeDiceBtnBg} className="l4g-btn-active-overlay" alt="" />
                  )}
                  <span className={`l4g-btn-inner-text ${isDoubleDiceMode ? 'active-gold' : ''}`}>TWIN FATE</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* OVERLAY SCREENS */}
      {isPaused && (
        <div className="egypt-pause-screen-curtain">
          <div className="egypt-pause-dialog-panel">
            {gameLogoImg && <img src={gameLogoImg} className="egypt-branding-panel-logo" alt="" />}
            
            <div className="egypt-pause-window-bounding">
              {pauseMenuBg && <img src={pauseMenuBg} className="egypt-window-backdrop-slice" alt="" />}
              
              <div className="egypt-pause-actions-stack">
                <button className="egypt-pause-action-row-btn" onClick={restartQuest}>
                  {btnGreenBg && <img src={btnGreenBg} className="egypt-btn-asset-slice" alt="" />}
                  <span className="egypt-btn-label">RESTART LEVEL</span>
                </button>

                <button className="egypt-pause-action-row-btn" onClick={() => setIsPaused(false)}>
                  {btnGoldBg && <img src={btnGoldBg} className="egypt-btn-asset-slice" alt="" />}
                  <span className="egypt-btn-label">RESUME QUEST</span>
                </button>

                <button className="egypt-pause-action-row-btn" onClick={() => navigate('/menu')}>
                  {btnRedBg && <img src={btnRedBg} className="egypt-btn-asset-slice" alt="" />}
                  <span className="egypt-btn-label">QUIT</span>
                </button>
              </div>
            </div>
          </div>

          <div className="egypt-pause-audio-controls">
            <button className="egypt-audio-toggle-node" aria-label="Toggle Sound Effects"></button>
            <button className="egypt-audio-toggle-node" aria-label="Toggle Background Music"></button>
          </div>
        </div>
      )}
    </div>
  );
}