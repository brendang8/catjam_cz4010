import "./Home.css";
import NavBar from "../NavBar/NavBar";
import { Paper, Button } from '@material-ui/core'
import React, { Component } from 'react';

function Home() {

    var item = 
    {
        name: "A whole world of freelance talent at your fingertips",
        description: "Discover high quality services from a wide range of categories",
        button: "Explore Now",
        src: "https://theprofessionalcentre.com/media/freelancer-office.jpg"
    }


    return(
        <div>
            <Item item={item}/>
        </div>
    )
}

function Item(props)
{
    return (
        <div className="item">
            <div className="item-image">
                <img src={props.item.src} alt=''/>
            </div>
            <div className="item-content">
                <div className="item-content-container">
                    <span className="item-text-title">{props.item.name}</span>
                    <span className="item-text-desc">{props.item.description}</span>
                    <Button variant="contained" color="secondary" style={{marginTop: '60px'}}>
                        {props.item.button}
                    </Button>
                </div>
                
            </div>
            
        </div>
    )
}

export default Home