import { createContext, useReducer, useState } from 'react';
import axios from 'axios';

import { postReducer } from '../reducers/postReducer';
import {
    apiUrl,
    POSTS_LOADED_SUCCESS,
    POSTS_LOADED_FAILED,
    ADD_POST,
    DELETE_POST,
    FIND_POST,
    UPDATE_POST,
} from './constants';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    // State
    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postsLoading: true,
    });

    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);

    const [showToastMessage, setShowToastMessage] = useState({
        show: false,
        message: '',
        type: null,
    });

    // Get all posts
    const getAllPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`);

            if (response.data.success) {
                dispatch({
                    type: POSTS_LOADED_SUCCESS,
                    payload: response.data.posts,
                });
            }
        } catch (error) {
            dispatch({ type: POSTS_LOADED_FAILED });
        }
    };

    // Add a new post
    const addPost = async (newPost) => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, newPost);

            if (response.data.success) {
                dispatch({ type: ADD_POST, payload: response.data.post });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' };
        }
    };

    // Delete a post
    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${postId}`);
            if (response.data.success) {
                dispatch({ type: DELETE_POST, payload: postId });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Find a post when user is updating a post
    const findPost = (postId) => {
        const post = postState.posts.find((post) => post._id === postId);

        dispatch({ type: FIND_POST, payload: post });
    };

    // Update a post
    const updatePost = async (updatedPost) => {
        try {
            const response = await axios.put(
                `${apiUrl}/posts/${updatedPost._id}`,
                updatedPost,
            );
            if (response.data.success) {
                dispatch({ type: UPDATE_POST, payload: response.data.post });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' };
        }
    };

    // Post context data
    const postContextData = {
        postState,
        getAllPosts,
        showAddPostModal,
        setShowAddPostModal,
        showUpdatePostModal,
        setShowUpdatePostModal,
        addPost,
        showToastMessage,
        setShowToastMessage,
        deletePost,
        findPost,
        updatePost,
    };

    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
