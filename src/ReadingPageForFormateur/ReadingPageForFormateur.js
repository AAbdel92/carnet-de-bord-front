import React, { Component } from 'react';
import {Container, Divider, Header} from "semantic-ui-react";

class ReadingPageForFormateur extends Component {
    render() {
        return (
            <Container as="main" text>
                <Divider className="test" section />
                <Header textAlign='center' as="h1">
                    Consultation des carnets de bord
                </Header>
                <Divider className="test" section />
            </Container>
        );
    }
}

export default ReadingPageForFormateur;