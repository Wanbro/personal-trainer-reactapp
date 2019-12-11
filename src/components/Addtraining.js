import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import DateTimePicker from 'react-datetime-picker';


const AddTraining = (props) => {

  const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
      .then((response) => response.json())
      .then((responseData) => {
        setCustomers(responseData.content)
      })
  };

  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [training, setTraining] = useState({ date: '', duration: '', activity: '', customer: '' });


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  }

  const handleChangeDate = (event) => {
    const date = event;
    setTraining({ ...training, date: date });
  }

  const addTraining = () => {
    props.saveTraining(training)
    handleClose();
    props.fetchTraining();
    setTraining({ date: '', duration: '', activity: '' })
  }

  return (
    <div style={{ margin: 10 }}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle >New Training</DialogTitle>
        <DialogContent>

          <DateTimePicker
            onChange={e => handleChangeDate(e)}
            name="date"
            value={training.date}
          />
          <TextField
            margin="normal"
            type="number"
            name="duration"
            value={training.duration}
            onChange={e => handleChange(e)}
            label="Duration"
            fullWidth
          />
          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={e => handleChange(e)}
            label="activity"
            fullWidth
          />

          <TextField
            select
            margin="normal"
            name="customer"
            label="Customers"
            onClick={fetchCustomers}
            value={training.customer}
            onChange={e => handleChange(e)}
            helperText="Select your customer"
          >
            {customers.map(customer => (
              <MenuItem value={customer.links[0].href} key={customer.links[0].href}>
                {customer.firstname} {customer.lastname}
              </MenuItem>
            ))}
          </TextField>


        </DialogContent>
        <DialogActions>
          <Button onClick={addTraining} color="primary">
            Add
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTraining;