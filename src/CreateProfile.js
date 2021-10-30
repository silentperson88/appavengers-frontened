import { Button, Container, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

function CreateProfile() {
  const [firstName, setfirstName] = useState();
  const [lastName, setLastName] = useState();
  const [age, setAge] = useState();
  const [description, setDescription] = useState();

  const handleProfileCreater = () => {
    const body = {
      firstName: firstName,
      lastName: lastName,
      age: age,
      description: description,
    };
    axios
      .post(
        "https://appavengersbackened.herokuapp.com/profilemanager/createprofile/",
        body
      )
      .then((res) => console.log("Profile Created"));
  };
  return (
    <Container
      style={{
        marginTop: "10px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        width: "50%",
        border: "1px solid gray",
        borderRadius: "5px",
      }}
    >
      <TextField
        style={{ marginBottom: "10px" }}
        id="outlined-basic"
        label="First Name"
        variant="outlined"
        value={firstName}
        onChange={(event) => setfirstName(event.target.value)}
      />
      <TextField
        style={{ marginBottom: "10px" }}
        id="outlined-basic"
        label="Last Name"
        variant="outlined"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
      />
      <TextField
        style={{ marginBottom: "10px" }}
        id="outlined-basic"
        label="Age"
        variant="outlined"
        value={age}
        onChange={(event) => setAge(event.target.value)}
      />
      <TextField
        style={{ marginBottom: "10px" }}
        id="outlined-basic"
        label="Description"
        variant="outlined"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <Button variant="contained" onClick={handleProfileCreater}>
        Create Profile
      </Button>
    </Container>
  );
}

export default CreateProfile;
