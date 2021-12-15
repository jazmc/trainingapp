import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddCustomer(props) {
  const dopen = props.dopen;
  const setDopen = props.setDopen;
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    streetaddress: "",
    postcode: "",
    city: "",
  });

  const handleClose = () => {
    setDopen(false);
  };

  const handleSave = () => {
    props.addCustomer(customer);
    handleClose();
  };

  const inputChanged = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Dialog open={dopen} onClose={handleClose}>
        <DialogTitle>New Customer</DialogTitle>
        <DialogContent>
          <TextField
            name="firstname"
            value={customer.firstname}
            onChange={inputChanged}
            margin="dense"
            label="First name"
            fullWidth
            variant="standard"
          />
          <TextField
            name="lastname"
            value={customer.lastname}
            onChange={inputChanged}
            margin="dense"
            label="Last name"
            fullWidth
            variant="standard"
          />
          <TextField
            name="email"
            value={customer.email}
            onChange={inputChanged}
            margin="dense"
            label="Email"
            fullWidth
            variant="standard"
          />
          <TextField
            name="phone"
            value={customer.phone}
            onChange={inputChanged}
            margin="dense"
            label="Phone"
            fullWidth
            variant="standard"
          />
          <TextField
            name="streetaddress"
            value={customer.streetaddress}
            onChange={inputChanged}
            margin="dense"
            label="Street address"
            fullWidth
            variant="standard"
          />
          <TextField
            name="postcode"
            value={customer.postcode}
            onChange={inputChanged}
            margin="dense"
            label="Postal code"
            fullWidth
            variant="standard"
          />
          <TextField
            name="city"
            value={customer.city}
            onChange={inputChanged}
            margin="dense"
            label="City"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
