import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Intro from "./pages/Intro";
import MainPage from "./pages/MainPage";
import Cursor from "./components/Cursor";


function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Cursor />
      
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
