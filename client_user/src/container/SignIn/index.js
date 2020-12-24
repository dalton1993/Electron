import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import background from '../../Images/atom.png';
import Input from '../../components/Form/index.js';
import Button from 'react-bootstrap/Button';
import ToastTemplate from '../../components/Toasts/index.js';
import { useDispatch } from 'react-redux';
import { signInAction } from '../../actions/auth_actions.js';
import { useHistory, Link } from 'react-router-dom';
import axios  from '../../helpers/axios.js';
import { authConstants, userConstants } from "../../actions/constants";
import './style.css';



export default function SignIn() {

    const [ signInEmail, setSignInEmail ] = useState('');
    const [ signInPassword, setSignInPassword ] = useState('');
    const [ show, setShow ] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const signIn = (e) => {
        e.preventDefault();
        
        dispatch({ type: authConstants.LOGIN_REQUEST });

        axios.post('/user/signin', {
            email:signInEmail, 
            password:signInPassword
        })
        .then( res => {
            if(res.status === 200) {
                const { token, user } = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        token:token,
                        user:user
                    }
                })
                history.push('/');
                window.location.reload(); 
            }
        }).catch(error => {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: error
            })
            console.log(error)
            setShow(true);
        })
    }



    return (
        <Container fluid>
            <Row style={{fontFamily: 'Roboto, sans-serif'}}>
                <Col lg = {6} className = 'd-none d-lg-flex d-xl-flex flex-column justify-content-center align-items-center' style = {{height:'100vh', width:'100%', padding:'0', backgroundColor:"#41B3A3", fontFamily: 'Roboto, sans-serif'}}>
                    <div className ='circle c-1 d-flex justify-content-center align-items-center'>
                        <svg width="13rem" height="13rem" viewBox="0 0 16 16" class="bi bi-bag-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{color:'white'}}>
                            <path fill-rule="evenodd" d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
                        </svg>
                    </div>
                    <h1 style ={{color:'white', marginTop:'2rem'}}>Electron</h1>
                    <p style={{color:'white', fontSize:'20px'}}>A MERN stack ecommerce website</p>
                </Col>


                <Col lg = {6} md = {12} style = {{height:'100vh', width:'100%', padding:'0'}} className = 'd-flex justify-content-center align-items-center'>
                    
                            <form
                            onSubmit = {signIn}
                            style = {{width:'22rem'}} 
                            >
                                <div className='d-lg-none d-flex justify-content-center'
                                style ={{width:'100%',height:'10rem', marginBottom:'2rem'}}>
                                    <div className = 'd-flex justify-content-center align-items-center' style = {{borderRadius:'50%', height:'10rem', width:'10rem', background:'#43c7f7'}}>
                                        <svg width="70%" height="70%" viewBox="0 0 16 16" class="bi bi-bag-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{color:'white'}}>
                                        <path fill-rule="evenodd" d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
                                        </svg>
                                    </div>
                                </div>
                                <h1 style = {{marginBottom:'2rem'}}>Sign In</h1>
                                <input
                                    label = 'Username'
                                    type = 'text'
                                    placeholder = "Enter Email"
                                    value = { signInEmail }
                                    onChange = {(e)=>setSignInEmail(e.target.value)}
                                    className = 'form-control rounded-pill'
                                    style = {{marginBottom:'2rem'}}
                                />

                                <input
                                    label = 'Password'
                                    type = 'password'
                                    placeholder = "Enter Password"
                                    value = { signInPassword }
                                    onChange = {(e)=>setSignInPassword(e.target.value)}
                                    className = 'form-control rounded-pill'
                                    style = {{marginBottom:'1.5rem'}}
                                />
                                
                                <Button className='rounded-pill' style = {{marginBottom:'1.2rem'}} type = 'submit'>Sign In</Button>

                                <p style={{margin:'0'}}>Don't have an account? register <Link to = '/signup'>here</Link></p>
                                <Link to = "/">Return to main page</Link>

                                <ToastTemplate
                                    style={{ backgroundColor: '#e04c4c', height:'38px', color:"white", marginTop:'2rem' }}
                                    className = 'd-flex align-items-center'
                                    show={show}
                                    onClose={() => setShow(false)} show={show} delay={2000} autohide
                                >
                                    <p style = {{height:'100%', margin:'0'}} className = 'text-center'>Invalid information. Try Again!</p>
                                </ToastTemplate>

                            </form>      
                </Col>
            </Row>
        </Container>     
    )
}
