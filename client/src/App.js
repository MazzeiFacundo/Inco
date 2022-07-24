import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Home from './components/Home/Home';
import Counter from './features/counter/Counter';

function App() {
  const location = useLocation();
  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/secretCounter" element={<Counter/>}/>
      </Routes>
    </>
  );
}

export default App;
