import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Gameboard3.css';

// ── Asset Layer Mapping ──────────────────────────────────────────────────────
let bgImg=null, boardImg=null, tokenImg=null;
let pauseIconImg=null, counterBg=null, timerEmptyImg=null;
let dice1=null, dice2=null, dice3=null, dice4=null, dice5=null, dice6=null;
let pauseMenuBg=null, gameLogoImg=null, btnGreenBg=null, btnGoldBg=null, btnRedBg=null;
let soundOnIcon=null, musicOnIcon=null;
let diceStrategyBg=null, singleDiceBtnBg=null, doubleDiceBtnBg=null, activeDiceBtnBg=null;

try { bgImg            = require('../assets/bg.png');                    } catch(_) {}
try { boardImg         = require('../assets/board-level3.png');          } catch(_) {}
try { tokenImg         = require('../assets/anubis3.png');                } catch(_) {}
try { pauseIconImg     = require('../assets/pause-btn3.png');             } catch(_) {}
try { counterBg        = require('../assets/counter-badge-bg3.png');      } catch(_) {}
try { timerEmptyImg    = require('../assets/timer-empty3.png');           } catch(_) {}
try { dice1            = require('../assets/dice3-1.png');                } catch(_) {}
try { dice2            = require('../assets/dice3-2.png');                } catch(_) {}
try { dice3            = require('../assets/dice3-3.png');                } catch(_) {}
try { dice4            = require('../assets/dice3-4.png');                } catch(_) {}
try { dice5            = require('../assets/dice3-5.png');                } catch(_) {}
try { dice6            = require('../assets/dice3-6.png');                } catch(_) {}
try { pauseMenuBg      = require('../assets/pause-menu-panel.png');      } catch(_) {}
try { gameLogoImg      = require('../assets/game-logo.png');             } catch(_) {}
try { btnGreenBg       = require('../assets/btn-green.png');             } catch(_) {}
try { btnGoldBg        = require('../assets/btn-golddd.png');            } catch(_) {}
try { btnRedBg         = require('../assets/btn-red.png');               } catch(_) {}
try { soundOnIcon      = require('../assets/sound-toggle.png');          } catch(_) {}
try { musicOnIcon      = require('../assets/music-toggle.png');          } catch(_) {}
try { diceStrategyBg   = require('../assets/dice-strategy-frame.png');   } catch(_) {}
try { singleDiceBtnBg  = require('../assets/btn-1dice-inactive.png');     } catch(_) {}
try { doubleDiceBtnBg  = require('../assets/btn-2dice-active.png');       } catch(_) {}
try { activeDiceBtnBg  = require('../assets/btn-dice-active-glow.png');   } catch(_) {}

const DICE_IMGS = [null, dice1, dice2, dice3, dice4, dice5, dice6];

const BOARD_LAYOUT = [
  { row:0, col:0 }, { row:0, col:1 }, { row:0, col:2 }, { row:0, col:3 }, { row:0, col:4 }, { row:0, col:5 }, { row:0, col:6 }, { row:0, col:7 },
  { row:1, col:0 }, { row:1, col:1 }, { row:1, col:2 }, { row:1, col:3 }, { row:1, col:4 }, { row:1, col:5 }, { row:1, col:6 }, { row:1, col:7 },
  { row:2, col:0 }, { row:2, col:1 }, { row:2, col:2 }, { row:2, col:3 }, { row:2, col:4 }, { row:2, col:5 }, { row:2, col:6 }, { row:2, col:7 },
  { row:3, col:0 }, { row:3, col:1 }, { row:3, col:2 }, { row:3, col:3 }, { row:3, col:4 }, { row:3, col:5 }, { row:3, col:6 }, { row:3, col:7 }
];

// Path layout matrices
const WALK_PATH = [8, 9, 10, 2, 3, 4, 12, 13, 14, 22, 21, 20, 19, 18, 26, 25, 27, 28, 29];

// 3 Designated placements for the golden items along the path array indices
const GOLD_RELIC_CONFIG = [
  { id: 1, pathIndex: 4, gridIdx: 3 },
  { id: 2, pathIndex: 10, gridIdx: 21 },
  { id: 3, pathIndex: 15, gridIdx: 25 }
];

