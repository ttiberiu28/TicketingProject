import React from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import BannerCarousel from "../BannerCarousel";
import { useNavigate } from "react-router-dom";
import RestClient from "../../REST/RestClient";
import { Cart } from "../../interfaces/Cart";
import { useCartContext } from './CartContext';
import { renderToString } from 'react-dom/server';
import SuccessEmail from './SuccessEmail';



const Checkout = () => {

    const navigate = useNavigate();
    const { cart } = useCartContext();

    const handleBuyNow = async (cart: Cart | null) => {
        try {
            const email = localStorage.getItem("email");

            if (!email) {
                throw new Error("User email not found in local storage");
            }

            // Render the SuccessEmail component as a string
            const successEmailHTML = renderToString(<SuccessEmail cart={cart} />);

            await RestClient.sendEmail(email, cart, successEmailHTML);
            navigate('/success');
        } catch (error: any) {
            console.error("Error sending email:", error.message);
        }
    };


    return (

        <div className="my-container-padding ">
            <BannerCarousel />

            <Container>

                <div className="col-lg-6 px-5 py-4">

                    <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">Payment</h3>

                    <form className="mb-5">

                        <div className="form-outline mb-5">
                            <input type="text" id="typeText" className="form-control form-control-lg"
                                value="1234 5678 9012 3457" />
                            <label className="form-label" htmlFor="typeText">Card Number</label>
                        </div>

                        <div className="form-outline mb-5">
                            <input type="text" id="typeName" className="form-control form-control-lg"
                                value="John Smith" />
                            <label className="form-label" htmlFor="typeName">Name on card</label>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-5">
                                <div className="form-outline">
                                    <input type="text" id="typeExp" className="form-control form-control-lg" value="01/22"
                                    />
                                    <label className="form-label" htmlFor="typeExp">Expiration</label>
                                </div>
                            </div>
                            <div className="col-md-6 mb-5">
                                <div className="form-outline">
                                    <input type="password" id="typeText" className="form-control form-control-lg"
                                        value="&#9679;&#9679;&#9679;" />
                                    <label className="form-label" htmlFor="typeText">Cvv</label>
                                </div>
                            </div>
                        </div>

                        <p className="mb-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit <a
                            href="#!">obcaecati sapiente</a>.</p>

                        <button
                            type="button"
                            className="btn btn-primary btn-block btn-lg"
                            onClick={() => handleBuyNow(cart)}
                        >
                            Buy now
                        </button>


                        <h5 className="fw-bold mb-5" style={{ bottom: 0 }} onClick={() => navigate('/events')}>
                            <a href="#!"><i className="fas fa-angle-left me-2"></i>Back to shopping</a>
                        </h5>

                    </form>

                </div>
            </Container>
        </div>

    )
}

export default Checkout;