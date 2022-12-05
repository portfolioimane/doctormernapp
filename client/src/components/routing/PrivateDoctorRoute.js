import React from 'react';
import {Route,Navigate,Outlet} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


const PrivateDoctorRoute = ({ 
    authDoctor: {isDoctorAuthenticated, loadingDoctor},
    }) => (    
                !isDoctorAuthenticated && !loadingDoctor ? (
                    <Navigate to="/loginDoctor" />
                ) : (
                    <Outlet />
                )
);

PrivateDoctorRoute.propTypes = {
    authDoctor: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    authDoctor: state.authDoctor
});

export default connect(mapStateToProps)(PrivateDoctorRoute);
