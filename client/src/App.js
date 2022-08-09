import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  const location = useLocation();
  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path="/Home" element={<Home/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
      </Routes>
    </>
  );
}

export default App;
