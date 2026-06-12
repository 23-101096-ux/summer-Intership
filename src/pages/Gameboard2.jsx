import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Gameboard2.css';

// ── Asset Safe Imports ────────────────────────────────────────────────────────
let bgImg         = null;
let boardPathImg  = null;
let tokenImg      = null;
let fireMonsterImg= null;
let pauseIconImg  = null;
let counterBg     = null;

let ankhIcon      = null;
let lotusIcon     = null;
let lockIcon      = null;

let dice1=null, dice2=null, dice3=null, dice4=null, dice5=null, dice6=null;
let defeatPanelBg = null;

try { bgImg          = require('../assets/bg.png');               } catch(_) {}
try { boardPathImg   = require('../assets/Group 40.png');         } catch(_) {} // Level 2 structural track vector
try { tokenImg       = require('../assets/goldencharecter2.png'); } catch(_) {}
try { fireMonsterImg = require('../assets/fire.png');              } catch(_) {}
try { pauseIconImg   = require('../assets/pause-btn.png');        } catch(_) {}
try { counterBg      = require('../assets/counter-badge-bg.png'); } catch(_) {}
try { ankhIcon       = require('../assets/yellowmoftah.png');     } catch(_) {}
try { lotusIcon      = require('../assets/warda.png');            } catch(_) {}
try { lockIcon       = require('../assets/bluelock.png');         } catch(_) {}

try { dice1          = require('../assets/dice-1.png');           } catch(_) {}
try { dice2          = require('../assets/dice-2.png');           } catch(_) {}
try { dice3          = require('../assets/dice-3.png');           } catch(_) {}
try { dice4          = require('../assets/dice-4.png');           } catch(_) {}
try { dice5          = require('../assets/dice-5.png');           } catch(_) {}
try { dice6          = require('../assets/dice-6.png');           } catch(_) {}

const DICE_IMGS = { 1: dice1, 2: dice2, 3: dice3, 4: dice4, 5: dice5, 6: dice6 };

// 12 Exact Node Positions Mapping Level 2 Path Steps Visually From Your Screenshots
const PATH_STEPS = [
    { x: 110, y: 280, item: null },
    { x: 180, y: 260, item: 'ankh' },
    { x: 260, y: 230, item: null },
    { x: 310, y: 160, item: 'lotus' },
    { x: 380, y: 120, item: null },
    { x: 460, y: 150, item: 'lock' },
    { x: 530, y: 200, item: null },
    { x: 610, y: 250, item: 'ankh' },
    { x: 680, y: 220, item: null },
    { x: 740, y: 160, item: 'lotus' },
    { x: 780, y: 110, item: 'fire_trap' }, // The inevitable doom trap tile layout node
];

