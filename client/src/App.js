import './App.css'
import { Switch, Route } from "react-router-dom";
import Home from './components/Home'
import NavBar from './components/NavBar'
import AdminPage from './components/AdminPage';
import AppointmentPage from './components/AppointmentPage';

//Checking to see if I set up my branch correctly
function App() {
  return (
    <div >
     <h1 id="app-header">Detail Works VT</h1>
     <NavBar />
     <Switch>
       <Route exact path={'/'} component={Home} />
       <Route exact path='/admin' component={AdminPage} />
       <Route path={'/admin/:id'} component={AppointmentPage} />
     </Switch>
    </div>
  );
}

export default App;
