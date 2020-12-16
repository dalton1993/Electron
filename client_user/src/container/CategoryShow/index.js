import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import axios from '../../helpers/axios.js';
import Header from "../../components/Header/index.js";
import MenuHeader from '../../components/MenuHeader/index.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {generatePublicURL} from '../../URLConfig';
import Image from 'react-bootstrap/Image';
import './style.css'; 
import CardTemplate from '../../components/Cards';


const CategoryShowPage = () => {

    const [ pageProducts, setPageProducts ] = useState([])
    const [ priceFilter, setPriceFilter ] = useState([])
    const [ average, setAverage ] = useState(null);
    const {categoryid} = useParams()
 
    
    useEffect( () => {
            axios.get('/categories/' + categoryid)
            .then(res =>{
                setPageProducts(res.data);
                //set up data for price filtering
                let initArr = [];
                let resultArr = []; 
                for(let item of res.data){
                    if(!initArr.includes(item.price)){
                    initArr.push(item.price);
                    }
                }
                if(Math.max(...initArr) < 100 ){
                    for(let item of initArr){
                        if(!resultArr.includes(Math.floor(item/10)*10)){
                        resultArr.push(Math.floor(item/10)*10);
                        }
                    }
                }
                if(Math.max(...initArr) > 100 && Math.max(...initArr) < 1500 ){
                    for(let item of initArr){
                        if(!resultArr.includes(Math.floor(item/100)*100)){
                        resultArr.push(Math.floor(item/100)*100);
                        }
                    }
                }
                if(Math.max(...initArr) > 1500){
                    for(let item of initArr){
                        if(!resultArr.includes(Math.floor(item/500)*500)){
                        resultArr.push(Math.floor(item/500)*500);
                        }
                    }
                }
                resultArr.sort((a, b) => a - b);
                setPriceFilter(resultArr)
            })
    },[categoryid]);

    const filter = (itemMin, itemMax) => {
        axios.post('filter-params/' + categoryid, {itemMin, itemMax})
        .then(result => {
            console.log(result)
            setPageProducts(result.data)
        }) 
    }

    const resetFilter = () => {
        axios.get('/categories/' + categoryid)
        .then(res => setPageProducts(res.data))   
    }

    const productReviews = (item) => {
        let base = 0;
        for(let review of item){
            base += review.rating;
        }
        return(
            <> { item.length > 0 ? <p>{Math.round((base/item.length)*10)/10}/5 stars - {item.length}  reviews</p> : null }</>
        )
    }

    

    return (
        <>
        <Header/>
        <MenuHeader/>
        
        <Container className='home' fluid>
           
            <div className = 'category-show-sidebar d-none d-lg-block'>
                    <p>Filter by price</p>
                    <p 
                    onClick = { (e) => resetFilter() }
                    className = 'filter-button'
                    tabIndex="1"
                    style={{cursor:'pointer'}}
                    >
                        Reset Filter
                    </p>
                    { 
                     Math.max(...priceFilter) > 1500 ? priceFilter.map( (item) => 
                    <p 
                    onClick = {(e)=>filter(item, item+499)}
                    style = {{cursor:'pointer'}}
                    className = 'filter-button'
                    tabIndex="1"
                    >
                        ${ item } - { item + 499 } 
                    </p>
                    ) 
                    : null 
                    }

                    { 
                     Math.max(...priceFilter) > 100 && Math.max(...priceFilter) < 1500 ? priceFilter.map( (item) => 
                    <p 
                    onClick = {(e)=>filter(item, item+99)}
                    style = {{cursor:'pointer'}}
                    className = 'filter-button'
                    tabIndex="1"
                    >
                        ${ item } - { item + 99 } 
                    </p>
                    ) 
                    : null 
                    }

                    { 
                     Math.max(...priceFilter) < 100 ? priceFilter.map( (item) => 
                    <p 
                    onClick = {(e)=>filter(item, item+10)}
                    style = {{cursor:'pointer'}}
                    >
                        ${ item } - { item + 9 } 
                    </p>
                    ) 
                    : null 
                    }
            </div>
            
            

           <div style={{marginTop:'9rem'}}>
            { 
            pageProducts.map( (item) => {
                
             return(
                <>
                
                <Row className = 'category-item-show justify-content-center'>

                    <Col lg = {8} md = {10} sm = {10}>
                        <Link  to = {'/product/' + item._id } style = {{textDecoration:'none'}} className="d-flex flex-row card-wrap">
                        <img className = 'category-image-show' src = {generatePublicURL(item.productPictures[0].img)}/>
                            <div>
                                <p>{ item.name }</p>
                                <p>${ item.price }</p>
                                {productReviews(item.reviews)}
                                <div className = "d-none d-md-block">{ item.description.length > 50 ? <p>{item.description.substring(0, 200)}</p> : item.description }</div>
                            </div>
                        </Link>
                    </Col>

                </Row>
            
                </>
             )
        })
            
            }
            </div>
        </Container>
        </>
    )
}


export default CategoryShowPage;