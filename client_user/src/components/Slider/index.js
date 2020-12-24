import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./style.css";

const CarouselMain = (props) => {
    return (
        <Row className = 'justify-content-center'>
            <Col lg= {12} sm = {12}>
                <Carousel>
                    
                    <Carousel.Item interval={2000}>
                        <Link to = "/category/5fe3a269b4057a6d1894f1c9">
                        <img
                        className = 'main-slider-image'
                        src = 'https://www.calibercreative.com/wordpress/wp-content/uploads/1-14.jpg'
                        alt = '/'
                        />
                        <Carousel.Caption>
                            <h1>New Glorious PC gaming mice!</h1>
                        </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                

                    <Carousel.Item interval={2000}>
                        <Link to = "/category/5fe3a25eb4057a6d1894f1c8">
                        <img
                        className = 'main-slider-image'
                        src = 'https://images.anandtech.com/doci/12769/logitech_g305-678_678x452.jpg'
                        alt = '/'
                        />
                        <Carousel.Caption>
                           <h1>Browse all Logitech mice</h1>
                        </Carousel.Caption>
                        </Link>
                    </Carousel.Item>

                    <Carousel.Item interval={2000}>
                        <Link to = 'category/5fe3d4afb4057a6d1894f233'>
                        <img
                        className = 'main-slider-image'
                        src = 'https://www.myztro.net/myztro_content/uploads/2018/03/zowiesite-1024x576.jpg'
                        alt = '/'
                        />
                        <Carousel.Caption>
                            <h1>Great Deals on Zowie Mice!</h1>
                        </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                </Carousel>
            </Col>
        </Row>
    )
}

export default CarouselMain