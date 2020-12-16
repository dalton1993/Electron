import React from 'react'
import CardTemplate from '../../components/Cards';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css'

const ThirdLvl = (props) => {
    return (
        <div>
            <Row style = {{marginTop:"35px"}} className = 'justify-content-center'>
                <Col lg = {3} md={4} sm={11}>
                    <CardTemplate
                        src='https://images-na.ssl-images-amazon.com/images/I/81VWE3%2BuoOL._AC_SL1500_.jpg'
                        message='this is my message'
                        className = "third-lvl-card"
                    >
                    </CardTemplate>
                </Col>
                <Col lg = {3} md={4} sm={11}>
                    <CardTemplate
                        src='https://images-na.ssl-images-amazon.com/images/I/81IRVBSXjUL._AC_SL1500_.jpg'
                        message='this is my message'
                        className = "third-lvl-card"
                    >
                    </CardTemplate>
                </Col>
                <Col lg = {3} md={4} sm={11}>
                    <CardTemplate
                        src='https://images-na.ssl-images-amazon.com/images/I/81IRVBSXjUL._AC_SL1500_.jpg'
                        message='this is my message'
                        className = "third-lvl-card-2"
                    >
                    </CardTemplate>
                </Col>
            </Row>
        </div>
    )
}


export default ThirdLvl