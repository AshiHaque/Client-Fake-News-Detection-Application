import './App.css';
import React, {useState,useEffect} from 'react'
import Navbar from './Components/Navbar'
import HomePage from './Pages/HomePage'
import Footer from './Components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {



  

  return (
    <div className="App">
      <Navbar></Navbar>
      <HomePage></HomePage>
      <Footer></Footer>
    </div>
  );
}

export default App;
