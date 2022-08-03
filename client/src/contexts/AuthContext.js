import axios from 'axios';
import { createContext, useReducer, useEffect } from 'react';

import setAuthToken from '../utils/setAuthToken';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constants';
import { authReducer } from '../reducers/authReducer';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    });

    // Authenticate the user
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        }

        try {
            const response = await axios.get(`${apiUrl}/auth`);

            if (response.data.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: true,
                        user: response.data.user,
                    },
                });
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    isAuthenticated: false,
                    user: null,
                },
            });
        }
    };

    useEffect(() => loadUser(), []);

    // Login
    const loginUser = async (userForm) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm);
            if (response.data.success)
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken,
                );

            await loadUser();

            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            return { success: false, message: error.message };
        }
    };

    // Register user
    const registerUser = async (userForm) => {
        try {
            const response = await axios.post(
                `${apiUrl}/auth/register`,
                userForm,
            );
            if (response.data.success)
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken,
                );

            await loadUser();

            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            return { success: false, message: error.message };
        }
    };

    // Logout the user
    const logoutUser = async () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);

        dispatch({
            type: 'SET_AUTH',
            payload: {
                isAuthenticated: false,
                user: null,
            },
        });
    };

    // Context data
    const authContextData = { loginUser, registerUser, logoutUser, authState };

    // Return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
