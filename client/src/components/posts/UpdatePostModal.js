import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import { PostContext } from '../../contexts/PostContext';

const UpdatePostModal = () => {
    // Context
    const {
        postState: { post },
        showUpdatePostModal,
        setShowUpdatePostModal,
        updatePost,
        setShowToastMessage,
    } = useContext(PostContext);

    // State
    const [updatedPost, setUpdatedPost] = useState(post);

    useEffect(() => setUpdatedPost(post), [post]);

    const { title, description, url, status } = updatedPost;

    // const resetAddPostData = () => {
    //     setUpdatedPost({
    //         title: '',
    //         description: '',
    //         url: '',
    //         status: 'TO LEARN',
    //     });
    //     setShowUpdatePostModal(false);
    // };

    const onChangeUpdatedPostForm = (event) =>
        setUpdatedPost({
            ...updatedPost,
            [event.target.name]: event.target.value,
        });

    const closeDialog = () => {
        setUpdatedPost(post);
        setShowUpdatePostModal(false);
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        const { success, message } = await updatePost(updatedPost);
        setShowUpdatePostModal(false);

        setShowToastMessage({
            show: true,
            message,
            type: success ? 'warning' : 'danger',
        });
    };

    return (
        <Modal show={showUpdatePostModal} animation={true} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>Making progress?</Modal.Title>
            </Modal.Header>

            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            name="title"
                            required
                            aria-describedby="title-help"
                            value={title}
                            onChange={onChangeUpdatedPostForm}
                        />

                        <Form.Text id="title-help" muted>
                            Required
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Control
                            as="textarea"
                            row={3}
                            placeholder="Description"
                            name="description"
                            value={description}
                            onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>

                    <Form.Group className="mt-4">
                        <Form.Control
                            type="text"
                            placeholder="Youtube Tutorial URL"
                            name="url"
                            value={url}
                            onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>

                    <Form.Group className="mt-4">
                        <Form.Control
                            as="select"
                            value={status}
                            name="status"
                            onChange={onChangeUpdatedPostForm}
                        >
                            <option value="TO LEARN">TO LEARN</option>
                            <option value="LEARNING">LEARNING</option>
                            <option value="LEARNED">LEARNED</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer className="mt-2">
                    <Button variant="secondary" onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        LearnIt
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default UpdatePostModal;
