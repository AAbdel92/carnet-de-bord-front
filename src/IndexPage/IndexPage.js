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
                    <p>
                        Ya une barre de navigation en haut, donc appuie sur les boutons et tu verras bien ce qu'il se passe
                    </p>                
                </Container>
            
        );
    }
}

export default IndexPage;