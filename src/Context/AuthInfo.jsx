import React, { createContext, useReducer, useEffect, useContext } from 'react';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

// Action types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: {
                    userId: action.payload.userId,
                    email: action.payload.email,
                    role: action.payload.role,
                },
                token: action.payload.token,
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const getStoredToken = () => {
        return localStorage.getItem('accessToken') || null;
    };

    const storedToken = getStoredToken();

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        token: storedToken,
    });

    const login = (userData, tokenData) => {
        dispatch({
            type: LOGIN,
            payload: {
                userId: userData.id,
                email: userData.email,
                role: userData.role,
                token: tokenData,
            },
        });

        localStorage.setItem('accessToken', tokenData);
    };

    const logout = () => {
        dispatch({ type: LOGOUT });
        localStorage.removeItem('accessToken');
    };

    const checkTokenExpiration = () => {
        const storedToken = getStoredToken();

        if (storedToken) {
            try {
                const decodedToken = jwtDecode(storedToken);
                const currentTimestamp = Math.floor(Date.now() / 1000);

                if (decodedToken.exp && decodedToken.exp < currentTimestamp) {
                    dispatch({ type: LOGOUT });
                } else {
                    dispatch({
                        type: LOGIN,
                        payload: {
                            userId: decodedToken.userId,
                            email: decodedToken.email,
                            role: decodedToken.role,
                            token: storedToken,
                        },
                    });
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                dispatch({ type: LOGOUT });
            }
        }
    };

    useEffect(() => {
        checkTokenExpiration();

        const tokenExpirationCheckInterval = setInterval(() => {
            checkTokenExpiration();
        }, 60000);

        return () => clearInterval(tokenExpirationCheckInterval);
    }, []);

    const contextValue = {
        ...state,
        login,
        logout,
        userId: state.user ? state.user.userId : null,
        email: state.user ? state.user.email : null,
        role: state.user ? state.user.role : null,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
