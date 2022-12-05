import React, { useEffect, Fragment } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import LoginUser from './components/auth/LoginUser';
import LoginDoctor from './components/auth/LoginDoctor';
import DoctorRegister from './components/auth/DoctorRegister';
import UserRegister from './components/auth/UserRegister';
import Dashboard from './components/dashboard/Dashboard';
import AddEducation from './components/profile-forms/AddEducation';
import AddExperience from './components/profile-forms/AddExperience';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import PrivateDoctorRoute from './components/routing/PrivateDoctorRoute';
import Appointment from './components/user/Appointments';
import AppointmentForm from './components/bookappointment/AppointmentForm';
import PrivateUserRoute from './components/routing/PrivateUserRoute';
import './App.css';

// Redux
import {Provider} from 'react-redux';
import store from './store';
import { loadUser } from './actions/authUser';
import { loadDoctor } from './actions/authDoctor';
import setAuthToken from './utils/setAuthToken';
import { CookiesProvider } from 'react-cookie';


if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadDoctor());
  }, []);

  return (
    <CookiesProvider>
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Landing/>} />
          </Routes>
          <div className="container">
            <Alert />
             <Routes>
                     
              <Route exact path='/loginUser' element={<LoginUser/>} />
              <Route exact path='/loginDoctor' element={<LoginDoctor/>} />
              <Route exact path='/registerDoctor' element={<DoctorRegister/>} />
              <Route exact path='/registerUser' element={<UserRegister/>} />
              <Route exact path='/profiles' element={<Profiles/>} />
              <Route exact path='/doctor/:id' element={<Profile/>} />
            </Routes>

            <Routes>
              <Route exact path='/dashboard' element={<PrivateDoctorRoute/>}>
                <Route exact path='/dashboard' element={<Dashboard/>}/>
              </Route>
              <Route exact path='/add-education' element={<PrivateDoctorRoute/>}>
                <Route exact path='/add-education' element={<AddEducation/>}/>
              </Route>
              <Route exact path='/add-experience' element={<PrivateDoctorRoute/>}>
                <Route exact path='/add-experience' element={<AddExperience/>}/>
              </Route>
              <Route exact path='/create-profile' element={<PrivateDoctorRoute/>}>
                <Route exact path='/create-profile' element={<CreateProfile/>}/>
              </Route>
             <Route exact path='/edit-profile' element={<PrivateDoctorRoute/>}>
                <Route exact path='/edit-profile' element={<EditProfile/>}/>
              </Route>
              <Route exact path='/appointment' element={<PrivateUserRoute/>}>
                <Route exact path='/appointment' element={<Appointment/>}/>
              </Route>
              <Route exact path='/appointment/:id' element={<PrivateUserRoute/>}>
                <Route exact path='/appointment/:id' element={<AppointmentForm/>}/>
              </Route>

          </Routes>
            
          </div>
        </Fragment>
      </Router>
    </Provider>
    </CookiesProvider>
  );
}

export default App;
