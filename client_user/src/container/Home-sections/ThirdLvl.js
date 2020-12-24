import React from 'react'
import { Link } from 'react-router-dom'; 
import CardTemplate from '../../components/Cards';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css'

const ThirdLvl = (props) => {
    return (
        <div>
            <Row style = {{marginTop:"35px"}} className = 'justify-content-center'>
                <Col lg = {3} md={4} sm={11}>
                    <Link to = "/product/5fe3aa72b4057a6d1894f1ea">
                    <CardTemplate
                        src='https://res.cloudinary.com/dgccfh9zu/image/upload/v1608755998/Images/kyqjlg6bvttodht3xrnd.jpg'
                        message='Asus Gaming Desktop'
                        className = "third-lvl-card"
                    >
                    </CardTemplate>
                    </Link>
                </Col>
                <Col lg = {3} md={4} sm={11}>
                    <Link to = 'product/5fe3ab20b4057a6d1894f1ed'>
                    <CardTemplate
                        src='https://res.cloudinary.com/dgccfh9zu/image/upload/v1608755998/Images/kyqjlg6bvttodht3xrnd.jpg'
                        message='MSI Gaming Desktop'
                        className = "third-lvl-card"
                    >
                    </CardTemplate>
                    </Link>
                </Col>
                <Col lg = {3} md={4} sm={11}>
                    <Link to = '/product/5fe3ab86b4057a6d1894f1f3'>
                    <CardTemplate
                        src='https://res.cloudinary.com/dgccfh9zu/image/upload/v1608755826/Images/d8ibe1otvelj1mzfsxqw.jpg'
                        message='Dell Gaming Station'
                        className = "third-lvl-card-2"
                    >
                    </CardTemplate>
                    </Link>
                </Col>
            </Row>
        </div>
    )
}


export default ThirdLvl