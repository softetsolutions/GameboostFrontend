import Homepage from "./homepage/Homepage";
import { Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Signup from './components/Signup';
import Setting from './components/Settings/Setting';
import Account from "./components/Settings/Account";
import Privacy from "./components/Settings/Privacy";
import Verification from "./components/Settings/Verification";
import LanguageSelector from "./components/headerContent/LanguageSelector";

 function App() {
   return (
  
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/setting" element={<Setting/>}/>
      <Route path="/account" element={<Account/>}/>
      <Route path="/privacy" element={<Privacy/>}/>
      <Route path="/verification" element={<Verification/>}/>
      <Route path="/language" element={<LanguageSelector onClose={function (): void {
        throw new Error("Function not implemented.");
      } }/>}/>
    </Routes>
   );
 }

 export default App;