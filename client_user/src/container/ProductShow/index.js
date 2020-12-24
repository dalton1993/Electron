import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import axios from '../../helpers/axios.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { generatePublicURL } from '../../URLConfig';
import './style.css';
import Header from "../../components/Header/index.js";
import MenuHeader from '../../components/MenuHeader/index.js';
import { useSelector } from 'react-redux'; 
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'; 
import ModalTemplate from '../../components/Modal/index.js';
import Form from 'react-bootstrap/Form';
import { cartConstants } from '../../actions/constants';
import { useDispatch } from 'react-redux'; 

const ProductShowPage = () => {

   
    const [ productState, setProductState ] = useState([]);
    const [ productCategory, setProductCategory ] = useState('');
    const [ productImages, setProductImages ] = useState([]);
    const [ productName, setProductName ] = useState('');
    const [ productReviews, setProductReviews ] = useState([]);
    const [ productDescription, setProductDescription ] = useState('');
    const [ productPrice, setProductPrice ] = useState(null);
    const [ picDisplay, setPicDisplay ] = useState('');
    const [ showPic, setShowPic ] = useState('')
    const [ show, setShow ] = useState(false);
    const [ title, setTitle ] = useState(''); 
    const [ review, setReview ] = useState('');
    const [ rating, setRating ] = useState(0);
    const [ cartShow, setCartShow ] = useState(false); 
    const [ orderShow, setOrderShow ] = useState(false);
    const [ cartItemQuantity, setCartItemQuantity ] = useState(1);
    const auth = useSelector(state => state.auth);
    const { productid } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();  


    useEffect( () => {
        axios.get(`/getproduct/${productid}`)
        .then( res => {
            console.log(res.data.product.reviews);
            const data = res.data.product; 
            setProductCategory(data.catagory.name)
            setProductName(data.name)
            setProductDescription(data.description)
            setProductPrice(data.price)
            setProductReviews(data.reviews)

            const imageArr = [];

            for(let image of data.productPictures){
                imageArr.push(image); 
            }
            
            setProductImages(imageArr); 
            setPicDisplay(imageArr[0].url);
            setShowPic(imageArr[0].url)
            //setProductImages(imageArr);
            //setProductState(res.data.product); 
        })
        .catch(err => {
            console.log(err); 
        })
    },[]); 


    const setPic = (item) => {
        setPicDisplay(item)
    }

    const handleReview = (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        const user_id = user._id;
        axios.post(`/product-review/${productid}`,{
            user_id:user_id,
            reviewTitle: title,
            review: review,
            rating:rating
        })
        .then(res => {
            setProductReviews(res.data.reviews)
            setShow(false)
        })
        .catch( err =>
            console.log(err)
        )
    }

    const addToCart = () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user'); 
        if(!token || !user){
            history.push('/signin');
        } else {
            axios.post('/user/cart/add-to-cart',{
                cartItems: {
                    product:productid,
                    quantity:parseInt(cartItemQuantity),
                    price:productPrice
                }
            }).then( res => {
                console.log(res);
                dispatch({
                    type: cartConstants.CART_REQUEST_SUCCESS,
                    payload: { productDetails: {productName, productid} }
                })
                setCartShow(false)
            })
            .catch( error => {
                console.log(error)
                dispatch({
                    type: cartConstants.CART_REQUEST_FAILURE,
                    payload: error
                })
            })
        }
    }


    return (
        <>
        {/*<div className = 'product-sidebar'>
            <div className = 'icon-wrap icon-pen'>
                <img src="https://img.icons8.com/fluent-systems-regular/35/000000/pencil.png"/>
            </div>
            <div className = 'icon-wrap icon-facebook'>
                <img src="https://img.icons8.com/fluent/35/000000/facebook-new.png"/>
            </div>
            <div className = 'icon-wrap icon-instagram'>
                <img src="https://img.icons8.com/fluent/35/000000/instagram-new.png"/>
            </div>
            <div className = 'icon-wrap icon-pinterest'>
                <img src="https://img.icons8.com/fluent/35/000000/pinterest.png"/>
            </div>
            <div className = 'icon-wrap icon-envelope'>
                <img src="https://img.icons8.com/fluent/35/000000/gmail--v1.png"/>
            </div>
        </div>*/}

        <Header/>
        <MenuHeader/>

        <Container style = {{marginTop:'10rem'}}>

            <Row className = 'd-flex justify-content-center'>
                <Col lg = {2} md = {3} className = 'd-none d-md-flex flex-column'>
                    {
                  
                    productImages.map( (item) => {
                    return(
                        <div onClick={(e) => setPic(item.url)} className = 'productImgContainer d-flex align-items-center'>
                            <img style = {{cursor:'pointer'}} src = {item.url}/>
                        </div>
                        )
                    })
                    }
                </Col>

                <Col lg = {6} md = {8} sm ={10} xs = {10} className = 'd-flex justify-content-center'>
                    <div className = 'main-image-display'>
                        {<img src = {picDisplay} />}
                    </div>
                </Col>
               
                        <Col sm = {9} 
                        className = "d-flex d-md-none justify-content-center"
                        style={{marginTop:'10px'}}
                        >
                        {
                  
                            productImages.map( (item) => {
                            return(
                                <div onClick={(e) => setPic(item.url)} className = 'productImgContainer d-flex align-items-center'>
                                    <img style = {{cursor:'pointer'}} src = {item.url}/>
                                </div>
                                )
                            })
                        }
                        </Col>
                    
            </Row>

            <Row style = {{marginTop:'80px'}}>
                <Col lg = {6} md = {6} className = 'd-flex align-items-end  justify-content-center justify-content-md-start'>
                    <h1 style={{margin:'0'}} className="text-end"> {productName }<p style={{margin:'0', paddingLeft:'10px', color:'rgb(120,120,120)', fontSize:'20px'}}>in { productCategory }</p></h1>
                </Col>

                <Col lg = {6} md = {6} className = 'd-flex justify-content-md-end justify-content-center align-items-center'>
                    <p style = {{paddingRight:'15px', fontSize:'30px', margin:'0'}}>${ productPrice }</p>
                    <Button  onClick = {() => setOrderShow(true)} variant="outline-success" style = {{marginRight:'8px'}}>Order</Button>
                    <Button variant="outline-primary" onClick = {() => setCartShow(true)}>Add to Cart</Button>
                </Col>
            </Row>

            <Row style = {{marginTop:'30px'}}>
                <Col>
                    {productDescription}
                </Col>
            </Row>

            <Row style = {{marginTop:'50px', marginBottom:'50px'}}>
                { auth.token ?
                

                <Col lg = {12} 
                className = 'd-flex justify-content-center flex-column align-items-center'>
                    <p className = 'text-center' style = {{fontSize:'35px'}}>We'd love to hear your review!</p>
                    <Button variant="outline-primary" onClick = {(e) => setShow(true)}>Review</Button>
                </Col>
              

                :
                <Col lg = {12}>
                    <Link to = "/signin"
                        style = {{
                            textDecoration:'none',
                            background:'#41b3a3',
                            borderRadius:'30px',
                            padding:'5px',
                            color:'white'
                        }}
                    >Sign in to comment</Link>
                </Col>

                }
            </Row>

            <Row style = {{
                margin:'0 5px 5rem 5px',
                paddingTop:'10px'
                }}>
                <Col lg = {12} sm = { 12 } xs = {12}>
                   {
                       productReviews.map(item => {
                           return(
                            <>
                            <Row style = {{
                                borderTop:'2px solid #41b3a3',
                                padding:'15px' 
                                }}>
                                <Col className = 'd-flex align-items-center'>
                                    <h4 style = {{margin:'0'}}>{item.reviewTitle}</h4>
                                    <p style = {{
                                        margin:'0', 
                                        marginLeft:'15px',
                                        padding:'5px', 
                                        background:'#43c7f7', 
                                        borderRadius:'15px',
                                        textAlign:'center',
                                        color:'white',
                                        fontSize:'12px',
                                        fontWeight:'bold',
                                        minWidth:'4rem'
                                        }}>{item.rating === 0 ? <span>1 </span> : <span>{item.rating}</span>} stars</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p>Posted by: {item.userId.firstName}.{item.userId.userName}</p>
                                    <p>{item.review}</p>
                                </Col>
                            </Row>
                            </>
                           )
                       })
                   }
                </Col>
            </Row>
        </Container>

        <ModalTemplate
            show = {show}
            onHide={() => setShow(false)}
            header = {<h1>Review { productName }</h1>} 
        >
            <Form onSubmit = {handleReview}>
                <Row style = {{marginBottom:'10px'}}>
                    <Col lg = {1} className = 'd-flex align-items-center'>
                        <p className = 'rating'>Stars:</p>
                    </Col>

                    <Col lg = {3}>
                        <Form.Control onChange = {(e) => setRating(e.target.value)} as="select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Col>
                </Row>

                <Row style = {{marginBottom:'15px'}}>
                    <Col lg = {12}>
                        <Form.Label>Add Headline</Form.Label>
                        <Form.Control onChange = {(e)=>setTitle(e.target.value)} type="Add Headline"/>
                    </Col>
                </Row>

                <Row>
                    <Col lg = {12}>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Add Review</Form.Label>
                            <Form.Control onChange = {(e)=>setReview(e.target.value)} as="textarea" rows={10} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col lg = {12} className = 'd-flex justify-content-end'>
                        <Button type = 'submit'>Submit</Button>
                    </Col>
                </Row>
            </Form>

        </ModalTemplate>

        <ModalTemplate
            show = {cartShow}
            onHide={() => setCartShow(false)}
            header = {<h1>Add { productName } to cart</h1>} 
        >
            <Row style = {{marginBottom:'15px'}}>
                <Col className = 'd-flex justify-content-center'>
                    <div className = 'modal-image' style = {{marginBottom:'20px'}}>
                        <img src = {showPic}/>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col>
                    {productName}
                    { cartItemQuantity > 0 ? <p>Total: ${productPrice * cartItemQuantity}</p > : <p>Total: ${productPrice}</p>}
                </Col>
                <Col className = 'd-flex justify-content-end'>
                    <p>Enter quantity: <input onChange = { (e) => setCartItemQuantity(e.target.value) } type = 'number' min="1" defaultValue = '1'/></p>
                </Col>
            </Row>
            
            <Row style = {{marginBottom:'15px'}}>
                <Col>
                   {productDescription}
                </Col>
            </Row>

            <Row>
                <Col className = 'd-flex justify-content-end'>
                    <Button onClick = {()=>addToCart()}>Add Item</Button>
                </Col>
            </Row>

        </ModalTemplate>

        <ModalTemplate
            show = {orderShow}
            onHide={() => setOrderShow(false)}
        >
            <h1>Action currently unavailable</h1>
        </ModalTemplate>
        </>
    )
}

export default ProductShowPage;  
