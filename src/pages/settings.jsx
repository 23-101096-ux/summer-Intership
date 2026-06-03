import React, { useState, useRef, useEffect } from 'react';
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
import thumbImg        from '../assets/slider-thumb.svg';
import btnGoldImg      from '../assets/btn-gold.png';
import btnBlueImg      from '../assets/btn-blue.png';
import toggleOnImg     from '../assets/toggle-on.png';
import toggleOffImg    from '../assets/toggle-off.png';
import cancelBgImg     from '../assets/btn-cancel.png';
import saveBgImg       from '../assets/btn-save.png';

// Import slider background assets
import sliderHalfBg    from '../assets/slider-half.png'; // 50% filled texture
import sliderFullBg    from '../assets/slider-full.png'; // 100% filled texture

const QUALITY_LEVELS  = ['LOW', 'MEDIUM', 'HIGH'];

const AssetSwappingSlider = ({ value, onChange }) => {
    const trackRef = useRef(null);
    const dragging = useRef(false);

    const clamp = v => Math.min(100, Math.max(0, v));

    const posFromEvent = e => {
        if (!trackRef.current) return 0;
        const rect    = trackRef.current.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        return clamp(((clientX - rect.left) / rect.width) * 100);
    };

    const onDown = e => {
        dragging.current = true;
        onChange(posFromEvent(e));
        e.preventDefault();
    };

    useEffect(() => {
        const onMove = e => { if (dragging.current) onChange(posFromEvent(e)); };
        const onUp   = ()  => { dragging.current = false; };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup',   onUp);
        window.addEventListener('touchmove', onMove, { passive: false });
        window.addEventListener('touchend',  onUp);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup',   onUp);
            window.removeEventListener('touchmove', onMove);
            window.removeEventListener('touchend',  onUp);
        };
    }, [onChange]);

    // Choose asset image background dynamically based on slider state percentage
    const currentTrackAsset = value > 50 ? sliderFullBg : sliderHalfBg;

    return (
        <div className="settings-slider-row">
            <div 
                className="settings-slider-track-wrapper" 
                ref={trackRef} 
                onMouseDown={onDown} 
                onTouchStart={onDown}
            >
                {/* Dynamically swapped track vector slice image */}
                <img src={currentTrackAsset} className="settings-slider-bg-asset" alt="" draggable={false} />
                
                {/* Knob Position */}
                <div className="settings-slider-thumb" style={{ left: `${value}%` }}>
                    <img src={thumbImg} alt="" draggable={false} />
                </div>
            </div>
        </div>
    );
};

const Toggle = ({ on, onToggle }) => (
    <button className="settings-toggle-btn" onClick={onToggle} aria-pressed={on}>
        <img src={on ? toggleOnImg : toggleOffImg} alt="" />
    </button>
);

const SectionHeading = ({ title }) => (
    <div className="settings-section__heading">
        <div className="settings-section__heading-line" />
        <span className="settings-section__heading-dot" />
        <span className="settings-section__title">{title}</span>
        <span className="settings-section__heading-dot" />
        <div className="settings-section__heading-line settings-section__heading-line--right" />
    </div>
);

const Settings = () => {
    const navigate = useNavigate();

    const [slider1, setSlider1] = useState(50);
    const [slider2, setSlider2] = useState(100);
    const [quality, setQuality] = useState('HIGH');
    const [sound,   setSound]   = useState(false);
    const [vibrate, setVibrate] = useState(true);
    const [notif,   setNotif]   = useState(true);

    return (
        <div className="settings-wrapper">
            <img src={bgImg} className="settings-wrapper__bg" alt="" />

            <div className="settings-frame">
                <img src={frameImg} className="settings-frame__bg" alt="" />

                {/* Header Title Ribbon */}
                <div className="settings-title-banner">
                    <img src={titleBannerImg} className="settings-title-banner__img" alt="" />
                    <span className="settings-title-banner__text">SETTINGS</span>
                </div>

                {/* 2x2 Clean Structural Grid Matrix Layout */}
                <div className="settings-content">

                    {/* Section 1: Sliders Row Layout */}
                    <div className="settings-section">
                        <img src={sectionSettings} className="settings-section__frame-img" alt="" />
                        <div className="settings-section__inner">
                            <SectionHeading title="SETTINGS" />
                            <AssetSwappingSlider value={slider1} onChange={setSlider1} />
                            <AssetSwappingSlider value={slider2} onChange={setSlider2} />
                        </div>
                    </div>

                    {/* Section 2: Toggles Grid Container */}
                    <div className="settings-section">
                        <img src={sectionGameplay} className="settings-section__frame-img" alt="" />
                        <div className="settings-section__inner">
                            <SectionHeading title="GAMEPLAY" />
                            <div className="settings-toggle-row">
                                <span className="settings-toggle-label">Sound</span>
                                <Toggle on={sound} onToggle={() => setSound(v => !v)} />
                            </div>
                            <div className="settings-toggle-row">
                                <span className="settings-toggle-label">Vibration</span>
                                <Toggle on={vibrate} onToggle={() => setVibrate(v => !v)} />
                            </div>
                            <div className="settings-toggle-row">
                                <span className="settings-toggle-label">Notifications</span>
                                <Toggle on={notif} onToggle={() => setNotif(v => !v)} />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Graphics Quality Selector */}
                    <div className="settings-section">
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

                    {/* Section 4: Secondary Action Panel Links */}
                    <div className="settings-section">
                        <img src={sectionOthers} className="settings-section__frame-img" alt="" />
                        <div className="settings-section__inner">
                            <SectionHeading title="OTHERS" />
                            <button className="settings-others-btn settings-others-btn--reset">
                                <span className="settings-others-btn__label">Reset Progress</span>
                            </button>
                            <button className="settings-others-btn settings-others-btn--help">
                                <span className="settings-others-btn__label">Help &amp; Support</span>
                            </button>
                        </div>
                    </div>

                </div>

                {/* Balanced Operations Center Footer Action Bar */}
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