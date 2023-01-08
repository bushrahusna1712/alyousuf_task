import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css';

import Login from './pages/Login/Login';
import Home from './pages/Home/Home';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
