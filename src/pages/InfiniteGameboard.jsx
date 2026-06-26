import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './InfiniteGameboard.css';

// ── Pool Arrays for Procedural Selection (Requirements 2 & 3) ──────────────────
const BACKGROUND_POOL = ['bg.png', 'bg4.png', 'level3victorybg.png'];
const BOARD_POOL = ['Group 40.png', 'board-level2.png', 'board-level3.png', 'board-level4.png'];
const AVATAR_POOL = ['anubis.png', 'anubis3.png', 'anubis4.png'];

const DIFFICULTY_CONFIGS = [
  { name: 'MORTAL CHAOS', rollLimit: 4, energyStep: 4, victoryTarget: 14 },
  { name: 'PHARAOH\'S TRIAL', rollLimit: 3, energyStep: 5, victoryTarget: 16 },
  { name: 'ANUBIS WRATH', rollLimit: 2, energyStep: 6, victoryTarget: 17 },
  { name: 'INFINITE ETERNITY', rollLimit: 2, energyStep: 3, victoryTarget: 17 }
];

// Grid coordinates configuration pool
const MASTER_LAYOUT = [
  { row:0, col:0 }, { row:0, col:1 }, { row:0, col:2 }, { row:0, col:3 }, { row:0, col:4 }, { row:0, col:5 }, { row:0, col:6 }, { row:0, col:7 },
  { row:1, col:0 }, { row:1, col:1 }, { row:1, col:2 }, { row:1, col:3 }, { row:1, col:4 }, { row:1, col:5 }, { row:1, col:6 }, { row:1, col:7 },
  { row:2, col:0 }, { row:2, col:1 }, { row:2, col:2 }, { row:2, col:3 }, { row:2, col:4 }, { row:2, col:5 }, { row:2, col:6 }, { row:2, col:7 },
  { row:3, col:0 }, { row:3, col:1 }, { row:3, col:2 }, { row:3, col:3 }, { row:3, col:4 }, { row:3, col:5 }, { row:3, col:6 }, { row:3, col:7 }
];

// Base asset loading fallbacks
let pauseIconImg=null, counterBg=null, timerEmptyImg=null;
let dice1=null, dice2=null, dice3=null, dice4=null, dice5=null, dice6=null;
let pauseMenuBg=null, gameLogoImg=null, btnGreenBg=null, btnGoldBg=null, btnRedBg=null;
let diceStrategyBg=null, singleDiceBtnBg=null, doubleDiceBtnBg=null, activeDiceBtnBg=null;

try { pauseIconImg     = require('../assets/pause-btn4.png');             } catch(_) {}
try { counterBg        = require('../assets/counter-badge-bg4.png');      } catch(_) {}
try { timerEmptyImg    = require('../assets/timer-empty44.png');           } catch(_) {}
try { dice1            = require('../assets/dice4-1.png');                } catch(_) {}
try { dice2            = require('../assets/dice4-2.png');                } catch(_) {}
try { dice3            = require('../assets/dice4-3.png');                } catch(_) {}
try { dice4            = require('../assets/dice4-4.png');                } catch(_) {}
try { dice5            = require('../assets/dice4-5.png');                } catch(_) {}
try { dice6            = require('../assets/dice4-6.png');                } catch(_) {}
try { pauseMenuBg      = require('../assets/pause-menu-panel.png');       } catch(_) {}
try { gameLogoImg      = require('../assets/game-logo.png');              } catch(_) {}
try { btnGreenBg       = require('../assets/btn-green.png');              } catch(_) {}
try { btnGoldBg        = require('../assets/btn-golddd.png');             } catch(_) {}
try { btnRedBg         = require('../assets/btn-red.png');                } catch(_) {}
try { diceStrategyBg   = require('../assets/dice-strategy-bg.png');       } catch(_) {}
try { singleDiceBtnBg  = require('../assets/single-dice-btn.png');        } catch(_) {}
try { doubleDiceBtnBg  = require('../assets/double-dice-btn.png');        } catch(_) {}
try { activeDiceBtnBg  = require('../assets/active-dice-bg.png');         } catch(_) {}

