import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import AddTraining from './Addtraining'
import moment from 'moment';
import Grid from '@material-ui/core/Grid';


const Traininglist = () => {
    const [training, setTraining] = useState([]);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const trainingLink = 'https://customerrest.herokuapp.com/api/trainings/'

    useEffect(() => {
        fetchTraining();
    }, [])

    const handleClose = (event, reason) => {
        setOpen(false);
    };


    const fetchTraining = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then((response) => response.json())
            .then((responseData) => {
                setTraining(responseData)
            })
    };

    const deleteTraining = (link) => {
        if (window.confirm('Are you sure?')) {
            console.log(trainingLink + link)
            fetch(trainingLink + link, { method: 'DELETE' })
                .then(res => fetchTraining())
                .then(res => setMessage('training session deleted'))
                .then(res => setOpen(true))
                .catch(err => console.error(err))
        }
    }

    const saveTraining = (newTraining) => {
        fetch(trainingLink, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newTraining)
        })
            .then(res => fetchTraining())
            .catch(err => console.error(err))
    }

    const columns = [{
        accessor: 'id',
        filterable: false,
        sortable: false,
        Cell: ({ value }) =>
            <Button color="secondary" size="small" onClick={() => deleteTraining(value)}>Delete</Button>

    },

    {
        id: 'date',
        Header: 'date',
        accessor: d => {
            return moment(d.date)
                .format("DD.MM.YYYY")
        },

    },
    {
        id: 'time',
        Header: 'start time',
        accessor: t => {
            return moment(t.date)
                .format("hh:mm")
        }
    },

    {
        Header: 'duration',
        accessor: 'duration',
    },


    {
        Header: 'activity',
        accessor: 'activity',

    }, {

        id: 'customer',
        Header: 'customer',
        accessor: d => d.customer.firstname + " " + d.customer.lastname,

    }]

    return (
        <div>
            <Grid container>
                <AddTraining saveTraining={saveTraining} fetchTraining={fetchTraining} />

            </Grid>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={message} />
            <ReactTable filterable={true} columns={columns} data={training} />
        </div>
    );

}

export default Traininglist;
