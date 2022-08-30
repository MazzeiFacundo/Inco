import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import LandingPage from './components/LandingPage/LandingPage';
import CardDetail from './components/CardDetail/CardDetail';
import Register from './components/Register/Register';
import ListProduct from './components/ListProduct/ListProduct';
import Modal from './components/EditProfileModal/EditProfileModal'
import EditProfileModal from './components/EditProfileModal/EditProfileModal';

function App() {
  const location = useLocation();
  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Home/:id" element={<CardDetail/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/listProduct" element={<ListProduct/>}/>
        <Route exact path="/modal" element={<EditProfileModal/>}/>
      </Routes>
    </>
  );
}

export default App;
