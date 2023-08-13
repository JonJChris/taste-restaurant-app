import Login from './components/Login';
import HomeLayout from './components/HomeLayout';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AccountOrders from './components/AccountOrders'
import AccountOrderDetails from './components/AccountOrderDetails'
import AccountAddress from './components/AccountAddress'
import Feedback from './components/AccountFeedback'
import CartLayout from './components/CartLayout'
import AccountHome from './components/AccountHome'
import AccountLayout from './components/AccountLayout'
import MenuLayout from './components/MenuLayout';
import CartSelectAddress from './components/CartISelectAddress';
import CarteviewAndPayment from './components/CartIReviewAndPayment';
import CartListItems from './components/CartIListItems';
import ErrorPage from './components/ErrorPage'

function App() {
  const currentUser = useSelector((state) => state.userData.currentUser)

  return (
    
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}  >
                <Route index element={<MenuLayout />} />
                <Route path="account" element={<AccountLayout />} >
                      <Route index element={<AccountHome />} />
                      <Route path="orders" element={<AccountOrders />} />
                      <Route path="orderDetails/:orderId" element={<AccountOrderDetails />} />
                      <Route path="address" element={<AccountAddress />} />
                      <Route path="feedback" element={<Feedback />} />
                </Route>
                <Route path="cart" element={<CartLayout />} >
                  <Route index element={<CartListItems />} />
                  <Route path="cartselectaddress" element={<CartSelectAddress />} />
                  <Route path="cartrevieandpayment" element={<CarteviewAndPayment />} />
                </Route>
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      
      </BrowserRouter>
        
        {/*currentUser ? <HomeLayout /> : <Login /> */}
      </header>
    </div>
  );
}

export default App;

