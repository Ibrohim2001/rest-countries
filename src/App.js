import { useState, } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Details from './routes/Details'
import Header from './components/Header';



function App() {
  const [theme, setTheme] = useState(false);


  return (
    <div className="app">
      <div className={theme ? "container dark" : "container"}>
        <Router>
          <Header theme={theme} setTheme={setTheme}/>
          <Routes>
            <Route path='/' element={<Home theme={theme}/>}/>
            <Route path='/country/:id' element={<Details/>}/>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
