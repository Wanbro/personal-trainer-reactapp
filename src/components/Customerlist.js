import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
       }, [])

     
   
      const fetchCustomers = () => {
       fetch('https://customerrest.herokuapp.com/api/customers')
       .then((response) => response.json())
       .then((responseData) => {
           setCustomers(responseData.content)
       
       })
    };

    const Customercolumns = [{
        Header: 'firstname',
        accessor: 'firstname' ,
        
        }, {
        Header: 'lastname',
        accessor: 'lastname',
       
        },
        {
        Header: 'streetaddress',
        accessor: 'streetaddress',
       
        },{
        Header: 'postcode',
        accessor: 'postcode',
        
        },{
        Header: 'city',
        accessor: 'city',
        
        },{
        Header: 'email',
        accessor: 'email',
      
        }, {    
        Header: 'phone',
        accessor: 'phone',
          
        }]
        

return (
    <div>
        <grid container>
        <ReactTable filterable={true} columns={Customercolumns} data={customers}/>
   </grid>
 

     </div>
)
};
export default CustomerList;