import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css'
import Carousel4 from '../../components/Slider/slider4.js';
import CardTemplate from '../../components/Cards';



const FourthLvl = (props) => {
    return (
        <>
        <Row style = {{marginTop:'3rem'}}>
            <Col lg={12}>
                <h1 className="text-center">Gaming Gear</h1>
            </Col>
        </Row>
        <Row style = {{marginTop:"25px"}} className = 'justify-content-center'>
            <Col lg={2} md={6} sm={6} xs = {12} style={{height:"22rem"}}>
                <Link to = "/product/5fe3ac08b4057a6d1894f1f6">
                <CardTemplate
                    src='https://res.cloudinary.com/dgccfh9zu/image/upload/v1608696545/Images/cm4tona4zr7xkmvo9nfn.jpg'
                    message='Glorious Model 0'
                    className = 'second-lvl-img'
                >
                </CardTemplate>
                </Link>
            </Col>
            <Col lg={2} md={6} sm={6} xs = {12}>
                <Link to = "/product/5fe3b242b4057a6d1894f21c">
                <CardTemplate
                    src='https://res.cloudinary.com/dgccfh9zu/image/upload/v1608757824/Images/jwrnshtataots7m4dfqg.jpg'
                    message='Hyper X Cloud II'
                    className = 'second-lvl-img'
                >
                </CardTemplate>
                </Link>
            </Col>
            <Col lg={2} md={6} sm={6} xs = {12}>
                <Link to = "/product/5fe3ad2fb4057a6d1894f1fc">
                <CardTemplate
                    src='https://res.cloudinary.com/dgccfh9zu/image/upload/v1608756527/Images/w74eiobk1t56a7z5jire.jpg'
                    message='Steelseries qck'
                    className = 'second-lvl-img'
                >
                </CardTemplate>
                </Link>
            </Col>
            <Col lg={2} md={6} sm={6} xs = {12}>
                <Link to = '/product/5fe3a594b4057a6d1894f1d4'>
                <CardTemplate
                    src='https://res.cloudinary.com/dgccfh9zu/image/upload/v1608754579/Images/ny7t8ayp4byneal2dyzy.jpg'
                    message='Logitech G-703'
                    className = 'second-lvl-img'
                >
                </CardTemplate>
                </Link>
            </Col>
        </Row>
        </>
    )
}

export default FourthLvl;
