import React from "react";
import { Button } from 'react-bootstrap';
import "./CSS/CustomJumbotron.css"
import "./CSS/About.css"

export default function About(){

    return (

        <div className="jumbotron jumbotron-fluid custom-jumbotron">
            <div className="container">
                <h1 className="display-4">Ticket-to-GO</h1>


                <p className="lead"> The fastest way to buy your ticket right </p>
                <p className="lead upside-down">now</p>
            
            </div>
        </div>
        
    )
}