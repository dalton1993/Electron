import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./style.css";

const Carousel4 = (props) => {
    return (
        <Row className = 'justify-content-center'>
            <Col lg= {12} sm = {12}>
                <Carousel>
                    <Carousel.Item interval={2000}>
                        <img
                        className = 'main-slider-image-4'
                        src = 'https://cdn.pixabay.com/photo/2017/01/14/15/11/relaxing-1979674_960_720.jpg'
                        alt = '/'
                        />
                        <Carousel.Caption>
                            <h1>This is my caption</h1>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item interval={2000}>
                        <img
                        className = 'main-slider-image-4'
                        src = 'https://cdn.pixabay.com/photo/2016/12/01/18/17/mobile-phone-1875813_960_720.jpg'
                        alt = '/'
                        />
                        <Carousel.Caption>
                            {props.children}
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item interval={2000}>
                        <img
                        className = 'main-slider-image-4'
                        src = 'https://cdn.pixabay.com/photo/2015/02/02/11/08/office-620817_960_720.jpg'
                        alt = '/'
                        />
                        <Carousel.Caption>
                            {props.children}
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Col>
        </Row>
    )
}

export default Carousel4