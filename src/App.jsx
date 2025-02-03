import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Page Components
import Home from './pages/home/Home';
import About from './pages/about/About';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Profile from './pages/profile/Profile';
import Transaction from './Components/Transaction/Transaction'
import IncomeSplit from './Components/IncomeSplit/IncomeSplit'
import Contact from './pages/contact/Contact';
import TransactionSearch from './Components/TransactionSearch/TransactionSearch';

// Layout Components
import NavHeader from './Components/navHeader/NavHeader';
import Footer from './Components/footer/Footer';

// Context
import { AuthProvider } from './context/AuthContext';
import CreateBudget from './Components/CreateBudget/CreateBudget';



function App() {
  return (
    <AuthProvider>
      <Router>
        <NavHeader></NavHeader>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/transaction/add' element={<Transaction />}/>
          <Route path='/incomeSplit' element={<IncomeSplit />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/transaction/budget/:budget_id' element={<TransactionSearch/>}/>
          <Route path='/budget/add' element={<CreateBudget />}/>
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
