import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css'
import Carousel4 from '../../components/Slider/slider4.js';
import CardTemplate from '../../components/Cards';



const FourthLvl = (props) => {
    return (
        <>
        <Row style={{marginTop:"35px"}} className = 'justify-content-center'>
            <Col lg = {8}>
                <Carousel4/>
            </Col>
        </Row>

        <Row style={{marginTop:"35px"}}>
            <Col lg = {12}>
                <h1 className="text-center">Best Deals on Iphone</h1>
            </Col>
        </Row>
        
        <Row style={{marginTop:"35px"}} className = 'justify-content-center align-content-center'>
            <Col className='fifth-lvl' lg = {8}>
                <Carousel>
                    <Carousel.Item interval = {null}>
                        <Row>
                            <Col>
                                <CardTemplate className = 'cara-img' src = "https://cdn.pixabay.com/photo/2016/12/01/18/17/mobile-phone-1875813_960_720.jpg">
                                    <p>This is my first Item</p>
                                </CardTemplate>
                            </Col>
                            

                            <Col>
                                <CardTemplate className = 'cara-img' src = "https://cdn.pixabay.com/photo/2016/12/01/18/17/mobile-phone-1875813_960_720.jpg">
                                    <p>This is my first Item</p>
                                </CardTemplate>
                            </Col>
                            

                            <Col>
                                <CardTemplate className = 'cara-img' src = "https://cdn.pixabay.com/photo/2016/12/01/18/17/mobile-phone-1875813_960_720.jpg">
                                    <p>This is my first Item</p>
                                </CardTemplate>
                            </Col>

                            <Col>
                                <CardTemplate className = 'cara-img' src = "https://cdn.pixabay.com/photo/2016/12/01/18/17/mobile-phone-1875813_960_720.jpg">
                                    <p>This is my first Item</p>
                                </CardTemplate>
                            </Col>
                        </Row>

                    </Carousel.Item>

                    <Carousel.Item interval = {null}>
                        <Row>
                            <Col>
                                <CardTemplate className = 'cara-img' src = "https://images-na.ssl-images-amazon.com/images/I/714qhD8UcUL._AC_SL1500_.jpg">
                                    <p>This is my first Item</p>
                                </CardTemplate>
                            </Col>
                            

                            <Col>
                                <CardTemplate className = 'cara-img' src = "https://images-na.ssl-images-amazon.com/images/I/714qhD8UcUL._AC_SL1500_.jpg">
                                    <p>This is my first Item</p>
                                </CardTemplate>
                            </Col>

                            <Col>
                                <CardTemplate className = 'cara-img' src = "https://images-na.ssl-images-amazon.com/images/I/714qhD8UcUL._AC_SL1500_.jpg">
                                    <p>This is my first Item</p>
                                </CardTemplate>
                            </Col>

                            <Col>
                                <CardTemplate className = 'cara-img' src = "https://images-na.ssl-images-amazon.com/images/I/714qhD8UcUL._AC_SL1500_.jpg">
                                    <p>This is my first Item</p>
                                </CardTemplate>
                            </Col>
                        </Row>
                    </Carousel.Item>

                </Carousel>
            </Col>
        </Row>
    </>
    )
}

export default FourthLvl;
