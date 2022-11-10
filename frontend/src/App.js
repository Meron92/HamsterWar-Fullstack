import "./App.css";

import { BrowserRouter as Router, Routes, Route, BrowserRouter,} from "react-router-dom";
import StartPage from "./Components/StartPage";
import Gallery from "./Components/Gallery";
import Battle from "./Components/Battle";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/battle" element={<Battle />} />
      </Routes>
    </Router>
  );
}

export default App;
