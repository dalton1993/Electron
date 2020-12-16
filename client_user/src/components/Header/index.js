import React, { useState } from 'react'
import './style.css'
import Input from '../Form/index'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import { Link } from 'react-router-dom'; 
import './style.css'; 
import Modal from 'react-modal';
//import Form from '../Form/index'; 
import {Button, Navbar, Form, Nav, NavDropdown, FormControl} from 'react-bootstrap';
import axios from '../../helpers/axios';
import { signInAction, signUpAction } from '../../actions/auth_actions.js';
import { useDispatch, useSelector } from 'react-redux';
import ToastTemplate from '../Toasts/index.js';
import { authConstants, userConstants } from "../../actions/constants";
import { signOut } from '../../actions/auth_actions.js';


export default function Header(props) {

    const [ signInEmail, setSignInEmail ] = useState('');
    const [ signInPassword, setSignInPassword ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ signUpEmail, setSignUpEmail ] = useState('');
    const [ signUpPassword, setSignUpPassword ] = useState('');
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const cart = useSelector(state => state.cart);


    const logout = () => {
        dispatch(signOut())
    }


    return (
        <>
            <Row className = 'header '>
                <Col lg = {3} className = 'text-center d-none d-lg-flex align-items-center justify-content-center'>
                    <Link to = "/">
                        <div className="d-flex justify-content-center align-items-center"
                        style = {{
                            borderRadius:'50%',
                            boxShadow:'inset 1px 2px 5px rgb(50,50,50)', 
                            height:'3rem', width:'3rem', 
                            backgroundColor:'#e27d60'}}
                            >
                            <svg width="1.5rem" height="1.5rem" viewBox="0 0 16 16" class="bi bi-bag-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{color:'white'}}>
                                <path fill-rule="evenodd" d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
                            </svg>
                        </div>
                        </Link>
                </Col>

                <Col lg = { 6 } md = {8} sm = {8} xs = {7} className = 'd-flex align-items-center'>
                    <input 
                        placeholder = "Search Products"
                        className = 'form-control rounded-pill'
                    />
                </Col>

                

                <Col lg = {3} md = {4} sm = {4} xs = {5} className = 'd-flex align-items-center justify-content-end' style = {{paddingRight:'30px'}}>

                    <div style ={{paddingRight:'10px'}}>
                        <Link to = '/cart'>
                        <div className="d-flex justify-content-center align-items-center cart-icon"
                        style = {{
                            borderRadius:'50%',
                            boxShadow:'inset 1px 2px 5px rgb(50,50,50)', 
                            height:'3rem', width:'3rem', 
                            backgroundColor:'#c38d9e'}}
                            >
                                <svg width="1.5rem" height="1.5rem" viewBox="0 0 16 16" class="bi bi-cart3" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style = {{color:'white', cursor:'pointer'}}>
                                    <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                </svg>
                            {cart.cartItems ? <div className = 'cart-count'>{cart.cartItems.length}</div> : null}
                            </div>
                        </Link>
                    </div>

                    <div className="d-flex justify-content-center align-items-center cart-icon"
                    style = {{
                        borderRadius:'50%',
                        boxShadow:'inset 1px 2px 5px rgb(50,50,50)', 
                        height:'3rem', width:'3rem',
                        backgroundColor:'#41b3a3'}}
                        onClick = {(e) => setShow(true)}
                    >
                        <svg width="1.8rem" height="1.8rem" viewBox="0 0 16 16" class="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style = {{color:'white', cursor:'pointer'}}>
                            <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        </svg>
                    </div>
                </Col>
            </Row> 

            <Modal
               isOpen = {show}
               onRequestClose={() => setShow(false)}
               className = 'account-modal' 
            >
                <div style = {{display:'grid', justifyContent:'center', height:'100%', alignContent:'center'}}>
                    {!user.authenticate ? <p style ={{cursor:'pointer', fontSize:'25px'}} className = 'user-log'><Link to = '/signin' style = {{textDecoration:'none', color:'black'}}>Sign In</Link></p>:null }
                    <p style ={{cursor:'pointer', zIndex:'1000'}} className = 'user-log'><Link to = '/signup' style = {{textDecoration:'none', color:'black', fontSize:'25px'}}>Register</Link></p>
                    <p onClick = {(e)=>logout()} style ={{cursor:'pointer',fontSize:'25px'}} className = 'user-log'>Sign Out</p>
                </div>
            </Modal>
        </>
    )
}
