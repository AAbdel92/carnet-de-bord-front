import React, { Component } from 'react';
import {Container} from "semantic-ui-react";

class EntitiesPage extends Component {

    componentWillMount() {
        if (!this.props.loggedIn) {
           this.props.redirect();
        }
    }

    render() {
        return (
            <Container>
                EntitiesPage
            </Container>
        );
    }
}

export default EntitiesPage;