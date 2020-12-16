import React from 'react';
import Card from 'react-bootstrap/Card';
import './style.css'

const CardTemplate = (props) => {
    return (
        <div>
            <Card style = {{cursor:'pointer'}}>
                <Card.Img variant="top" src= { props.src } className = { props.className }/>
                    <Card.Body>
                        <Card.Text className="text-center">
                            { props.message }
                        </Card.Text>
                    </Card.Body>
            </Card>
        </div>
    )
}

export default CardTemplate
