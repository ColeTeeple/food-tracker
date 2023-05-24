import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Form, Button, Modal, ProgressBar, Navbar, Nav } from "react-bootstrap";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Totals from "./components/Totals";
import FormInput from "./components/FormInput";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Profile from "./components/Profile";
import { FoodTrackerProvider } from "./context/FoodTrackerContext";

function App() {
  return (
    <>
      <FoodTrackerProvider>
        <Navbar id="navbar" className="sticky-top">
          <Nav>
            <Nav.Link as={NavLink} to="/profile">
              Profile
            </Nav.Link>
            <Nav.Link as={NavLink} to="/add">
              Add
            </Nav.Link>
            <Nav.Link as={NavLink} to="/totals">
              Totals
            </Nav.Link>
          </Nav>
        </Navbar>

        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/totals" element={<Totals />} />
          <Route path="/add" element={<FormInput />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </FoodTrackerProvider>
    </>
  );
}

export default App;
