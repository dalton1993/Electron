import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { getAllCatagories } from '../../actions';
import { Link, useHistory } from 'react-router-dom';
import './style.css';

const MenuHeader = (props) => {

    const catagory = useSelector(state => state.catagory);
    const dispatch = useDispatch();
    const history = useHistory(); 

    useEffect( () => {
        dispatch(getAllCatagories());
    },[]);

    const renderCatagories = (catagories) => {

        let myCatagories = [];
        for(let catagory of catagories){
            myCatagories.push(
                <li key = {catagory.name}>
                    {
                        catagory.parentId ? <Link to = {`/category/${catagory._id}`}>{ catagory.name }</Link> : <span>{ catagory.name }</span>
                    }
                    { catagory.children.length > 0 ? (<ul>{ renderCatagories(catagory.children) }</ul>) : null }
                </li>
            )
        }
        return myCatagories
    }


    return (
        <div className = 'menu-header'>
            <ul>
                { catagory.catagories.length > 0 ? renderCatagories(catagory.catagories) : null }
            </ul>
        </div>
    );
}

export default MenuHeader;
