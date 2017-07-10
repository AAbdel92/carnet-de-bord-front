import React, { Component } from 'react';
import {Container, Header, Divider} from "semantic-ui-react";

class IndexPage extends Component {

    componentWillMount() {
        if (!this.props.loggedIn) {
           this.props.redirect();
        }
    }

    render() {
        const firstname = this.props.user.firstname;
        
        return ( 
                <Container as="main" text>
                    <Divider section />                    
                    <Header textAlign='center' as="h1">
                        Bienvenue {firstname} !
                    </Header>                                    
                </Container>
            
        );
    }
}

export default IndexPage;