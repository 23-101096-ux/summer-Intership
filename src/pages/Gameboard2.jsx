import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Gameboard2.css';

// ── Safe asset imports ────────────────────────────────────────────────────────
let bgImg=null, boardImg=null, tokenImg=null;
let pauseIconImg=null, counterBg=null, spiritBarBg=null, timerEmptyImg=null;
let dice1=null, dice2=null, dice3=null, dice4=null, dice5=null, dice6=null;
let pauseMenuBg=null, gameLogoImg=null, btnGreenBg=null, btnGoldBg=null, btnRedBg=null;
let soundOnIcon=null, musicOnIcon=null;

try { bgImg        = require('../assets/bg.png');               } catch(_) {}
try { boardImg     = require('../assets/board-level2.png');     } catch(_) {}
try { tokenImg     = require('../assets/anubis.png');           } catch(_) {}
try { pauseIconImg = require('../assets/pause-btn.png');        } catch(_) {}
try { counterBg    = require('../assets/counter-badge-bg.png'); } catch(_) {}
try { timerEmptyImg= require('../assets/timer-empty.png');      } catch(_) {}
try { dice1        = require('../assets/dice-1.png');           } catch(_) {}
try { dice2        = require('../assets/dice-2.png');           } catch(_) {}
try { dice3        = require('../assets/dice-3.png');           } catch(_) {}
try { dice4        = require('../assets/dice-4.png');           } catch(_) {}
try { dice5        = require('../assets/dice-5.png');           } catch(_) {}
try { dice6        = require('../assets/dice-6.png');           } catch(_) {}
try { pauseMenuBg  = require('../assets/pause-menu-panel.png'); } catch(_) {}
try { gameLogoImg  = require('../assets/game-logo.png');        } catch(_) {}
try { btnGreenBg   = require('../assets/btn-green.png');        } catch(_) {}
try { btnGoldBg    = require('../assets/btn-golddd.png');       } catch(_) {}
try { btnRedBg     = require('../assets/btn-red.png');          } catch(_) {}
try { soundOnIcon  = require('../assets/sound-toggle.png');     } catch(_) {}
try { musicOnIcon  = require('../assets/music-toggle.png');     } catch(_) {}

const DICE_IMGS = [null, dice1, dice2, dice3, dice4, dice5, dice6];

// ── Strict 6x3 Logical Calibration Grid Mapping ──
const BOARD_LAYOUT = [
  { row:0, col:0 }, { row:0, col:1 }, { row:0, col:2 }, { row:0, col:3 }, { row:0, col:4 }, { row:0, col:5 },
  { row:1, col:0 }, { row:1, col:1 }, { row:1, col:2 }, { row:1, col:3 }, { row:1, col:4 }, { row:1, col:5 },
  { row:2, col:0 }, { row:2, col:1 }, { row:2, col:2 }, { row:2, col:3 }, { row:2, col:4 }, { row:2, col:5 }
];

// ── EXTENDED WALK PATH TRACKING SEQUENCE ──
const WALK_PATH = [
  11, 5, 4, 3, 2, 1, 0, 6, 12, 13, 7, 8, 9, 10, 14
];

