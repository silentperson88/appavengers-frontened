import { Container } from "@mui/material";
import "./App.css";
import CreateProfile from "./CreateProfile";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileList from "./profileList";

function App() {
  const [profile, setprofile] = useState([]);

  useEffect(() => {
    axios
      .get("https://appavengersbackened.herokuapp.com/profilemanager")
      .then((res) => {
        console.log(res.data);
        setprofile(res.data);
      });
  }, []);
  return (
    <Container>
      <CreateProfile />
      <ProfileList />
    </Container>
  );
}

export default App;
