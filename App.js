import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './Form';
import Success from './Success';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;