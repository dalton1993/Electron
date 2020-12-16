import React from 'react';
import Form from 'react-bootstrap/Form';

const Input = (props) => {
    return (
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>{ props.label }</Form.Label>
                <Form.Control type = { props.type } placeholder = { props.placeholder } onChange = {props.onChange}/>
                <Form.Text className="text-muted">
                { props.children }
                </Form.Text>
            </Form.Group>
        </Form>
    )
}

export default Input