const DICE_IMGS = [null, dice1, dice2, dice3, dice4, dice5, dice6];

export default function InfiniteGameboard() {
  const navigate = useNavigate();

  // ── Procedural Infinite Progression Tracking State ─────────────────────────
  const [currentLoopIndex, setCurrentLoopIndex] = useState(1);
  const [proceduralAssets, setProceduralAssets] = useState({ bg: '', board: '', token: '' });
  const [currentDiff, setCurrentDiff] = useState(DIFFICULTY_CONFIGS[0]);
  const [proceduralPath, setProceduralPath] = useState([24, 25, 26, 18, 10, 11, 12, 4, 5, 6, 14, 22, 21, 20, 28, 29, 30, 31]);
  const [modifierAlert, setModifierAlert] = useState('Obstacles: Spiked Pit ahead! (+5 Energy Gain on move)');

  // Base Gameplay State
  const [diceVal1, setDiceVal1] = useState(3);
  const [diceVal2, setDiceVal2] = useState(5);
  const [isDoubleDiceMode, setIsDoubleDiceMode] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [tokenStep, setTokenStep] = useState(0);
  const [spiritEnergy, setSpiritEnergy] = useState(30);
  const [hasWon, setHasWon] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const tokenRef = useRef(0);
  const isAnimRef = useRef(false);
  const pauseRef = useRef(false);

  useEffect(() => { tokenRef.current = tokenStep; }, [tokenStep]);
  useEffect(() => { isAnimRef.current = isAnimating; }, [isAnimating]);
  useEffect(() => { pauseRef.current = isPaused; }, [isPaused]);

  // ── Procedural Map Generation Core Logic (Requirement 1 & 4) ────────────────
  const triggerProceduralGeneration = useCallback(() => {
    // 1. Select random assets from pools
    const randomBg = BACKGROUND_POOL[Math.floor(Math.random() * BACKGROUND_POOL.length)];
    const randomBoard = BOARD_POOL[Math.floor(Math.random() * BOARD_POOL.length)];
    const randomToken = AVATAR_POOL[Math.floor(Math.random() * AVATAR_POOL.length)];
    
    setProceduralAssets({ bg: randomBg, board: randomBoard, token: randomToken });

    // 2. Select random difficulty settings from array configuration
    const randomDiff = DIFFICULTY_CONFIGS[Math.floor(Math.random() * DIFFICULTY_CONFIGS.length)];
    setCurrentDiff(randomDiff);

    // 3. Automatically randomize obstacles layout notices
    const modifiers = [
      'Obstacles: Sandstorms active! Path visibility altered.',
      'Collectibles: Golden Ankh surge! Double rewards on step.',
      'Obstacles: Curse of Osiris! Higher steps required.',
      'Collectibles: Sacred Scarabs scattered across layout!'
    ];
    setModifierAlert(modifiers[Math.floor(Math.random() * modifiers.length)]);

    // 4. Procedurally construct a unique randomized route path path index
    const builtPath = [];
    let currentPoint = 24; // Start bottom-left
    builtPath.push(currentPoint);

    for (let i = 0; i < 16; i++) {
      const optionOffsets = [-1, 1, -8, 8]; // Left, Right, Up, Down matrix transitions
      const pickedOffset = optionOffsets[Math.floor(Math.random() * optionOffsets.length)];
      const nextCandidate = currentPoint + pickedOffset;
      if (nextCandidate >= 0 && nextCandidate < MASTER_LAYOUT.length) {
        currentPoint = nextCandidate;
        builtPath.push(currentPoint);
      }
    }
    setProceduralPath(builtPath);

    // Reset loop variables
    setTokenStep(0);
    setRollCount(0);
    setSpiritEnergy(30);
    setHasWon(false);
    tokenRef.current = 0;
  }, []);

  // Initialize loop configuration on mount
  useEffect(() => {
    triggerProceduralGeneration();
  }, [triggerProceduralGeneration]);

  // Handle continuous loop steps
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
      setSpiritEnergy(prev => Math.min(100, prev + currentDiff.energyStep));

      if (next >= targetIndex || next >= proceduralPath.length - 1) {
        setIsAnimating(false);
        isAnimRef.current = false;
        
        if (next >= proceduralPath.length - 1) {
          setHasWon(true);
          setSpiritEnergy(100);
        }
        return;
      }
      setTimeout(tick, 200);
    };
    setTimeout(tick, 200);
  }, [proceduralPath, currentDiff]);

  const triggerDiceRoll = () => {
    if (isRolling || isAnimRef.current || hasWon || isPaused) return;
    setIsRolling(true);
    let ticks = 0;

    const interval = setInterval(() => {
      setDiceVal1(Math.floor(Math.random() * 6) + 1);
      setDiceVal2(Math.floor(Math.random() * 6) + 1);
      ticks++;

      if (ticks >= 10) {
        clearInterval(interval);
        const r1 = Math.floor(Math.random() * 6) + 1;
        const r2 = Math.floor(Math.random() * 6) + 1;
        setDiceVal1(r1);
        setDiceVal2(r2);
        setIsRolling(false);

        const currentRollTracker = rollCount + 1;
        setRollCount(currentRollTracker);

        // Move calculation based on procedural targets
        if (currentRollTracker === 1) {
          moveCharacterDirectly(Math.floor(proceduralPath.length / 2));
        } else {
          moveCharacterDirectly(proceduralPath.length - 1);
        }
      }
    }, 70);
  };

  // Continuous loop progression (Requirement 5)
  const proceedToNextProceduralLevel = () => {
    setCurrentLoopIndex(prev => prev + 1);
    triggerProceduralGeneration();
  };

  const currentLayoutIndex = proceduralPath[tokenStep];
  const activeTile = MASTER_LAYOUT[currentLayoutIndex] || { row: 3, col: 0 };
  const computedLeft = `${(activeTile.col * 12.5) + 6.25}%`;
  const computedTop = `${(activeTile.row * 25) + 12.5}%`;

  // Safe runtime require matching local asset names
  let derivedBg = null, derivedBoard = null, derivedToken = null;
  try { if (proceduralAssets.bg) derivedBg = require(`../assets/${proceduralAssets.bg}`); } catch(_) {}
  try { if (proceduralAssets.board) derivedBoard = require(`../assets/${proceduralAssets.board}`); } catch(_) {}
  try { if (proceduralAssets.token) derivedToken = require(`../assets/${proceduralAssets.token}`); } catch(_) {}

  return (
    <div className="inf-viewport-frame">
      {derivedBg && <img src={derivedBg} className="inf-canvas-backdrop" alt="" />}

      <div className="inf-hud-interface-wrapper">
        
        {/* TOP SYSTEM HUD */}
        <div className="inf-hud-top-bar">
          <div className="inf-level-identity-titles">
            <h1 className="inf-main-headline">INFINITE LOOP — ZONE {currentLoopIndex}</h1>
            <p className="inf-sub-headline">DIF: {currentDiff.name}</p>
          </div>

          <div className="inf-modifier-banner">
            <span>{modifierAlert}</span>
          </div>

          <div className="inf-top-right-system-nodes">
            <div className="inf-counter-badge-node">
              {counterBg && <img src={counterBg} className="inf-badge-backing" alt="" />}
              <span className="inf-badge-value-text">{`${rollCount}/${currentDiff.rollLimit}`}</span>
            </div>
            <button className="inf-pause-toggle-node" onClick={() => setIsPaused(true)}>
              {pauseIconImg && <img src={pauseIconImg} alt="Pause" />}
            </button>
          </div>
        </div>

        {/* WORKSPACE DESK */}
        <div className="inf-hud-main-workspace">
          
          {/* COLUMN 1: INTERACTIVE DICE ROLLER */}
          <div className={`inf-workspace-left-dice-panel ${isRolling ? 'inf-dice-rolling-active' : ''}`} onClick={triggerDiceRoll}>
            {diceStrategyBg && <img src={diceStrategyBg} className="inf-panel-background-frame" alt="" />}
            <div className="inf-left-panel-dice-content-layer">
              <div className="inf-dice-flex-arena-row">
                <div className="inf-dice-individual-slot">
                  {DICE_IMGS[diceVal1] && <img src={DICE_IMGS[diceVal1]} className="inf-dice-node-image" alt="" />}
                </div>
                <div className="inf-dice-individual-slot">
                  {DICE_IMGS[diceVal2] && <img src={DICE_IMGS[diceVal2]} className="inf-dice-node-image" alt="" />}
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: PROCEDURAL BOARD CANVAS */}
          <div className="inf-workspace-middle-board-frame">
            {derivedBoard && <img src={derivedBoard} className="inf-actual-board-asset" alt="Procedural Map" />}
            {derivedToken && (
              <div 
                className="inf-anubis-token-avatar-anchor"
                style={{ left: computedLeft, top: computedTop, transition: isAnimating ? 'left 0.22s linear, top 0.22s linear' : 'none' }}
              >
                <img src={derivedToken} className="inf-token-graphic-node" alt="Procedural Avatar" />
              </div>
            )}
          </div>

          {/* COLUMN 3: FATE MODE ACTIONS */}
          <div className="inf-workspace-right-strategy-panel">
            {activeDiceBtnBg && <img src={activeDiceBtnBg} className="inf-panel-background-frame" alt="" />}
            <div className="inf-right-panel-strategy-content-layer">
              <div className="inf-strategy-vertical-stack">
                <button className="inf-strategy-interactive-item" onClick={() => setIsDoubleDiceMode(false)}>
                  {singleDiceBtnBg && <img src={singleDiceBtnBg} className="inf-btn-state-asset" alt="" />}
                  <span className={`inf-btn-inner-text ${!isDoubleDiceMode ? 'active-gold' : ''}`}>SINGLE CHAOS</span>
                </button>
                <button className="inf-strategy-interactive-item" onClick={() => setIsDoubleDiceMode(true)}>
                  {doubleDiceBtnBg && <img src={doubleDiceBtnBg} className="inf-btn-state-asset" alt="" />}
                  <span className={`inf-btn-inner-text ${isDoubleDiceMode ? 'active-gold' : ''}`}>TWIN FATE</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* OVERLAY: PROCEDURAL LOOP COMPLETION SCREEN */}
      {hasWon && (
        <div className="inf-loop-victory-screen-curtain">
          <div className="inf-victory-dialog-panel">
            <h2 className="inf-victory-title">ZONE CLEAR</h2>
            <p className="inf-victory-subtitle">Procedural layout successfully bypassed.</p>
            <button className="inf-loop-continue-btn" onClick={proceedToNextProceduralLevel}>
              {btnGoldBg && <img src={btnGoldBg} className="inf-btn-bg-asset" alt="" />}
              <span className="inf-btn-text">GENERATE NEXT MAP ▶</span>
            </button>
          </div>
        </div>
      )}

      {/* SYSTEM PAUSE MODAL */}
      {isPaused && (
        <div className="egypt-pause-screen-curtain">
          <div className="egypt-pause-dialog-panel">
            {gameLogoImg && <img src={gameLogoImg} className="egypt-branding-panel-logo" alt="" />}
            <div className="egypt-pause-window-bounding">
              {pauseMenuBg && <img src={pauseMenuBg} className="egypt-window-backdrop-slice" alt="" />}
              <div className="egypt-pause-actions-stack">
                <button className="egypt-pause-action-row-btn" onClick={triggerProceduralGeneration}>
                  {btnGreenBg && <img src={btnGreenBg} className="egypt-btn-asset-slice" alt="" />}
                  <span className="egypt-btn-label">RE-GENERATE MAP</span>
                </button>
                <button className="egypt-pause-action-row-btn" onClick={() => setIsPaused(false)}>
                  {btnGoldBg && <img src={btnGoldBg} className="egypt-btn-asset-slice" alt="" />}
                  <span className="egypt-btn-label">RESUME LOOP</span>
                </button>
                <button className="egypt-pause-action-row-btn" onClick={() => navigate('/menu')}>
                  {btnRedBg && <img src={btnRedBg} className="egypt-btn-asset-slice" alt="" />}
                  <span className="egypt-btn-label">QUIT TO MENU</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}