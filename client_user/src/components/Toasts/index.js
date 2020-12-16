import React, {useState } from 'react';
import Toast from 'react-bootstrap/Toast';

export default function ToastTemplate(props) {

    const [show, setShow] = useState(false);

    return (
        <Toast {...props}>
            <Toast.Body>{ props.children }</Toast.Body>
        </Toast>
    )
}
