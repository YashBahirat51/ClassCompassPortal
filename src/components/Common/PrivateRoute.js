import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, adminOnly, ...rest }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const isAuthenticated = user !== null;
    const role = user?.role;

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    (adminOnly && role === 'admin') ||
                    (!adminOnly && (
                        (role === 'admin' && rest.path.startsWith('/admin')) ||
                        (role === 'faculty' && rest.path.startsWith('/faculty')) ||
                        (role === 'student' && rest.path.startsWith('/student'))
                    )) ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to={`/${role}/login`} />
                    )
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
    