import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import Base from '../Base';
import BaseInside from "../BaseInside";

const SplitRoute = ({
  component: Component,
  fallback: Fallback,
  isAuthenticated,
  ...rest
}) => (

  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <BaseInside>
          <Component {...props} />
        </BaseInside>
      ) : (
        <Base>
          <Fallback {...props} />
        </Base>
      )
    }
  />
);

SplitRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated
});

export default connect(mapStateToProps)(SplitRoute);
