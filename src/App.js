import React from 'react';
import './App.css';
import Customerlist from './components/Customerlist'
import Traininglist from './components/Traininglist'
import WorkoutCalendar from './components/WorkoutCalendar'
import Home from './components/Home'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Button from '@material-ui/core/Button';

function App() {
  return (

    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className="h4" >
            Personal trainer website

            </Typography>
        </Toolbar>
      </AppBar>

      {/* We give each route either a target `component`, or we can send functions in `render` or `children` 
       that return valid nodes. `children` always returns the given node whether there is a match or not. */}
      <Router>
        <div>
          <Link to="/Home">
            <Button variant="outlined" color="primary" >Home</Button>
          </Link>
          <Link to="/Customerlist">
            <Button variant="outlined" color="primary" className="h5">Customerlist</Button>
          </Link>
          <Link to="/Traininglist">
            <Button variant="outlined" color="primary" >Traininglist</Button>
          </Link>

          <Link to="/WorkoutCalendar">
            <Button variant="outlined" color="primary" >Workout Calendar</Button>
          </Link>

          <Switch>
            <Route path="/Home" component={Home} />
            <Route path="/Customerlist" component={Customerlist} />
            <Route path="/Traininglist" component={Traininglist} />
            <Route path="/WorkoutCalendar" component={WorkoutCalendar} />
            <Route path="" component={Home} />

            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </Router>

    </div>
  );
}

export default App;