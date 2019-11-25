import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import AddTraining from './Addtraining'
import moment from 'moment';
import Grid from '@material-ui/core/Grid';


const Traininglist = () => {
    const [training, setTraining] = useState([]);
   

   useEffect(() => {
    fetchTraining();
   }, [])

   const fetchTraining = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then((response) => response.json())
    .then((responseData) => {
        setTraining(responseData)    
    })
   };

   const saveTraining = (newTraining) => {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
    method: 'POST', 
    headers: {'Content-type': 'application/json'}, 
    body: JSON.stringify(newTraining)
   })
    .then(res => fetchTraining())
    .catch(err => console.error(err))
}

   const columns = [{
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

        id: 'customer', // Required because our accessor is not just a string
        Header: 'customer',
        accessor: d => d.customer.firstname + " " + d.customer.lastname,

    }]

   return (
    <div>
        <Grid container>
        <AddTraining saveTraining = {saveTraining} fetchTraining = {fetchTraining}/>
        
       </Grid>
   
    <ReactTable filterable={true} columns={columns} data={training}/>
     </div>
);

}

export default Traininglist;
