import React from 'react';

import AuthService from '../../services';
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";

function Logout(props) {
    props
        .dispatch(AuthService.logout())
        .catch(err => {
            console.log(err.errors)
        })

    return <Redirect to={"/login"} />;
}

Logout.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated
});

export default connect(mapStateToProps)(Logout);
