import React from 'react'
import { Container, Row, Col, Card, Button, ListGroup, ProgressBar, Image } from 'react-bootstrap';
import { FaCar } from 'react-icons/fa';
import NavBar from '../components/Navbar'
import Header from '../components/home/Header'
import WhyChooseUs from '../components/home/WhyChooseUs'
import OurService from '../components/home/OurService'
import GetStarted from '../components/home/GetStarted'
import Experience from '../components/home/Experience'
import Footer from '../components/home/Footer'




// this is the home page
// click nav bar home tab and load this page

export default function Home() {
  return (
    <div>
      <NavBar/>
      <Header/>
      <br />
            <WhyChooseUs />
            <br />

            <OurService />

            <br/>
            <GetStarted />


            <br/>
            <Experience/>

            
            <br/>
            <Footer/>
    </div>
  )
}