const GameBoard2 = () => {
    const navigate = useNavigate();
    
    // Core Game Mechanics State Matrix
    const [playerIndex, setPlayerIndex] = useState(0);
    const [fireIndex, setFireIndex] = useState(-2); // Fire starts behind tracking the path steps
    const [collectedCount, setCollectedCount] = useState(0);
    const [activeGlowTile, setActiveGlowTile] = useState(null);
    const [collectedItems, setCollectedItems] = useState({}); // Tracking vanished assets
    
    const [diceVal, setDiceVal] = useState(1);
    const [isRolling, setIsRolling] = useState(false);
    const [gameState, setGameState] = useState('active'); // active, losing_anim, defeated
    const [isPauseActive, setIsPauseActive] = useState(false);

    // Dynamic collection light flashing mechanics
    const triggerCollectionGlow = (index, itemName) => {
        setActiveGlowTile(index);
        setCollectedCount(prev => prev + 1);
        
        // Let item safely disappear with blue energy trail frame timing
        setTimeout(() => {
            setCollectedItems(prev => ({ ...prev, [index]: true }));
            setActiveGlowTile(null);
        }, 800);
    };

    const triggerDiceRoll = () => {
        if (isRolling || gameState !== 'active') return;

        setIsRolling(true);
        let ticks = 0;
        const interval = setInterval(() => {
            setDiceVal(Math.floor(Math.random() * 3) + 1); // Controlled steps to enjoy the chase sequences
            ticks++;
            if (ticks >= 8) {
                clearInterval(interval);
                
                // Absolute final calculated steps
                const finalRoll = Math.floor(Math.random() * 2) + 1;
                setDiceVal(finalRoll);
                setIsRolling(false);

                // Calculate next positional grid leap
                setPlayerIndex(prev => {
                    const nextPos = Math.min(prev + finalRoll, PATH_STEPS.length - 1);
                    
                    // Fire tracks forward right behind player's velocity vectors
                    setFireIndex(prevFire => Math.min(prevFire + 1, nextPos));

                    // Evaluate Tile Land Event Conditions
                    const targetTile = PATH_STEPS[nextPos];
                    if (targetTile.item && !collectedItems[nextPos] && targetTile.item !== 'fire_trap') {
                        triggerCollectionGlow(nextPos, targetTile.item);
                    }

                    // SCRIPTED LOSE MECHANIC: Touch Wall / Reach Destination Fire Trap Node
                    if (nextPos >= PATH_STEPS.length - 1 || nextPos <= fireIndex + 1) {
                        setGameState('losing_anim');
                        setTimeout(() => {
                            setGameState('defeated');
                        }, 1200);
                    }

                    return nextPos;
                });
            }
        }, 80);
    };

    const resetLevel = () => {
        setPlayerIndex(0);
        setFireIndex(-2);
        setCollectedCount(0);
        setCollectedItems({});
        setActiveGlowTile(null);
        setGameState('active');
    };

    const playerPos = PATH_STEPS[playerIndex];
    const firePos = PATH_STEPS[Math.max(0, fireIndex)];

    return (
        <div className="l2g-frame">
            {bgImg && <img src={bgImg} className="l2g-bg-layer" alt="" />}

            {/* ── UPPER STATS HUD BANNER LAYER ── */}
            <header className="l2g-hud-header">
                <div className="l2g-hud-cluster">
                    <button className="l2g-pause-trigger-btn" onClick={() => setIsPauseActive(true)}>
                        {pauseIconImg ? <img src={pauseIconImg} alt="Pause" /> : <span>⏸</span>}
                    </button>
                    
                    <div className="l2g-badge-counter" style={{ backgroundImage: `url(${counterBg})` }}>
                        <span className="l2g-counter-title">RELICS SECURED</span>
                        <span className="l2g-counter-value text-teal-glow">{collectedCount}</span>
                    </div>
                </div>

                <div className="l2g-chapter-label-frame">
                    <span className="l2g-chapter-txt-main">VALLEY OF THE KINGS</span>
                    <span className="l2g-chapter-txt-sub">ESCAPE THE FLAMES</span>
                </div>
            </header>

            {/* ── CORE TRACK MAP BOARD CONTAINER VIEW ── */}
            <main className="l2g-viewport-board">
                {boardPathImg && <img src={boardPathImg} className="l2g-vector-path-track" alt="" />}

                {/* Render Path Steps & Interactive Relics */}
                {PATH_STEPS.map((step, idx) => {
                    if (!step.item) return null;
                    const isVanished = collectedItems[idx];
                    const hasActiveGlow = activeGlowTile === idx;

                    return (
                        <div 
                            key={idx}
                            className={`l2g-map-item-node ${hasActiveGlow ? 'trigger-blue-glow' : ''} ${isVanished ? 'fade-out-vanish' : ''}`}
                            style={{ left: `${step.x}px`, top: `${step.y}px` }}
                        >
                            {step.item === 'ankh' && ankhIcon && <img src={ankhIcon} className="l2g-item-asset-pic" alt="" />}
                            {step.item === 'lotus' && lotusIcon && <img src={lotusIcon} className="l2g-item-asset-pic" alt="" />}
                            {step.item === 'lock' && lockIcon && <img src={lockIcon} className="l2g-item-asset-pic" alt="" />}
                            {step.item === 'fire_trap' && <div className="l2g-static-fire-wall" />}
                        </div>
                    );
                })}

                {/* Fire Chaser Element Node */}
                {fireIndex >= 0 && (
                    <div 
                        className="l2g-fire-tracker-node"
                        style={{ left: `${firePos.x}px`, top: `${firePos.y}px` }}
                    >
                        {fireMonsterImg ? <img src={fireMonsterImg} alt="Creeping Fire" /> : <div className="fallback-fire" />}
                    </div>
                )}

                {/* Character Player Token */}
                <div 
                    className={`l2g-player-token-avatar ${gameState === 'losing_anim' ? 'burning-impact-state' : ''}`}
                    style={{ left: `${playerPos.x}px`, top: `${playerPos.y}px` }}
                >
                    {tokenImg ? <img src={tokenImg} alt="Player Character" /> : <div className="fallback-token" />}
                </div>
            </main>

            {/* ── RIGHT DOCK REPOSITIONED DICE CONTROL BAR ── */}
            <aside className="l2g-side-dice-terminal">
                <div className="l2g-terminal-inner">
                    <span className="l2g-dice-panel-heading">ROLL TO RUN</span>
                    <div 
                        className={`l2g-interactive-dice-cube ${isRolling ? 'rolling-cube-anim' : ''}`}
                        onClick={triggerDiceRoll}
                    >
                        {DICE_IMGS[diceVal] ? (
                            <img src={DICE_IMGS[diceVal]} alt={`Dice ${diceVal}`} />
                        ) : (
                            <div className="l2g-fallback-dice-box">{diceVal}</div>
                        )}
                    </div>
                    <span className="l2g-dice-hint-string">TAP CUBE</span>
                </div>
            </aside>

            {/* ── DEFEATED INESCAPABLE LOSE OVERLAY VIEW SCREEN ── */}
            {gameState === 'defeated' && (
                <div className="l2g-modal-overlay-screen-shield animate-fade-in">
                    <div className="l2g-status-panel-window">
                        <h3 className="l2g-status-header-text title-crimson-burn">💀 DEFEATED</h3>
                        <p className="l2g-status-body-details">
                            The raging fire caught you! You managed to rescue {collectedCount} valley relics before turning to ash.
                        </p>
                        <div className="l2g-action-button-group-row">
                            <button className="l2g-modal-action-trigger btn-restyle-gold" onClick={resetLevel}>
                                TRY AGAIN
                            </button>
                            <button className="l2g-modal-action-trigger btn-restyle-red" onClick={() => navigate('/gameboard1')}>
                                BACK TO LEVEL 1
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GameBoard2;