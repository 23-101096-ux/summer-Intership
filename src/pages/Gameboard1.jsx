import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Gameboard1.css';

let bgImg=null, boardImg=null, spiritBarBg=null, counterBg=null, pauseIconImg=null, anubisImg=null, timerEmptyImg=null;
let dice1=null, dice2=null, dice3=null, dice4=null, dice5=null, dice6=null;
let pauseMenuBg=null, gameLogoImg=null, btnGreenBg=null, btnGoldBg=null, btnRedBg=null, soundOnIcon=null, musicOnIcon=null;

try { bgImg         = require('../assets/bg.png');               } catch(_) {}
try { boardImg      = require('../assets/Group 40.png');         } catch(_) {}
try { spiritBarBg   = require('../assets/spirit-staff.png');     } catch(_) {}
try { counterBg     = require('../assets/counter-badge-bg.png'); } catch(_) {}
try { pauseIconImg  = require('../assets/pause-btn.png');        } catch(_) {}
try { anubisImg     = require('../assets/anubis.png');           } catch(_) {}
try { timerEmptyImg = require('../assets/timer-empty.png');      } catch(_) {}
try { dice1         = require('../assets/dice-1.png');           } catch(_) {}
try { dice2         = require('../assets/dice-2.png');           } catch(_) {}
try { dice3         = require('../assets/dice-3.png');           } catch(_) {}
try { dice4         = require('../assets/dice-4.png');           } catch(_) {}
try { dice5         = require('../assets/dice-5.png');           } catch(_) {}
try { dice6         = require('../assets/dice-6.png');           } catch(_) {}

// Pause menu background panel, logo, button slices, and bottom controller assets
try { pauseMenuBg   = require('../assets/pause-menu-panel.png'); } catch(_) {}
try { gameLogoImg   = require('../assets/game-logo.png');        } catch(_) {}
try { btnGreenBg    = require('../assets/btn-green.png');        } catch(_) {}
try { btnGoldBg     = require('../assets/btn-golddd.png');         } catch(_) {}
try { btnRedBg      = require('../assets/btn-red.png');          } catch(_) {}
try { soundOnIcon   = require('../assets/sound-toggle.png');     } catch(_) {}
try { musicOnIcon   = require('../assets/music-toggle.png');     } catch(_) {}

const DICE_IMGS = [null, dice1, dice2, dice3, dice4, dice5, dice6];

const WALK_PATH = [
  {x:8.0, y:27}, {x:21.5, y:27}, {x:35.0, y:27}, {x:48.5, y:27}, {x:62.0, y:27}, {x:75.5, y:27},
  {x:91.5, y:50}, {x:75.5, y:50}, {x:62.0, y:50}, {x:48.5, y:50}, {x:35.0, y:50}, {x:21.5, y:50},
  {x:8.0, y:74}, {x:21.5, y:74}, {x:35.0, y:74}, {x:48.5, y:74}, {x:62.0, y:74}, {x:75.5, y:74},
];
const COLLECTIBLE_CELLS = new Set([0, 2, 4, 5, 12, 17]);
const WIN_THRESHOLD = 3;

function DiceFallback({value}){
  const d={1:[[50,50]],2:[[28,28],[72,72]],3:[[28,28],[50,50],[72,72]],4:[[28,28],[72,28],[28,72],[72,72]],5:[[28,28],[72,28],[50,50],[28,72],[72,72]],6:[[28,22],[72,22],[28,50],[72,50],[28,78],[72,78]]};
  return(<svg viewBox="0 0 100 100" style={{width:'100%',height:'100%'}}><rect x="4" y="4" width="92" height="92" rx="14" fill="#071820" stroke="#c8921a" strokeWidth="3"/>{(d[value]||[]).map(([cx,cy],i)=><circle key={i} cx={cx} cy={cy} r="8" fill="#00e5ff"/>)}</svg>);
}