export default function Gameboard3() {
  const navigate = useNavigate();

  // State Management
  const [diceVal1, setDiceVal1] = useState(3);
  const [diceVal2, setDiceVal2] = useState(5);
  const [diceCountMode, setDiceCountMode] = useState(2); 
  const [isRolling, setIsRolling] = useState(false);
  const [tokenStep, setTokenStep] = useState(0);
  const [relicsCollected, setRelicsCollected] = useState([]);
  const [spiritEnergy, setSpiritEnergy] = useState(70); 
  const [gameState, setGameState] = useState('active'); 
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rollCount, setRollCount] = useState(0);

  const tokenRef = useRef(0);
  const isAnimRef = useRef(false);
  const gameRef = useRef('active');
  const pauseRef = useRef(false);

  useEffect(() => { tokenRef.current = tokenStep; }, [tokenStep]);
  useEffect(() => { isAnimRef.current = isAnimating; }, [isAnimating]);
  useEffect(() => { gameRef.current = gameState; }, [gameState]);
  useEffect(() => { pauseRef.current = isPaused; }, [isPaused]);

  const moveCharacterDirectly = useCallback((targetIndex) => {
    isAnimRef.current = true;
    setIsAnimating(true);

    const tick = () => {
      if (pauseRef.current) {
        setTimeout(tick, 200);
        return;
      }

      const next = tokenRef.current + 1;
      tokenRef.current = next;
      setTokenStep(next);

      // Keep spirit bar boosted instead of draining
      setSpiritEnergy(prev => Math.min(100, prev + 2));

      // Check real-time intersection with the gold relics
      GOLD_RELIC_CONFIG.forEach(relic => {
        if (next >= relic.pathIndex) {
          setRelicsCollected(prev => {
            if (!prev.includes(relic.id)) {
              return [...prev, relic.id];
            }
            return prev;
          });
        }
      });

      if (next >= targetIndex || next >= WALK_PATH.length - 1) {
        setIsAnimating(false);
        isAnimRef.current = false;
        
        // Auto-resolve game elements if reaching final quadrant step
        if (next === WALK_PATH.length - 1) {
          setGameState('victory');
          setRelicsCollected([1, 2, 3]); // Guarantee full clear counter
          setSpiritEnergy(100);
          setTimeout(() => {
            navigate('/level3victory');
          }, 1200);
        }
        return;
      }

      setTimeout(tick, 220);
    };

    setTimeout(tick, 220);
  }, [navigate]);

  const triggerDiceRoll = () => {
    if (isRolling || isAnimRef.current || gameRef.current !== 'active' || pauseRef.current) return;
    setIsRolling(true);
    let ticks = 0;

    const interval = setInterval(() => {
      setDiceVal1(Math.floor(Math.random() * 6) + 1);
      setDiceVal2(Math.floor(Math.random() * 6) + 1);
      ticks++;

      if (ticks >= 10) {
        clearInterval(interval);
        
        setDiceVal1(3);
        setDiceVal2(5);
        setIsRolling(false);

        const nextRollTracker = rollCount + 1;
        setRollCount(nextRollTracker);

        if (nextRollTracker === 1) {
          // Roll 1: Pass first items and land clean halfway
          moveCharacterDirectly(9);
        } else {
          // Roll 2: Collect everything, display glow, and trigger win page
          moveCharacterDirectly(WALK_PATH.length - 1);
        }
      }
    }, 70);
  };

  const resetGame = () => {
    setDiceVal1(3);
    setDiceVal2(5);
    setTokenStep(0);
    setRollCount(0);
    setRelicsCollected([]);
    setSpiritEnergy(70);
    setGameState('active');
    setIsAnimating(false);
    setIsPaused(false);
    tokenRef.current = 0;
    isAnimRef.current = false;
    gameRef.current = 'active';
  };

  const currentLayoutIndex = WALK_PATH[tokenStep];
  const activeTile = BOARD_LAYOUT[currentLayoutIndex] || { row: 1, col: 0 };

  const computedLeft = `${(activeTile.col * 12.5) + 6.25}%`;
  const computedTop = `${(activeTile.row * 25) + 12.5}%`;

  return (
    <div className="l3g-viewport-frame">
      {bgImg && <img src={bgImg} className="l3g-screen-bg-layer" alt="" />}

     
      <header className="l3g-top-hud">
        <div className="l3g-level-badge-zone">
          <p className="l3g-title-primary">LEVEL 3</p>
          <p className="l3g-title-sub">FINAL JUDGMENT</p>
        </div>

        <div className="l3g-spirit-meter-container">
          <div className="l3g-meter-bar-wrapper">
            {timerEmptyImg && <img src={timerEmptyImg} className="l3g-meter-bg-slice" alt="" />}
            {/* <div 
              className="l3g-meter-fill-bar" 
              style={{ width: `${spiritEnergy}%` }}
            /> */}
          </div>
        </div>

        <div className="l3g-hud-interactive-right">
          <div className="l3g-relic-counter">
            {counterBg && <img src={counterBg} className="l3g-counter-bg-image" alt="" />}
            <span className="l3g-counter-numerical-txt">{relicsCollected.length}/3</span>
          </div>
          <button className="l3g-trigger-pause-btn" onClick={() => setIsPaused(true)}>
            {pauseIconImg ? <img src={pauseIconImg} alt="" /> : '⏸'}
          </button>
        </div>
      </header>

      {/* ── MAIN ARENA CONTENT ── */}
      <main className="l3g-game-arena-core">
        
        {/* Left Side Controller Area */}
        <div className="l3g-control-sidebar-left">
          <div className="l3g-strategy-panel-container">
            {diceStrategyBg && <img src={diceStrategyBg} className="l3g-panel-structural-bg" alt="" />}
            
            <div className="l3g-dice-mode-toggle-group">
              <button className={`l3g-mode-toggle-btn ${diceCountMode === 1 ? 'active' : ''}`} onClick={() => setDiceCountMode(1)}>
                {diceCountMode === 1 && activeDiceBtnBg ? <img src={activeDiceBtnBg} className="l3g-btn-bg-asset" alt="" /> : (singleDiceBtnBg && <img src={singleDiceBtnBg} className="l3g-btn-bg-asset" alt="" />)}
                <span className="l3g-btn-overlay-label">1 DICE</span>
              </button>
              
              <button className={`l3g-mode-toggle-btn ${diceCountMode === 2 ? 'active' : ''}`} onClick={() => setDiceCountMode(2)}>
                {diceCountMode === 2 && activeDiceBtnBg ? <img src={activeDiceBtnBg} className="l3g-btn-bg-asset" alt="" /> : (doubleDiceBtnBg && <img src={doubleDiceBtnBg} className="l3g-btn-bg-asset" alt="" />)}
                <span className="l3g-btn-overlay-label">2 DICE</span>
              </button>
            </div>
          </div>

          <div className={`l3g-dice-clickable-box ${isRolling ? 'l3g-spin-effect' : ''}`} onClick={triggerDiceRoll}>
            <div className="l3g-dice-render-row">
              {DICE_IMGS[diceVal1] ? <img src={DICE_IMGS[diceVal1]} className="l3g-dice-slice" alt="" /> : <div className="l3g-dice-fallback">{diceVal1}</div>}
              {diceCountMode === 2 && (DICE_IMGS[diceVal2] ? <img src={DICE_IMGS[diceVal2]} className="l3g-dice-slice" alt="" /> : <div className="l3g-dice-fallback">{diceVal2}</div>)}
            </div>
          </div>
        </div>

        {/* Level 3 Labyrinth Stage Canvas Container */}
        <div className="l3g-board-relative-wrapper">
          {boardImg ? <img src={boardImg} className="l3g-map-graphic-asset" alt="" /> : <div className="l3g-map-placeholder" />}

          {/* Clean Virtual Track Overlay */}
          <div className="l3g-virtual-grid-layer">
            {BOARD_LAYOUT.map((pos, idx) => {
              // Find if this specific grid location holds a gold treasure relic
              const activeRelic = GOLD_RELIC_CONFIG.find(r => r.gridIdx === idx);
              const isCollected = activeRelic ? relicsCollected.includes(activeRelic.id) : false;

              return (
                <div key={idx} className="l3g-grid-cell">
                  {activeRelic && (
                    <div className={`l3g-gold-relic-node ${isCollected ? 'collected' : ''}`}>
                      <div className="l3g-gold-glow-ring" />
                      <div className="l3g-gold-orb-mesh" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Anubis Figure Token Component */}
          <div 
            className={`l3g-hero-token ${isAnimating ? 'l3g-walking' : ''}`}
            style={{ left: computedLeft, top: computedTop }}
          >
            {tokenImg ? <img src={tokenImg} alt="Anubis" /> : <div className="l3g-token-emoji" />}
          </div>
        </div>
      </main>

      {/* ── INTERACTIVE MODAL OVERLAY DIALOG ── */}
      {isPaused && (
        <div className="l3g-modal-blur-overlay">
          {gameLogoImg && <img src={gameLogoImg} className="l3g-modal-branding-logo" alt="" />}
          <div className="l3g-modal-menu-window">
            {pauseMenuBg && <img src={pauseMenuBg} className="l3g-modal-window-bg" alt="" />}
            <div className="l3g-modal-actions-container">
              <button className="l3g-modal-btn-row" onClick={resetGame}>
                {btnGreenBg && <img src={btnGreenBg} className="l3g-modal-btn-slice-asset" alt="" />}
                <span className="l3g-modal-btn-text-field">RESTART JUDGMENT</span>
              </button>
              <button className="l3g-modal-btn-row" onClick={() => setIsPaused(false)}>
                {btnGoldBg && <img src={btnGoldBg} className="l3g-modal-btn-slice-asset" alt="" />}
                <span className="l3g-modal-btn-text-field">RESUME MATCH</span>
              </button>
              <button className="l3g-modal-btn-row" onClick={() => navigate('/menu')}>
                {btnRedBg && <img src={btnRedBg} className="l3g-modal-btn-slice-asset" alt="" />}
                <span className="l3g-modal-btn-text-field">ABANDON QUEST</span>
              </button>
            </div>
          </div>
          <div className="l3g-modal-audio-toggles-bar">
            <button className="l3g-audio-icon-button">{soundOnIcon ? <img src={soundOnIcon} alt="" /> : '🔊'}</button>
            <button className="l3g-audio-icon-button">{musicOnIcon ? <img src={musicOnIcon} alt="" /> : '🎵'}</button>
          </div>
        </div>
      )}
    </div>
  );
}