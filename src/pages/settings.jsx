import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './settings.css';

import bgImg           from '../assets/bg.png';
import frameImg        from '../assets/settings-frame.png';
import titleBannerImg  from '../assets/settings-title-banner.png';
import sectionSettings from '../assets/setttings.png';
import sectionGameplay from '../assets/gameplay.png';
import sectionGraphics from '../assets/GRAPHICSQUALITY.png';
import sectionOthers   from '../assets/others.png';
import emblemImg       from '../assets/ankh-emblem.png';
import btnGoldImg      from '../assets/btn-gold.png';
import btnBlueImg      from '../assets/btn-blue.png';
import toggleOnImg     from '../assets/toggle-on.png';
import toggleOffImg    from '../assets/toggle-off.png';
import cancelBgImg     from '../assets/btn-cancel.png';
import saveBgImg       from '../assets/btn-save.png';
import sliderHalfBg    from '../assets/slider-half.png';
import sliderFullBg    from '../assets/slider-full.png';
import btnResetBgImg   from '../assets/btn-reset-bg.png';
import btnHelpBgImg    from '../assets/btn-help-bg.png';

const QUALITY_LEVELS = ['LOW', 'MEDIUM', 'HIGH'];

/* ── Interactive Image-Swapping Slider ──────────────────────── */
const InteractiveSlider = ({ isActive, onClick, label }) => {
    return (
        <button 
            className="settings-slider-clickable-row" 
            onClick={onClick}
            aria-label={label}
        >
            <img 
                src={isActive ? sliderFullBg : sliderHalfBg} 
                className="settings-slider-bg-asset" 
                alt="Slider Track State" 
                draggable={false} 
            />
        </button>
    );
};

/* ── Sub-Rendering Components ───────────────────────────────── */
const Toggle = ({ on, onToggle }) => (
    <button className="settings-toggle-btn" onClick={onToggle} aria-pressed={on}>
        <img src={on ? toggleOnImg : toggleOffImg} alt={on ? 'On' : 'Off'} />
    </button>
);

const SectionHeading = ({ title }) => (
    <div className="settings-section__heading">
        <span className="settings-section__title">{title}</span>
    </div>
);

/* ── Main Panel View Component ───────────────────────────────── */
const Settings = () => {
    const navigate = useNavigate();

    const [quality, setQuality]       = useState('HIGH');
    const [sound, setSound]           = useState(false);
    const [vibrate, setVibrate]       = useState(true);
    const [notif, setNotif]           = useState(true);
    
    // States to control whether the asset is Full (true) or Half (false)
    const [volFull, setVolFull]       = useState(true);   
    const [sfxFull, setSfxFull]       = useState(false);   

    return (
        <div className="settings-wrapper">
            <img src={bgImg} className="settings-wrapper__bg" alt="" />

            <div className="settings-frame">
                <img src={frameImg} className="settings-frame__bg" alt="" />

                <div className="settings-title-banner">
                    <img src={titleBannerImg} className="settings-title-banner__img" alt="" />
                    <span className="settings-title-banner__text">SETTINGS</span>
                </div>

                <div className="settings-content">

                    {/* Audio Sliders Container */}
                    <div className="settings-section settings-section--sliders">
                        <img src={sectionSettings} className="settings-section__frame-img" alt="" />
                        <div className="settings-section__inner">
                            <SectionHeading title="SETTINGS" />
                            <InteractiveSlider 
                                isActive={volFull} 
                                onClick={() => setVolFull(!volFull)} 
                                label="Volume Slider"
                            />
                            <InteractiveSlider 
                                isActive={sfxFull} 
                                onClick={() => setSfxFull(!sfxFull)} 
                                label="SFX Slider"
                            />
                        </div>
                    </div>

                    {/* Gameplay Control Elements */}
                    <div className="settings-section settings-section--gameplay">
                        <img src={sectionGameplay} className="settings-section__frame-img" alt="" />
                        <div className="settings-section__inner">
                            <SectionHeading title="GAMEPLAY" />
                            
                            <div className="settings-toggle-row">
                                <div className="settings-toggle-left">
                                    <span className="settings-toggle-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                        </svg>
                                    </span>
                                    <span className="settings-toggle-label">Sound</span>
                                </div>
                                <Toggle on={sound} onToggle={() => setSound(v => !v)} />
                            </div>

                            <div className="settings-toggle-row">
                                <div className="settings-toggle-left">
                                    <span className="settings-toggle-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                                            <line x1="12" y1="18" x2="12.01" y2="18"></line>
                                        </svg>
                                    </span>
                                    <span className="settings-toggle-label">Vibration</span>
                                </div>
                                <Toggle on={vibrate} onToggle={() => setVibrate(v => !v)} />
                            </div>

                            <div className="settings-toggle-row">
                                <div className="settings-toggle-left">
                                    <span className="settings-toggle-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                        </svg>
                                    </span>
                                    <span className="settings-toggle-label">Notifications</span>
                                </div>
                                <Toggle on={notif} onToggle={() => setNotif(v => !v)} />
                            </div>
                        </div>
                    </div>

                    {/* Graphics Resolution Selector */}
                    <div className="settings-section settings-section--graphics">
                        <img src={sectionGraphics} className="settings-section__frame-img" alt="" />
                        <div className="settings-section__inner">
                            <SectionHeading title="GRAPHICS QUALITY" />
                            <div className="settings-quality-btns">
                                {QUALITY_LEVELS.map(level => {
                                    const isActive = quality === level;
                                    return (
                                        <button
                                            key={level}
                                            className={`settings-quality-btn${isActive ? ' settings-quality-btn--active' : ''}`}
                                            onClick={() => setQuality(level)}
                                        >
                                            <img src={isActive ? btnGoldImg : btnBlueImg} className="settings-quality-btn__bg" alt="" />
                                            <span className="settings-quality-btn__label">{level}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Support Panel links */}
                    <div className="settings-section settings-section--others">
                        <img src={sectionOthers} className="settings-section__frame-img" alt="" />
                        <div className="settings-section__inner">
                            <SectionHeading title="OTHERS" />
                            
                            <button className="settings-others-btn settings-others-btn--reset">
                                <img src={btnResetBgImg} className="settings-others-btn__bg" alt="" />
                                <div className="settings-others-btn-content">
                                    <span className="settings-others-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="#ff4a4a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
                                        </svg>
                                    </span>
                                    <span className="settings-others-btn__label">Reset Progress</span>
                                </div>
                                <span className="settings-others-arrow">&gt;</span>
                            </button>

                            <button className="settings-others-btn settings-others-btn--help">
                                <img src={btnHelpBgImg} className="settings-others-btn__bg" alt="" />
                                <div className="settings-others-btn-content">
                                    <span className="settings-others-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                        </svg>
                                    </span>
                                    <span className="settings-others-btn__label">Help &amp; Support</span>
                                </div>
                                <span className="settings-others-arrow">&gt;</span>
                            </button>
                        </div>
                    </div>

                </div>

                {/* Footer Controls */}
                <div className="settings-actions">
                    <button className="settings-action-btn settings-action-btn--cancel" onClick={() => navigate(-1)}>
                        <img src={cancelBgImg} className="settings-action-btn__bg" alt="" />
                        <span className="settings-action-btn__label">CANCEL</span>
                    </button>

                    <div className="settings-emblem">
                        <img src={emblemImg} alt="" />
                    </div>

                    <button className="settings-action-btn settings-action-btn--save" onClick={() => navigate(-1)}>
                        <img src={saveBgImg} className="settings-action-btn__bg" alt="" />
                        <span className="settings-action-btn__label">SAVE CHANGES</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;