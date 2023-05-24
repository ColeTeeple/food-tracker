import React from "react";
import { Form, Button } from "react-bootstrap";
import { useRef, useState } from "react";
import { useFoodTracker } from "../context/FoodTrackerContext";
import '../App.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {createUser} = useFoodTracker();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser(emailRef.current.value, passwordRef.current.value);
            navigate("/profile");
        }
        catch (error) {
            console.log(error);
        }
    }

  return (
    <>
    <div className="form-container">
      <h4>Already have an account? <Link to="/signin">Sign in</Link></h4>
    <Form>
      <Form.Group id="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" ref={emailRef}></Form.Control>
      </Form.Group>
      <Form.Group id="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" ref={passwordRef}></Form.Control>
      </Form.Group>
      <Button onClick={handleSubmit} variant="dark">Sign Up</Button>
    </Form>
    </div>
    </>
  );
};

export default Signup;
