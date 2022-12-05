import React from 'react';
import {Route,Navigate,Outlet} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


const PrivateUserRoute = ({
    authUser: {isUserAuthenticated, loadingUser},
    }) => (
                 
                !isUserAuthenticated && !loadingUser ? (
                    <Navigate to="/loginUser" />
                ) : (
                    <Outlet />
                )         
        
);

PrivateUserRoute.propTypes = {
    authUser: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    authUser: state.authUser
});

export default connect(mapStateToProps)(PrivateUserRoute);
