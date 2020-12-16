import React from 'react'
import CardTemplate from '../../components/Cards';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css'

const SecondLvl = (props) => {
    return (
        <>
        <Row>
            <Col lg={12}>
                <h1 className="text-center">Top Deals</h1>
            </Col>
        </Row>
        <Row style = {{marginTop:"25px"}} className = 'justify-content-center'>
            <Col lg={2} md={6} sm={6} xs = {12} style={{height:"22rem"}}>
                <CardTemplate
                    src='https://images-na.ssl-images-amazon.com/images/I/714qhD8UcUL._AC_SL1500_.jpg'
                    message='this is my message'
                    className = 'second-lvl-img'
                >
                </CardTemplate>
            </Col>
            <Col lg={2} md={6} sm={6} xs = {12}>
                <CardTemplate
                    src='https://images-na.ssl-images-amazon.com/images/I/61RxFil8n5L._AC_SL1500_.jpg'
                    message='this is my message'
                    className = 'second-lvl-img'
                >
                </CardTemplate>
            </Col>
            <Col lg={2} md={6} sm={6} xs = {12}>
                <CardTemplate
                    src='https://images-na.ssl-images-amazon.com/images/I/714qhD8UcUL._AC_SL1500_.jpg'
                    message='this is my message'
                    className = 'second-lvl-img'
                >
                </CardTemplate>
            </Col>
            <Col lg={2} md={6} sm={6} xs = {12}>
                <CardTemplate
                    src='https://images-na.ssl-images-amazon.com/images/I/61RxFil8n5L._AC_SL1500_.jpg'
                    message='this is my message'
                    className = 'second-lvl-img'
                >
                </CardTemplate>
            </Col>
        </Row>
        </>
    )
}


export default SecondLvl;