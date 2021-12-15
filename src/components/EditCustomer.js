import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";

export default function EditCustomer(props) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState(props.editing);
  const handleClickOpen = () => {
    setCustomer({
      firstname: props.editing.firstname,
      lastname: props.editing.lastname,
      email: props.editing.email,
      phone: props.editing.phone,
      streetaddress: props.editing.streetaddress,
      postcode: props.editing.postcode,
      city: props.editing.city,
    });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.editCustomer(props.value, customer);
    handleClose();
  };

  const inputChanged = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    setCustomer({
      firstname: props.editing.firstname,
      lastname: props.editing.lastname,
      email: props.editing.email,
      phone: props.editing.phone,
      streetaddress: props.editing.streetaddress,
      postcode: props.editing.postcode,
      city: props.editing.city,
    });
  }, [props.editing]);

  return (
    <div style={{ display: "inline-block" }}>
      <Tooltip title={"Edit customer"}>
        <IconButton
          className="MUIDataTableToolbar-icon-274"
          onClick={handleClickOpen}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>
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
