import React, { Component } from 'react';
import {Grid, Container, Input, Button, Header, Divider, Icon, Message, Form} from "semantic-ui-react";
import axios from "axios";

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isHidden : true,
            email : "",
            password : ""            
        }
    }   

    handleEmailChange = (event) => {
        this.setState({
            email : event.target.value
        })
    }
    
    handlePasswordChange = (event) => {
        this.setState({
            password : event.target.value
        })
    }

    // loginCors = (e) => {
    //     e.preventDefault();
    //     const self = this;
    //     let user = {};
    //         user["email"] = document.getElementById("email").value;
    //         user["password"] = document.getElementById("password").value; 
    //     axios.post("api/users/logged", user)
    //             .then(function (response) {
    //                  self.props.getUser(true, response.data);  
    //             })
    //             .catch(function (error) {
    //                 console.log("catch")
    //                 self.setState({
    //                     isHidden : false
    //                 })
    //             })
    // }  

    login = (e) => {
        e.preventDefault();
        const self = this;
        axios.post("/login?email=" + this.state.email + "&password=" + this.state.password)
        .then(function (response) {
            let user = {};
            user["email"] = self.state.email
            user["password"] = self.state.password
            axios.post("api/users/logged", user)
                .then(function (response) {
                    if (response.data != null) {                    
                     self.props.getUser(true, response.data);
                    }
                })
                .catch(function (error) {
                    self.setState({
                        isHidden : false
                    })
                    console.log("erreur recup data")
                })           
        })
        .catch (function (error) {
            self.setState({
                        isHidden : false
                    })
               console.log("erreur login")
        })
    }    
    
    render() {
        const isHidden = this.state.isHidden,
            email = this.state.email,
            password = this.state.password;

        return (
            <div>                
                <Container as="main" textAlign="center">
                    <Divider section />                    
                    <Header textAlign='center' as="h1">
                        Bienvenue Simplonien !
                    </Header>
                    <Grid padded doubling centered columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <p>
                                    Vous êtes sur l'application permettant de gérer la communication 
                                    entre les différents acteurs d'une promo. Veuillez vous identifier 
                                    pour continuer.
                                </p>
                            </Grid.Column>
                            <Grid.Column>
                                <Form widths="equal">
                                    <Form.Field>
                                        <Input
                                            size="tiny"
                                            type="email"
                                            icon={<Icon name='id badge' inverted circular link />}
                                            placeholder="Votre e-mail"
                                            id="email"
                                            value={email}
                                            onChange={this.handleEmailChange}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                    <Input
                                        size="tiny"
                                        type="password"
                                        icon={<Icon name='privacy' inverted circular link />}
                                        placeholder="Votre mot de passe"
                                        id="password"
                                        value={password}
                                        onChange={this.handlePasswordChange}
                                    />
                                    </Form.Field>
                                    <Button onClick={this.login}>Valider</Button>
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>                                        
                    
                    <Message hidden={isHidden} error={!isHidden}>
                            <Message.Header>
                            Problème de connexion
                            </Message.Header>
                            <p>
                            Informations de connexion erronées. Veuillez vérifier l'exactitude de vos identifiants.
                            </p>
                    </Message>                
                </Container>
            </div>
        );
    }
}

export default LoginPage;