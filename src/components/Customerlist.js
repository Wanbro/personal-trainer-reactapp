import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchCustomers();
       }, [])

       const handleClose = (event, reason) => {
        setOpen(false);
     };
   
      const fetchCustomers = () => {
       fetch('https://customerrest.herokuapp.com/api/customers')
       .then((response) => response.json())
       .then((responseData) => {
           setCustomers(responseData.content)
       
       })
    };
    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
        fetch(link, {method: 'DELETE'})
        .then (res => fetchCustomers())
        .then (res => setMessage('customer deleted'))
        .then (res => setOpen(true))
        .catch(err => console.error(err))
       } }
    

    const Customercolumns = [{    
    
        accessor: 'links[0].href',
        filterable: false,
        sortable: false,
        Cell: ({value}) =>    
        <Button color ="secondary" size="small" onClick = {() => deleteCustomer(value)}>Delete</Button>
        
        },
        {
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
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={message}/>
   </grid>
 

     </div>
)
};
export default CustomerList;