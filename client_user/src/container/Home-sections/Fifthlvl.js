import React from 'react'
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css'
import CardTemplate from '../../components/Cards';
import Card from 'react-bootstrap/esm/Card';

const FifthLvl = () => {
    return (
        <>
            <Row style = {{marginTop:'35px'}} className = 'justify-content-center'>
                    <Col lg = {9} sm = {12}>
                        <Link to = '/product/5fe3d2ebb4057a6d1894f231'>
                        <CardTemplate
                            src = 'https://blog.playstation.com/tachyon/2020/06/PS5-tunein-nodate.jpg?resize=1088,612&crop_strategy=smart&zoom=1'
                            className= 'fifth-lvl-img'
                        >
                        </CardTemplate>
                        </Link>
                    </Col>
            </Row>
        </>
    )
}

export default FifthLvl;
