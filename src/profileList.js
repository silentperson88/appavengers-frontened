import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

function ProfileList() {
  const [profile, setprofile] = useState([]);
  const [firstName, setfirstName] = useState();
  const [lastName, setLastName] = useState();
  const [age, setAge] = useState();
  const [description, setDescription] = useState();
  const [idd, setId] = useState();
  const [open, setOpen] = useState(false);
  const [alertopen, setAlertOpen] = useState(false);

  const handleClickOpen = (id) => {
    setId(id);
    setOpen(true);
  };

  const handleClose = (index) => {
    setOpen(false);
  };
  const handleAlert = () => {
    setAlertOpen(!alertopen);
  };
  const deleteProfile = () => {
    console.log(idd);
    axios
      .delete(
        `https://appavengersbackened.herokuapp.com/profilemanager/removeprofile/${idd}`
      )
      .then(console.log("Profile Deleted"));
    const newprofilelist = profile.filter((item) => item._id !== idd);
    setprofile(newprofilelist);
    setAlertOpen(false);
  };
  useEffect(() => {
    axios
      .get("https://appavengersbackened.herokuapp.com/profilemanager")
      .then((res) => {
        console.log(res.data);
        setprofile(res.data);
      });
  }, []);

  const updateProfile = () => {
    console.log(firstName);
    console.log(lastName);
    console.log(age);
    console.log(description);
    const body = {
      firstName: firstName,
      lastName: lastName,
      age: age,
      description: description,
    };
    console.log(idd);
    axios
      .patch(
        `https://appavengersbackened.herokuapp.com/profilemanager/profileupdate/${idd}`,
        body
      )
      .then((res) => {
        console.log("succesfully updated");
      });
    setOpen(false);
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Profiles List</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>FirstName</TableCell>
              <TableCell>LastName</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Descripton</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profile.map((item, index) => {
              return (
                <TableRow>
                  <TableCell>{item._id}</TableCell>
                  <TableCell>{item.firstName}</TableCell>
                  <TableCell>{item.lastName}</TableCell>
                  <TableCell>{item.age}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={(e) => handleClickOpen(item._id)}
                    >
                      Update
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={(e) => {
                        setId(item._id);
                        handleAlert();
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>UpdateProfile</DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateProfile}>Update</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={alertopen}
        onClose={handleAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlert}>cancel</Button>
          <Button onClick={(e) => deleteProfile()} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ProfileList;
