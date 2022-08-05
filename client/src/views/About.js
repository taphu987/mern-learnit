import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

const About = () => {
    return (
        <Row className="mt-5" style={{ marginRight: 0 }}>
            <Col className="text-center">
                <Button
                    variant="primary"
                    href="https://www.youtube.com/c/HenryWebDev"
                    size="lg"
                >
                    Visit my channel for more tutorials
                </Button>
            </Col>
        </Row>
    );
};

export default About;
