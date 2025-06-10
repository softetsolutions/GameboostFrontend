import Homepage from "./homepage/Homepage";
import { Routes, Route} from 'react-router-dom';


import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
       
    </Routes>
  );
}

export default App;
