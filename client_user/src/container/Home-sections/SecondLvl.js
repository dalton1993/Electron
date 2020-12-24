import React from 'react'
import { Link } from 'react-router-dom'; 
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
                <Link to = "/product/5fe3aa29b4057a6d1894f1e7">
                <CardTemplate
                    src='https://res.cloudinary.com/dgccfh9zu/image/upload/v1608755341/Images/j5kiapztwgcm2kncbyyk.jpg'
                    message='Iphone Red'
                    className = 'second-lvl-img'
                >
                </CardTemplate>
                </Link>
            </Col>
            <Col lg={2} md={6} sm={6} xs = {12}>
                <Link to = "/product/5fe3a8b3b4057a6d1894f1e4">
                <CardTemplate
                    src='https://res.cloudinary.com/dgccfh9zu/image/upload/v1608755378/Images/gavxaitfsx0slrwhxomd.jpg'
                    message='Iphone 9'
                    className = 'second-lvl-img'
                >
                </CardTemplate>
                </Link>
            </Col>
            <Col lg={2} md={6} sm={6} xs = {12}>
                <Link to = "/product/5fe3a605b4057a6d1894f1db">
                <CardTemplate
                    src='https://res.cloudinary.com/dgccfh9zu/image/upload/v1608754820/Images/yllyyqm5rqhxwiok32ny.jpg'
                    message='Iphone 7'
                    className = 'second-lvl-img'
                >
                </CardTemplate>
                </Link>
            </Col>
            <Col lg={2} md={6} sm={6} xs = {12}>
                <Link to = '/product/5fe3a685b4057a6d1894f1de'>
                <CardTemplate
                    src='https://res.cloudinary.com/dgccfh9zu/image/upload/v1608754821/Images/hofnrj9l0iiz51y3vrey.jpg'
                    message='Iphone X'
                    className = 'second-lvl-img'
                >
                </CardTemplate>
                </Link>
            </Col>
        </Row>
        </>
    )
}


export default SecondLvl;