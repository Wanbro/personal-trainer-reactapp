import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import moment from 'moment';


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

   const columns = [{
    id: 'date',
    Header: 'date',
        accessor: d => {
        return moment(d.date)
          .format("hh:mm DD.MM.YYYY")
      },


    }, {
    Header: 'duration',
    accessor: 'duration',
    },


    {
    Header: 'activity',
    accessor: 'activity',
      
    }]

   return (
    <div>
        <grid container>
    
    
   </grid>
   
    <ReactTable filterable={true} columns={columns} data={training}/>
     </div>
);

}

export default Traininglist;
