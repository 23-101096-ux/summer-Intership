import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Splash from "./pages/splash";
import Menu from "./pages/menu";
import Levels from "./pages/levels";


const SplashWrapper = () => {
    const navigate = useNavigate();


    return <Splash onComplete={() => navigate("/menu")} />;
};

const Routess = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 3. Use the new wrapper name here */}
                <Route path="/" element={<SplashWrapper />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/levels" element={<Levels />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routess;
