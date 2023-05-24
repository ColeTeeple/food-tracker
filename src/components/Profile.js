import React from 'react'
import { Button, Modal, Form, Card} from 'react-bootstrap'
import { useState, useRef, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useFoodTracker } from '../context/FoodTrackerContext';

const Profile = () => {
    
    const dailyCaloriesRef = useRef();
    const dailyCarbsRef = useRef();
    const dailyFatRef = useRef();
    const dailyProteinRef = useRef();
    const {dailyCaloriesLimit, dailyCarbsLimit, dailyFatLimit, dailyProteinLimit, showModal, setShowModal, updateValues} = useFoodTracker();

  return (
    <>
    <Modal show={showModal}>
        <Form>
        <Form.Group id="daily-calories">
        <Form.Label>Daily Calorie Goal</Form.Label>
        <Form.Control type="number" ref={dailyCaloriesRef}></Form.Control>
      </Form.Group>
      <Form.Group id="daily-carbs">
        <Form.Label>Daily Carb Goal (grams)</Form.Label>
        <Form.Control type="number" ref={dailyCarbsRef}></Form.Control>
      </Form.Group>
      <Form.Group id="daily-fat">
        <Form.Label>Daily Fat Goal (grams)</Form.Label>
        <Form.Control type="number" ref={dailyFatRef}></Form.Control>
      </Form.Group>
      <Form.Group id="daily-protein">
        <Form.Label>Daily Protein Goal (grams)</Form.Label>
        <Form.Control type="number" ref={dailyProteinRef}></Form.Control>
      </Form.Group>
      <Button onClick={() => updateValues(dailyCaloriesRef.current.value, dailyCarbsRef.current.value, dailyFatRef.current.value, dailyProteinRef.current.value)} variant="dark">Submit</Button>
      <Button onClick={() => setShowModal(false)} variant="dark">Exit</Button>
        </Form>
    </Modal>

    <div className="profile-container">
      <div className="inner-profile-container">
      <h2>Daily Goals:</h2>
      <h4>Calories: {dailyCaloriesLimit}</h4>
      <h4>Carbs: {dailyCarbsLimit}g</h4>
      <h4>Fat: {dailyFatLimit}g</h4>
      <h4>Protein: {dailyProteinLimit}g</h4>
      <Button onClick={() => setShowModal(true)} variant="dark">Change Values</Button>
      </div>
    </div>
    </>
  )
}

export default Profile
