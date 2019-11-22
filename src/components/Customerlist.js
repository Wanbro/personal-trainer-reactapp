import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Editcustomer from './Editcustomer';
import Addcustomer from './Addcustomer';
import Grid from '@material-ui/core/Grid';


const Customerlist = () => {
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

    const saveCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
         {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newCustomer)
            } )
            .then(res => fetchCustomers())
            .catch(err => console.error(err))
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(res => fetchCustomers())
            .then(setMessage('Changes saved succesfully'))
            .then(res => setOpen(true))
            .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
        fetch(link, {method: 'DELETE'})
        .then (res => fetchCustomers())
        .then (res => setMessage('customer deleted'))
        .then (res => setOpen(true))
        .catch(err => console.error(err))
       } }

    const Customercolumns = [{
        filterable: false,
        sortable: false,
        width: 100,
        Cell: row => <Editcustomer updateCustomer={updateCustomer} customer={row.original} />

    },
         
        {    
    
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
        <Grid >
        <Grid item>
            <Addcustomer saveCustomer = {saveCustomer}/>   
       </Grid>
            <ReactTable filterable={true} columns={Customercolumns} data={customers}/>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={message}/>
        </Grid>
 

     </div>
)
};
export default Customerlist;