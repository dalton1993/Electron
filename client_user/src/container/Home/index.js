import React from 'react';
import Header from "../../components/Header/index.js";
import MenuHeader from '../../components/MenuHeader/index.js';
import CarouselMain from '../../components/Slider/index.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css';
import Carousel from 'react-bootstrap/Carousel';
import CardTemplate from '../../components/Cards';
import SecondLvl from '../Home-sections/SecondLvl';
import ThirdLvl from '../Home-sections/ThirdLvl';
import FourthLvl from '../Home-sections/FourthLvl';
import FifthLvl from '../Home-sections/Fifthlvl';

export default function Home (props) {
    return (     
        <>
            <Header/>
            <MenuHeader/>
              
            <Container className='home' fluid>
                <CarouselMain/>
                <SecondLvl/>
                <ThirdLvl/>
                <FourthLvl/>
                <FifthLvl/>
            </Container>
        </>
    )
}
