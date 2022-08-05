import React from 'react';
import { useContext, useEffect } from 'react';
import {
    Spinner,
    Card,
    Button,
    Row,
    Col,
    OverlayTrigger,
    Tooltip,
    Toast,
} from 'react-bootstrap';

import { PostContext } from '../contexts/PostContext';
import { AuthContext } from '../contexts/AuthContext';
import SinglePost from '../components/posts/SinglePost';
import AddPostModal from '../components/posts/AddPostModal';
import addIcon from '../assets/plus-circle-fill.svg';
import UpdatePostModal from '../components/posts/UpdatePostModal';

const Dashboard = () => {
    // Contexts
    const {
        authState: {
            user: { username },
        },
    } = useContext(AuthContext);

    const {
        postState: { post, posts, postsLoading },
        getAllPosts,
        setShowAddPostModal,
        showToastMessage: { show, message, type },
        setShowToastMessage,
    } = useContext(PostContext);

    // Start: Get all posts
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => getAllPosts(), []);

    let body = null;

    if (postsLoading) {
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        );
    } else if (posts.length === 0) {
        body = (
            <>
                <Card className="text-center mx-5 my-5">
                    <Card.Header as="h1">Hi {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to LearnIt</Card.Title>
                        <Card.Text>
                            Click the button below to track your first skill to
                            learn
                        </Card.Text>
                        <Button
                            variant="primary"
                            onClick={setShowAddPostModal.bind(this, true)}
                        >
                            LearnIt!
                        </Button>
                    </Card.Body>
                </Card>
            </>
        );
    } else {
        body = (
            <>
                <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
                    {posts.map((post) => (
                        <Col key={post._id} className="my-2">
                            <SinglePost post={post} />
                        </Col>
                    ))}
                </Row>

                {/* Open Add Post Modal */}
                <OverlayTrigger
                    placement="top"
                    delay={{ show: 150, hide: 400 }}
                    overlay={<Tooltip>Add a new thing to learn!</Tooltip>}
                >
                    <Button
                        className="btn-floating"
                        onClick={setShowAddPostModal.bind(this, true)}
                    >
                        <img
                            src={addIcon}
                            alt="add-post"
                            width="60"
                            height="60"
                        />
                    </Button>
                </OverlayTrigger>
            </>
        );
    }

    return (
        <>
            {body}
            <AddPostModal />
            {post !== null && <UpdatePostModal />}
            {/* After post is added, show toast message */}
            <Toast
                show={show}
                style={{
                    position: 'fixed',
                    top: '20%',
                    right: '10px',
                }}
                className={`bg-${type} text-white`}
                onClose={setShowToastMessage.bind(this, {
                    show: false,
                    message: '',
                    type: null,
                })}
                delay={2500}
                autohide
            >
                <Toast.Body>
                    <strong>{message}</strong>
                </Toast.Body>
            </Toast>
        </>
    );
};

export default Dashboard;
