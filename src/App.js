
import './App.css';
import Allroutes from './Components/AllRoutes';
import Navbar from './Components/Navbar';
import React from 'react';
import Footer from './Components/Footer';
import Testimonials from './Components/Testimonials';
import EmailContactForm from './Components/Mail';
import KommunicateChat from './Pages/Chat';

function App() {

  //clear local storage
  // localStorage.clear();

  return (
    <div className="App" >
      <Navbar/>
      <KommunicateChat/>
      <Allroutes/>
      
      {/* <EmailContactForm/> */}

      
      <Footer/>
     
      
    </div>
  )
}

export default App;
