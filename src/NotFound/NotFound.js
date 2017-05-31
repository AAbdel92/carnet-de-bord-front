import React, { Component } from 'react';
import {Container, Image} from "semantic-ui-react";
import image from "../../public/erreur404.png";

class NotFound extends Component {
    render() {
        console.log("NotFound render")
        return (
            <Container>
                <Image centered href={image} />
            </Container>
        );
    }
}

export default NotFound;