import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function ModalTemplate(props) {
    
    return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        { props.header }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { props.children }
                </Modal.Body>
                
            </Modal>
    )
}
