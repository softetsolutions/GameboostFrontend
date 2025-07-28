<<<<<<< HEAD
import Homepage from "./homepage/Homepage";
import { Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Signup from './components/Signup';
import Setting from './components/Settings/Setting';
=======
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Setting from "./components/Settings/Setting";
>>>>>>> master
import Account from "./components/Settings/Account";
import Privacy from "./components/Settings/Privacy";
import Verification from "./components/Settings/Verification";
import LanguageSelector from "./components/headerContent/LanguageSelector";
<<<<<<< HEAD
=======
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import CreateProduct from "./components/admin/CreateProduct/CreateProduct";
import CreateService from "./components/admin/CreateService";
import CreateOffer from "./components/CreateOffer";
import ProtectedRoute from "./components/ProtectedRoute";
import Homepage from "./homepage/Homepage";
import RenderOfferOrOfferForm from "./components/RenderOfferOrOfferForm";
import ProductPageComp from "./components/ProductPageComp";
import BuyCardComp from "./components/orderContent/BuyCardComp";
>>>>>>> master
import Order from "./components/Orders/Order";
import Chat from "./components/Chat/Chat";
import Adminchat from "./components/Chat/Adminchat";
import Group from "./components/Chat/Group";
import DM from "./components/Chat/DM";
<<<<<<< HEAD


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
      <Route path="/orders" element={<Order/>}/>
      <Route  path="/adminchat" element={<Adminchat />}/>
      <Route path="/chat" element={<Chat/>}/>
      
      <Route path="/groupchat" element={<Group />}/>
      <Route path="/DMs" element={<DM/>}/>

    </Routes>
    
   );
 }

 export default App;
=======
import Sellerhomepage from "./components/Becomeseller/Sellerhomepage";
import SellerRegister from "./components/Becomeseller/SellerRegister";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/account" element={<Account />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="/product" element={<ProductPageComp />} />

      <Route
        path="/language"
        element={
          <LanguageSelector
            onClose={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        }
      />

      {/* Admin Routes*/}
      <Route
        path="/admin"
        element={
          <ProtectedRoute routeName="dashboard">
            <Sidebar />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route
          path="createProduct"
          element={
            <ProtectedRoute routeName="createProduct">
              <CreateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="createServices"
          element={
            <ProtectedRoute routeName="createServices">
              <CreateService />
            </ProtectedRoute>
          }
        />
        <Route
          path="offers"
          element={
            <ProtectedRoute routeName="manageOffers">
              <RenderOfferOrOfferForm />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Seller Routes*/}
      <Route
        path="/seller"
        element={
          <ProtectedRoute routeName="dashboard">
            <Sidebar />
          </ProtectedRoute>
        }
      >
        <Route
          path="createOffer"
          element={
            <ProtectedRoute routeName="createOffer">
              <CreateOffer />
            </ProtectedRoute>
          }
        />
        <Route
          path="offers"
          element={
            <ProtectedRoute routeName="manageOffers">
              <RenderOfferOrOfferForm />
            </ProtectedRoute>
          }
        />
      
      </Route>

      {/* User Routes */}
      <Route
        path="/user"
        element={
          <ProtectedRoute routeName="home">
            <Sidebar />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route
          path="orders"
          element={
            <ProtectedRoute routeName="orders">
              <div>Orders Component</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute routeName="profile">
              <div>Profile Component</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="support"
          element={
            <ProtectedRoute routeName="support">
              <div>Support Component</div>
            </ProtectedRoute>
          }
        
        />
          
          <Route index element={<Dashboard />} />
      </Route>

      <Route path="/buy/:offerId" element={<BuyCardComp />} />
      <Route path="/orders" element={<Order />} />
      <Route path="/adminchat" element={<Adminchat />} />
      <Route path="/chat" element={<Chat />} />

      <Route path="/groupchat" element={<Group />} />
      <Route path="/DMs" element={<DM />} />
      <Route
        path="/sellerhomepage"
        element={
        
            <Sellerhomepage />
      
        }
      />
      <Route
        path="/sellerRegister"
        element={
    
            <SellerRegister />
    
        }
      />
      
    </Routes>
  );
}

export default App;
>>>>>>> master
