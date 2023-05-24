import React from "react";
import { Form, Button } from "react-bootstrap";
import { useRef, useState } from "react";
import { useFoodTracker } from "../context/FoodTrackerContext";
import '../App.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signin = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {signIn} = useFoodTracker();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signIn(emailRef.current.value, passwordRef.current.value);
            navigate("/profile");
        }
        catch (error) {
            console.log(error);
        }
    }

  return (
    <>
    <div className="form-container">
      <h4>Don't have an account? <Link to="/">Sign up</Link></h4>
    <Form>
      <Form.Group id="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" ref={emailRef}></Form.Control>
      </Form.Group>
      <Form.Group id="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" ref={passwordRef}></Form.Control>
      </Form.Group>
      <Button onClick={handleSubmit} variant="dark">Sign In</Button>
    </Form>
    </div>
    </>
  );
};

export default Signin;
