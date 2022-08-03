export const apiUrl =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:5001/api'
        : 'someDeployURL';

export const LOCAL_STORAGE_TOKEN_NAME = 'mern-learnit';
