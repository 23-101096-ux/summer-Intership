import React from 'react';
import { useNavigate } from 'react-router-dom';

import bg          from '../assets/bg.png';
import logo        from '../assets/logo.svg';
import pharaonicL  from '../assets/left_charecter.png';
import pharaonicR  from '../assets/right charecter.png';
import btnCyan     from '../assets/green_button.png';
import btnRed      from '../assets/red_button.png';
import btnGold     from '../assets/yellow_button.png';

import './menu.css';

const Menu = () => {
    const navigate = useNavigate();

    return (
        <div className="menu">

            
            <img className="menu__bg" src={bg} alt="" />

            
            <div className="menu__overlay" />

       
            <img className="menu__logo" src={logo} alt="Neon Nephthys" />

           
            <div className="menu__buttons">
                <button className="menu__btn menu__btn--1" onClick={() => navigate('/levels')}>
                    <img src={btnCyan} alt="" />
                    <span>TREASURE VAULT</span>
                </button>

                <button className="menu__btn menu__btn--2" onClick={() => navigate('/settings')}>
                    <img src={btnRed} alt="" />
                    <span>SETTINGS</span>
                </button>

                <button className="menu__btn menu__btn--3" onClick={() => navigate('/quest')}>
                    <img src={btnGold} alt="" />
                    <span>START QUEST</span>
                </button>
            </div>

            {/* Characters */}
            <img className="menu__char menu__char--left"  src={pharaonicL} alt="" />
            <img className="menu__char menu__char--right" src={pharaonicR} alt="" />

        </div>
    );
};

export default Menu;