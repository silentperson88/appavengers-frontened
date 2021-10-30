import {
  Alert,
  Button,
  Collapse,
  Container,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import axios from "axios";

function CreateProfile() {
  const [open, setOpen] = React.useState(false);
  const [firstName, setfirstName] = useState();
  const [lastName, setLastName] = useState();
  const [age, setAge] = useState();
  const [description, setDescription] = useState();
  // let postAlert = null;
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
    setfirstName("");
    setLastName("");
    setAge("");
    setDescription("");
    setOpen(true);
    // postAlert = {<Alert severity="success">This is a success alert — check it out!</Alert>}
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
      {/* <Alert severity="success">This is a success alert — check it out!</Alert> */}
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Successfully Profile Created
        </Alert>
      </Collapse>
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
