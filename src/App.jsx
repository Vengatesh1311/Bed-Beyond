import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import About from './About';
import Hotels from './Hotels';
import Login from './Login';
import Register from './Register';
import UserPanel from './UserPanel';
import HotelDetails from './HotelDetails';
import ShowBookDetails from './ShowBookDetails';
import ForgetPassword from './ForgetPassword';
import { useEffect, useState } from 'react';

function App() {

  const [users, setUsers] = useState(null);

  const [loginedUser, setLoginedUser] = useState(null);

  const [bool1, setBool1] = useState(false);

  const [hotels, setHotels] = useState(null);

  const [index, setIndex] = useState(null);

  useEffect(()=>{
    fetch('https://67dd5f90e00db03c406b5552.mockapi.io/details/users', {
      method: 'GET',
      headers: {'content-type':'application/json'},
    }).then(res => {
      if (res.ok) {
          return res.json();
      }
    }).then(tasks => {
      setUsers(tasks);
    }).catch(error => {
      console.log(error)
    })
  },[bool1]);

  useEffect(() => {
    const savedUser = localStorage.getItem("loginedUser");
    const currentIndex = localStorage.getItem("index");
    if (savedUser) 
    {
      setLoginedUser(JSON.parse(savedUser));
    }
    if(currentIndex)
    {
      setIndex(JSON.parse(currentIndex));
    }
  },[]);

  useEffect(()=>{
      fetch('https://67dd4c32e00db03c406b05c3.mockapi.io/details/hotels', {
          method: 'GET',
          headers: {'content-type':'application/json'},
      }).then(res => {
          if (res.ok) {
              return res.json();
          }
      }).then(tasks => {
          setHotels(tasks);
      }).catch(error => {
          console.log(error)
      })
  },[]);

  return (
    <>
      <BrowserRouter>
        <NavBar loginedUser={loginedUser}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/hotels' element={<Hotels hotels={hotels} setIndex={setIndex} loginedUser={loginedUser}/>}/>
          <Route path='/login' element={<Login users={users} setLoginedUser={setLoginedUser} loginedUser={loginedUser}/>}/>
          <Route path='/userpanel' element={<UserPanel users={users} loginedUser={loginedUser} setLoginedUser={setLoginedUser} bool1={bool1} setBool1={setBool1}/>}/>
          <Route path='/register' element={<Register users={users}/>}/>
          <Route path='/hotelDetails' element={<HotelDetails hotels={hotels} index={index} loginedUser={loginedUser} setLoginedUser={setLoginedUser}  bool1={bool1} setBool1={setBool1}/>}/>
          <Route path='/reservationDetail' element={<ShowBookDetails hotels={hotels} index={index} loginedUser={loginedUser}/>}/>
          <Route path='/forgetPassword' element={<ForgetPassword users={users} loginedUser={loginedUser}/>}/>
        </Routes>
      </BrowserRouter>
      <footer className='p-3 text-center'>
        <h6>Copyright © 2025 Bed & Beyond. All Rights Reserved</h6>
      </footer>
    </>
  )
}

export default App
