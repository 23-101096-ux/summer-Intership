import React, { useState, useRef, useCallback } from 'react';
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

/* ── Interactive Slider ──────────────────────────────────── */
const InteractiveSlider = ({ value, onChange, bgSrc }) => {
    const trackRef = useRef(null);

    const getValueFromEvent = useCallback((e) => {
        const rect = trackRef.current.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
        return Math.round(ratio * 100);
    }, []);

    const handlePointerDown = useCallback((e) => {
        e.preventDefault();
        onChange(getValueFromEvent(e));

        const onMove = (ev) => onChange(getValueFromEvent(ev));
        const onUp   = () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup',   onUp);
            window.removeEventListener('touchmove', onMove);
            window.removeEventListener('touchend',  onUp);
        };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup',   onUp);
        window.addEventListener('touchmove', onMove, { passive: false });
        window.addEventListener('touchend',  onUp);
    }, [onChange, getValueFromEvent]);

    // Calculate fill width and thumb position within the track padding
    const TRACK_PAD_L = 8;
    const TRACK_PAD_R = 18;
    const fillPct     = value / 100;

    return (
        <div className="settings-slider-row" ref={trackRef} onMouseDown={handlePointerDown} onTouchStart={handlePointerDown}>
            <img src={bgSrc} className="settings-slider-bg-asset" alt="Slider track" draggable={false} />

            {/* Filled portion */}
            <div
                className="settings-slider-fill"
                style={{
                    left:  `${TRACK_PAD_L}px`,
                    width: `calc(${fillPct * 100}% - ${TRACK_PAD_L + TRACK_PAD_R}px)`,
                }}
            />

            {/* Thumb — rendered as a glowing diamond circle */}
            <div
                className="settings-slider-thumb"
                style={{
                    left: `calc(${TRACK_PAD_L}px + ${fillPct} * (100% - ${TRACK_PAD_L + TRACK_PAD_R}px))`,
                }}
            >
                <svg width="22" height="22" viewBox="0 0 22 22">
                    <circle cx="11" cy="11" r="10" fill="#0a2a30" stroke="#00e5ff" strokeWidth="1.5"/>
                    <polygon points="11,5 16,11 11,17 6,11" fill="#00e5ff" opacity="0.9"/>
                    <polygon points="11,5 16,11 11,17 6,11" fill="none" stroke="#fff" strokeWidth="0.5"/>
                </svg>
            </div>
        </div>
    );
};

/* ── Toggle ──────────────────────────────────────────────── */
const Toggle = ({ on, onToggle }) => (
    <button className="settings-toggle-btn" onClick={onToggle} aria-pressed={on}>
        <img src={on ? toggleOnImg : toggleOffImg} alt={on ? 'On' : 'Off'} />
    </button>
);

/* ── Section Heading ─────────────────────────────────────── */
const SectionHeading = ({ title }) => (
    <div className="settings-section__heading">
        <span className="settings-section__title">{title}</span>
    </div>
);

/* ── Main Component ──────────────────────────────────────── */
const Settings = () => {
    const navigate = useNavigate();

    const [quality,  setQuality]  = useState('HIGH');
    const [sound,    setSound]    = useState(false);
    const [vibrate,  setVibrate]  = useState(true);
    const [notif,    setNotif]    = useState(true);
    const [volSlider, setVolSlider] = useState(80);   
    const [sfxSlider, setSfxSlider] = useState(45);   

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


                    <div className="settings-section settings-section--sliders">
                        <img src={sectionSettings} className="settings-section__frame-img" alt="" />
                        <div className="settings-section__inner">
                            <SectionHeading title="SETTINGS" />
                            <InteractiveSlider
                                value={volSlider}
                                onChange={setVolSlider}
                                bgSrc={sliderFullBg}
                            />
                            <InteractiveSlider
                                value={sfxSlider}
                                onChange={setSfxSlider}
                                bgSrc={sliderHalfBg}
                            />
                        </div>
                    </div>


                    <div className="settings-section settings-section--gameplay">
                        <img src={sectionGameplay} className="settings-section__frame-img" alt="" />
                        <div className="settings-section__inner">
                            <SectionHeading title="GAMEPLAY" />
                            <div className="settings-toggle-row">
                                <span className="settings-toggle-label">Sound</span>
                                <Toggle on={sound}   onToggle={() => setSound(v => !v)} />
                            </div>
                            <div className="settings-toggle-row">
                                <span className="settings-toggle-label">Vibration</span>
                                <Toggle on={vibrate} onToggle={() => setVibrate(v => !v)} />
                            </div>
                            <div className="settings-toggle-row">
                                <span className="settings-toggle-label">Notifications</span>
                                <Toggle on={notif}   onToggle={() => setNotif(v => !v)} />
                            </div>
                        </div>
                    </div>


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


                    <div className="settings-section settings-section--others">
                        <img src={sectionOthers} className="settings-section__frame-img" alt="" />
                        <div className="settings-section__inner">
                            <SectionHeading title="OTHERS" />
                            <button className="settings-others-btn settings-others-btn--reset">
                                <img src={btnResetBgImg} className="settings-others-btn__bg" alt="" />
                                <span className="settings-others-btn__label">Reset Progress</span>
                            </button>
                            <button className="settings-others-btn settings-others-btn--help">
                                <img src={btnHelpBgImg} className="settings-others-btn__bg" alt="" />
                                <span className="settings-others-btn__label">Help &amp; Support</span>
                            </button>
                        </div>
                    </div>

                </div>

 
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