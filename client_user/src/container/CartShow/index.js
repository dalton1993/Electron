import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/index.js';
import MenuHeader from '../../components/MenuHeader/index.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import axios from '../../helpers/axios.js';
import { useDispatch } from 'react-redux';
import { cartConstants } from "../../actions/constants";
import getCart from '../../actions/cart_actions.js';
import { useSelector } from 'react-redux'; 
import CardTemplate from '../../components/Cards/index.js';
import { generatePublicURL } from '../../URLConfig'; 
import Carousel from 'react-bootstrap/Carousel';
import './style.css'; 
import ModalTemplate from '../../components/Modal/index.js';



export default function CartShowPage() {

    const [ cartItems, setCartItems ] = useState([]);
    const [ show, setShow ] = useState(false);
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const [ quantity, setQuantity ] = useState(null);
    const [ quantSubmit, setQuantSubmit ] = useState(false)
    const [ productid, setProductId ] = useState(null);

    useEffect( () => {
        dispatch(getCart())
    },[]);
    
    const generateCartTotal = (cartItems) => {
        let numArr = [];

        for(var i = 0; i < cartItems.length; i++){
           numArr.push(cartItems[i].product.price * cartItems[i].quantity)
        }

        const result = numArr.reduce((a, b) => a + b, 0);
        console.log(result)
        return(
            <div style = {{paddingLeft:'10px'}}>${result}</div>
        )
    }


    const updateQuantity = (name, itemquantity, id) => {
        axios.post('/user/cart/edit-cart',{
            cartItems: {
                product:id,
                quantity:parseInt(itemquantity),
            }
        }).then( res => {
            console.log(res);
            dispatch({
                type: cartConstants.CART_REQUEST_SUCCESS,
                payload: { productDetails: {name, id} }
            })
        })
        .catch( error => {
            console.log(error)
            dispatch({
                type: cartConstants.CART_REQUEST_FAILURE,
                payload: error
            })
        })
    }

    const deleteItem = (id) => {
        console.log(id); 
        axios.post('/user/cart/delete-item',{
            id
        }).then( res => {
            console.log(res);
            dispatch({
                type: cartConstants.CART_REQUEST_SUCCESS,
                payload: { productDetails: {id} }
            })
        })
        .catch( error => {
            console.log(error)
            dispatch({
                type: cartConstants.CART_REQUEST_FAILURE,
                payload: error
            })
        })
    }


    return (
        <>
        <Header/>
        <MenuHeader/>

        <Container>
                <Row style = {{marginTop:'10rem', marginBottom:'2rem'}} className = 'd-flex justify-content-center'>
                    <Col lg = {7}>
                        <h4 style = {{fontSize:'50px'}}>Cart Items</h4>
                    </Col>

                    <Col lg = {2}>
                        <p className = 'd-flex' style = {{fontSize:'30px'}}>Total: {generateCartTotal(cart.cartItems)}</p>
                        <Button variant = 'success' onClick = {()=>setShow(true)}>Order</Button>
                    </Col>

                </Row>
                <div style = {{marginBottom:'3rem'}}>
                { cart.cartItems ?
                    cart.cartItems.map( item => {
                        return(
                            <Row style = {{
                                marginTop:'15px', 
                                borderBottom:'1px solid rgb(200,200,200)',
                                borderTop:'1px solid rgb(200,200,200)',
                                padding: '20px'
                                }} 
                                className = 'd-flex justify-content-center align-items-center'>
                                <Col lg = {7} className = 'd-flex justify-content-lg-start justify-content-center'>
                                    
                                    <div>
                                        <div className = 'cart-picture-wrap d-flex justify-content-lg-start justify-content-center'>
                                        {item.product.productPictures.map(picture => {
                                            return(
                                                
                                                    <img src = {generatePublicURL(picture.img)}/>
                                                
                                            )
                                        })}
                                        </div>
                                    
                                        <div style = {{marginTop:'20px'}}>
                                            <h2 className = 'd-flex justify-content-lg-start justify-content-center'  style = {{margin:'0'}}>{item.product.name}</h2>
                                            <p className = 'd-flex justify-content-lg-start justify-content-center' style = {{marginBottom:'10px'}}>Unit price: ${item.product.price}</p>
                                            <p className = 'd-flex justify-content-lg-start justify-content-center' style = {{marginBottom:'10px'}}>{item.product.description}</p>
                                        </div>
                                    </div>
                                </Col>

                                <Col lg = {2} className = 'd-flex flex-column align-items-center'>
                                        <p>Quantity: <input style = {{width:'50px'}} type = 'number' defaultValue = { item.quantity } onChange = {(e)=> setQuantity(e.target.value)}/></p>
                                        <p>Item Total: ${ item.quantity * item.product.price }</p>

                                        <Button variant="outline-success" onClick = {(e) => {
                                        setQuantSubmit(true)
                                        updateQuantity(item.product.name, quantity, item.product._id)
                                        }}
                                        style = {{
                                            width:'9rem',
                                            marginBottom:'10px'
                                        }}
                                        >
                                        Update Quantity
                                        </Button>
                                        
                                        <Button variant="outline-danger"
                                        onClick = {(e)=> {
                                        deleteItem(item._id)
                                        }}
                                        style = {{
                                            width:'9rem',
                                        }}
                                        >
                                            Delete Item
                                        </Button>

                                </Col>
                            </Row>
                        )
                    })
                : null }
                </div>
        </Container>

        <ModalTemplate
            show = {show}
            onHide = {() => setShow(false)}
        >
            <h1>Feature not added yet</h1>
        </ModalTemplate>
        </>
    )
}
