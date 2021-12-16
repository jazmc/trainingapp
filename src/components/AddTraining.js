import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

export default function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const customer = props.customer;

  const [training, setTraining] = useState({
    date: "",
    activity: "",
    duration: "",
    customer: props.customer,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.addTraining(training);
    console.log("Training for url: " + training.customer);
    handleClose();
  };

  const inputChanged = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  return (
    <div style={{ display: "inline-block" }}>
      <Tooltip title={"Add training"}>
        <IconButton
          onClick={handleClickOpen}
          className="MUIDataTableToolbar-icon-274"
        >
          <FitnessCenterIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          New Training for {customer.firstname} {customer.lastname}
        </DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Date and time of training"
              size="small"
              name="date"
              value={training.date}
              minDate={new Date("2017-01-01")}
              inputFormat="dd.MM.yyyy HH:mm"
              onChange={(newValue) => {
                setTraining({ ...training, date: newValue.toISOString() });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            margin="dense"
            label="Activity"
            fullWidth
            variant="standard"
          />
          <TextField
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            margin="dense"
            label="Duration (min)"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save training</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
