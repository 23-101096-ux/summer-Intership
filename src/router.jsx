import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Splash from "./pages/splash";
import Menu from "./pages/menu";
import Levels from "./pages/levels";
import Level1Concept from "./pages/level1concept";
import Level2Concept from "./pages/level2concept";
import Settings from "./pages/settings";
import GameBoard1 from "./pages/Gameboard1";
import WinPage from "./pages/winpage";
import Levels2 from "./pages/levels2";
import GameBoard2 from "./pages/Gameboard2";

const SplashWrapper = () => {
    const navigate = useNavigate();


    return <Splash onComplete={() => navigate("/menu")} />;
};

const Routess = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<SplashWrapper />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/levels" element={<Levels />} />
                <Route path="/level1concept" element={<Level1Concept />} />  
                <Route path="/level2concept" element={<Level2Concept />} />     
                <Route path="/settings" element={< Settings />} />
                <Route path="/Gameboard1" element={< GameBoard1 />} /> 
                <Route path="/winpage" element={< WinPage />} />  
                <Route path="/levels2" element={< Levels2 />} />
                <Route path="/Gameboard2" element={< GameBoard2 />} />           
                
            </Routes>
        </BrowserRouter>
    );
}

export default Routess;
