import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Splash from "./pages/splash";
import Menu from "./pages/menu";
import Levels from "./pages/levels";
import Level1Concept from "./pages/level1concept";


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
                
                                </Routes>
        </BrowserRouter>
    );
}

export default Routess;
