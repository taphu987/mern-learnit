export const apiUrl =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:5001/api'
        : 'https://secret-reef-13322.herokuapp.com/api';

export const LOCAL_STORAGE_TOKEN_NAME = 'mern-learnit';

export const POSTS_LOADED_SUCCESS = 'POSTS_LOADED_SUCCESS';

export const POSTS_LOADED_FAILED = 'POSTS_LOADED_FAILED';

export const ADD_POST = 'ADD_POST';

export const DELETE_POST = 'DELETE_POST';

export const UPDATE_POST = 'UPDATE_POST';

export const FIND_POST = 'FIND_POST';