function GameBoard1() {
  const navigate = useNavigate();
  const [diceVal, setDiceVal] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [tokenStep, setTokenStep] = useState(0);
  const [collected, setCollected] = useState(0);
  const [clearedSteps, setClearedSteps] = useState(new Set());
  const [isPauseActive, setIsPauseActive] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [badgePop, setBadgePop] = useState(false);

  const tokenRef = useRef(0);
  const isAnimRef = useRef(false);
  const clearedRef = useRef(new Set());
  const pauseRef = useRef(false);

  useEffect(() => { tokenRef.current = tokenStep; }, [tokenStep]);
  useEffect(() => { isAnimRef.current = isAnimating; }, [isAnimating]);
  useEffect(() => { clearedRef.current = clearedSteps; }, [clearedSteps]);
  useEffect(() => { pauseRef.current = isPauseActive; }, [isPauseActive]);

  useEffect(() => {
    if (collected >= WIN_THRESHOLD) {
      const t = setTimeout(() => navigate('/winpage'), 400);
      return () => clearTimeout(t);
    }
  }, [collected, navigate]);

  const moveCharacter = useCallback((steps) => {
    isAnimRef.current = true; setIsAnimating(true); let step = 0;
    const tick = () => {
      if (pauseRef.current) return; 
      const next = Math.min(tokenRef.current + 1, WALK_PATH.length - 1);
      step++; tokenRef.current = next; setTokenStep(next);

      if (COLLECTIBLE_CELLS.has(next) && !clearedRef.current.has(next)) {
        const u = new Set([...clearedRef.current, next]);
        clearedRef.current = u; setClearedSteps(u);
        setCollected(c => c+1); setBadgePop(true);
        setTimeout(() => setBadgePop(false), 350);
      }
      if (step < steps && next < WALK_PATH.length - 1) setTimeout(tick, 300);
      else { isAnimRef.current = false; setIsAnimating(false); }
    };
    setTimeout(tick, 100);
  }, []);

  const triggerDiceRoll = useCallback(() => {
    if (isAnimRef.current || isPauseActive || collected >= WIN_THRESHOLD) return;
    setIsRolling(true); let ticks = 0;
    const iv = setInterval(() => {
      setDiceVal(Math.ceil(Math.random() * 6)); ticks++;
      if (ticks >= 10) {
        clearInterval(iv); const f = Math.ceil(Math.random() * 6);
        setDiceVal(f); setIsRolling(false); moveCharacter(f);
      }
    }, 55);
  }, [moveCharacter, isPauseActive, collected]);

  const resetGame = () => {
    tokenRef.current = 0; clearedRef.current = new Set(); isAnimRef.current = false;
    setTokenStep(0); setCollected(0); setClearedSteps(new Set());
    setDiceVal(1); setIsRolling(false); setIsAnimating(false); setIsPauseActive(false);
  };

  const energyPct = (collected / WIN_THRESHOLD) * 100;
  const pos = WALK_PATH[tokenStep];

  return (
    <div className="egypt-game-frame">
      {bgImg && <img src={bgImg} className="egypt-game-bg" alt="" />}

      {/* ── HUD HEADER ── */}
      <header className="egypt-hud-header">
        <div className="egypt-hud-level-info">
          <h2 className="egypt-hud-title-level">Level 1</h2>
          <h4 className="egypt-hud-title-sub">COURTYARD</h4>
        </div>

        <div className="egypt-spirit-energy-container">
          <div className="egypt-spirit-bar-wrap">
            <div className="egypt-spirit-fill-track">
              <div className="egypt-spirit-gradient-fill" style={{ width: `${energyPct}%` }} />
            </div>
            {timerEmptyImg && <img src={timerEmptyImg} className="egypt-spirit-timer-asset" alt="" />}
            {/* {spiritBarBg && <img src={spiritBarBg} className="egypt-spirit-staff-asset" alt="" />} */}
          </div>
        </div>

        <div className="egypt-hud-right-controls">
          <div className={`egypt-collect-counter-badge${badgePop ? ' pop-trigger' : ''}`}>
            {counterBg && <img src={counterBg} className="egypt-badge-bg-asset" alt="" />}
            <span className="egypt-badge-text-val">{collected}/{WIN_THRESHOLD}</span>
          </div>
          <button className="egypt-pause-nav-button" onClick={() => setIsPauseActive(true)} aria-label="Pause">
            {pauseIconImg ? <img src={pauseIconImg} alt="⏸" style={{ width: 14, height: 14, objectFit: 'contain' }} /> : <span>⏸</span>}
          </button>
        </div>
      </header>

      {/* ── GAME BOARD ── */}
      <main className="egypt-board-canvas-area">
        <div className="egypt-board-image-wrap">
          {boardImg ? <img src={boardImg} className="egypt-board-bg-img" alt="board" /> : <div className="egypt-board-bg-fallback" />}
          <div className="board-overlay-chambers-layer">
            {clearedSteps.has(4) && <div className="dark-void-mask top-right-ankh-chamber" />}
            {clearedSteps.has(2) && <div className="dark-void-mask top-left-scarab-chamber" />}
          </div>
          <div
            className={`egypt-player-token${isAnimating ? ' anim-walking' : ''}`}
            style={{
              position: 'absolute', left: `${pos.x}%`, top: `${pos.y}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'left 0.3s cubic-bezier(0.25,1,0.5,1), top 0.3s cubic-bezier(0.25,1,0.5,1)'
            }}
          >
            <div className="anubis-token-wrapper">
              {anubisImg ? <img src={anubisImg} className="anubis-head-graphic" alt="Anubis" /> : <span style={{ fontSize: 28 }}>🐺</span>}
            </div>
          </div>
        </div>
      </main>

      {/* ── DICE MODULE ── */}
      <footer className="egypt-dice-rolling-terminal">
        <div className={`egypt-interactive-dice${isRolling ? ' rolling-anim' : ''}`} onClick={triggerDiceRoll}>
          {DICE_IMGS[diceVal] ? <img src={DICE_IMGS[diceVal]} alt={`Dice ${diceVal}`} /> : <DiceFallback value={diceVal} />}
        </div>
      </footer>

      {/* ── INTERACTIVE PAUSE OVERLAY MODAL ── */}
      {isPauseActive && (
        <div className="egypt-pause-screen-overlay">
          
          {/* Logo sits layered over top of the layout window frame */}
          {gameLogoImg && <img src={gameLogoImg} className="egypt-pause-logo-header" alt="Neon Nephthys Logo" />}

          <div className="egypt-pause-modal-container">

            {pauseMenuBg && <img src={pauseMenuBg} className="egypt-pause-panel-bg-asset" alt="" />}
            
            <div className="egypt-pause-content-layout">
            
              <div className="egypt-pause-actions-group">
                <button className="egypt-pause-action-row-btn" onClick={resetGame}>
                  {btnGreenBg && <img src={btnGreenBg} className="egypt-btn-asset-slice" alt="" />}
                  <span className="egypt-btn-label">RESTART LEVEL</span>
                </button>

                <button className="egypt-pause-action-row-btn" onClick={() => setIsPauseActive(false)}>
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

          {/* Lower Audio Toggle Nodes floating cleanly beneath the container box */}
          <div className="egypt-pause-audio-controls">
            <button className="egypt-audio-toggle-node" aria-label="Toggle Sound Effects">
              {soundOnIcon ? <img src={soundOnIcon} alt="Sound FX Toggle" /> : <span className="fallback-ico">🔊</span>}
            </button>
            <button className="egypt-audio-toggle-node" aria-label="Toggle Background Music">
              {musicOnIcon ? <img src={musicOnIcon} alt="Music Track Toggle" /> : <span className="fallback-ico">🎵</span>}
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
export default GameBoard1;