export default function GameBoard2() {
  const navigate = useNavigate();

  const [diceVal, setDiceVal] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [tokenStep, setTokenStep] = useState(0); 
  const [relicCount, setRelicCount] = useState(0);
  const [gameState, setGameState] = useState('active'); 
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const tokenRef = useRef(0);
  const isAnimRef = useRef(false);
  const gameRef = useRef('active');
  const pauseRef = useRef(false);

  useEffect(() => { tokenRef.current = tokenStep; }, [tokenStep]);
  useEffect(() => { isAnimRef.current = isAnimating; }, [isAnimating]);
  useEffect(() => { gameRef.current = gameState; }, [gameState]);
  useEffect(() => { pauseRef.current = isPaused; }, [isPaused]);

  const moveCharacter = useCallback((steps) => {
    isAnimRef.current = true;
    setIsAnimating(true);
    let currentMoveCount = 0;

    const tick = () => {
      if (pauseRef.current) {
        setTimeout(tick, 200);
        return;
      }

      const next = Math.min(tokenRef.current + 1, WALK_PATH.length - 1);
      currentMoveCount++;
      tokenRef.current = next;
      setTokenStep(next);

      // Increment relic accumulation along the path up to the required amount to win
      if (next >= 4 && next < 9) {
        setRelicCount(1);
      } else if (next >= 9) {
        setRelicCount(2);
      }

      // If character reaches the end tile, trigger win completion sequence
      if (next === WALK_PATH.length - 1) {
        setGameState('won');
        setIsAnimating(false);
        isAnimRef.current = false;
        
        // Wait 800ms for a satisfying landing pause, then redirect to win page
        setTimeout(() => {
          navigate('/winpage2');
        }, 800);
        return;
      }

      if (currentMoveCount < steps && next < WALK_PATH.length - 1) {
        setTimeout(tick, 320);
      } else {
        setIsAnimating(false);
        isAnimRef.current = false;
      }
    };

    setTimeout(tick, 320);
  }, [navigate]);

  const triggerDiceRoll = () => {
    if (isRolling || isAnimRef.current || gameRef.current !== 'active' || pauseRef.current) return;
    setIsRolling(true);
    let rollTicks = 0;
    
    const interval = setInterval(() => {
      setDiceVal(Math.floor(Math.random() * 6) + 1);
      rollTicks++;
      if (rollTicks >= 8) {
        clearInterval(interval);
        const finalRoll = Math.floor(Math.random() * 6) + 1;
        setDiceVal(finalRoll);
        setIsRolling(false);
        moveCharacter(finalRoll);
      }
    }, 80);
  };

  const resetGame = () => {
    setDiceVal(1);
    setIsRolling(false);
    setTokenStep(0);
    setRelicCount(0);
    setGameState('active');
    setIsAnimating(false);
    setIsPaused(false);
    tokenRef.current = 0;
    isAnimRef.current = false;
    gameRef.current = 'active';
  };

  const currentLayoutIndex = WALK_PATH[tokenStep];
  const activeTile = BOARD_LAYOUT[currentLayoutIndex] || { row: 1, col: 5 };

  const computedLeft = `${(activeTile.col * 16.666) + 8.333}%`;
  const computedTop = `${(activeTile.row * 33.333) + 16.666}%`;

  return (
    <div className="l2g-frame">
      {bgImg && <img src={bgImg} className="l2g-bg-layer" alt="" />}

      {/* ── HUD HEADER ── */}
      <header className="l2g-hud-header">
        <div className="l2g-level-info">
          <p className="l2g-level-txt">LEVEL 2</p>
          <p className="l2g-name-txt">ANUBIS'S TOMB</p>
        </div>

        <div className="l2g-spirit-wrap">
          <div className="l2g-spirit-bar">
            {timerEmptyImg && <img src={timerEmptyImg} className="l2g-timer-img" alt="" />}
            <div className="l2g-fill-track">
              <div className="l2g-fill-bar" style={{ width: relicCount === 1 ? '50%' : relicCount === 2 ? '100%' : '0%' }}></div>
            </div>
          </div>
        </div>

        <div className="l2g-hud-right">
          <div className={`l2g-badge ${relicCount > 0 ? 'pop' : ''}`}>
            {counterBg && <img src={counterBg} className="l2g-badge-bg" alt="" />}
            <span className="l2g-badge-txt">{relicCount}/2</span>
          </div>
          <button className="l2g-pause-btn" onClick={() => setIsPaused(true)}>
            {pauseIconImg ? <img src={pauseIconImg} alt="Pause" /> : '⏸'}
          </button>
        </div>
      </header>

      {/* ── BOARD SYSTEM ── */}
      <main className="l2g-board-area">
        <div className="l2g-board-container-wrapper">
          {boardImg ? <img src={boardImg} className="l2g-board-img" alt="Level 2 Map" /> : <div className="l2g-board-fallback" />}

          <div className="l2g-wing-container l2g-wing-container--left">
            <div className={`l2g-integrated-dice ${isRolling ? 'rolling' : ''}`} onClick={triggerDiceRoll}>
              {DICE_IMGS[diceVal] ? <img src={DICE_IMGS[diceVal]} className="l2g-dice-gfx" alt="" /> : <span className="l2g-fallback-emoji">🎲</span>}
            </div>
          </div>

          <div className="l2g-wing-container l2g-wing-container--right">
            <div className="l2g-integrated-avatar-holder" />
          </div>

          <div className="l2g-grid">
            {BOARD_LAYOUT.map((tile, i) => {
              const isTokenHere = currentLayoutIndex === i;
              return (
                <div key={i} className={`l2g-tile ${isTokenHere ? 'l2g-tile--active' : ''}`} />
              );
            })}
          </div>

          {/* ── Animated Token Entity ── */}
          <div 
            className={`l2g-token ${isAnimating ? 'walking' : ''} ${gameState === 'failed' ? 'burning' : ''}`}
            style={{ left: computedLeft, top: computedTop }}
          >
            {tokenImg ? <img src={tokenImg} alt="Anubis" /> : <span style={{ fontSize: 24 }}>🐺</span>}
          </div>
        </div>
      </main>

      {/* ── PAUSE OVERLAY MODAL ── */}
      {isPaused && (
        <div className="l2g-pause-overlay">
          {gameLogoImg && <img src={gameLogoImg} className="l2g-pause-logo" alt="" />}
          <div className="l2g-pause-modal">
            {pauseMenuBg && <img src={pauseMenuBg} className="l2g-pause-modal-bg" alt="" />}
            <div className="l2g-pause-content">
              <button className="l2g-pause-btn-row" onClick={resetGame}>
                {btnGreenBg && <img src={btnGreenBg} className="l2g-pause-btn-bg" alt="" />}
                <span className="l2g-pause-btn-label">RESTART LEVEL</span>
              </button>
              <button className="l2g-pause-btn-row" onClick={() => setIsPaused(false)}>
                {btnGoldBg && <img src={btnGoldBg} className="l2g-pause-btn-bg" alt="" />}
                <span className="l2g-pause-btn-label">RESUME QUEST</span>
              </button>
              <button className="l2g-pause-btn-row" onClick={() => navigate('/menu')}>
                {btnRedBg && <img src={btnRedBg} className="l2g-pause-btn-bg" alt="" />}
                <span className="l2g-pause-btn-label">QUIT</span>
              </button>
            </div>
          </div>
          <div className="l2g-pause-audio">
            <button className="l2g-audio-btn">
              {soundOnIcon ? <img src={soundOnIcon} alt="sound" /> : <span style={{ fontSize: 22 }}>🔊</span>}
            </button>
            <button className="l2g-audio-btn">
              {musicOnIcon ? <img src={musicOnIcon} alt="music" /> : <span style={{ fontSize: 22 }}>🎵</span>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}