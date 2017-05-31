import React, { Component } from 'react';
import {Container, Image, Label, Grid, Divider} from "semantic-ui-react";
import image from "../../public/logo-simplon.png";
import {Card} from "semantic-ui-react";


class MyHeader extends Component {

    
    render() {

        const loggedIn = this.props.loggedIn,
            firstname = this.props.user.firstname,
            lastname = this.props.user.lastname,
            roleName = this.props.user.role.name,
            promo = this.props.user.promo;
        
        return (
            <Container as="header">
                <Grid divided='vertically'>
                    <Grid.Row columns={2}>
                    <Grid.Column floated='left' width={3} only="computer">
                        {loggedIn &&
                            <Card as="aside" raised color="red">
                            <Card.Content>
                                <Label  color='red' attached="top right">{firstname} {lastname}</Label>                                
                                <Card.Meta>{roleName}</Card.Meta>
                                {promo &&
                                    <Card.Description>Promo {promo.name}</Card.Description>}                                                         
                            </Card.Content>                  
                        </Card>
                        }
                    </Grid.Column>
                    <Grid.Column floated='right'>
                        <Image
                        src={image}
                        floated="right"
                        size="medium"
                        verticalAlign="middle"
                    />
                    </Grid.Column>
                    </Grid.Row>                
                </Grid>
            {/*<Container as="header">
                    {this.props.loggedIn ? (
                        <Card raised floated="left" color="red">
                        <Card.Content>
                            <Label  color='red' ribbon>{this.props.user.firstname} {this.props.user.lastname}</Label>
                            <Card.Header>{this.props.user.firstname} {this.props.user.lastname}</Card.Header>
                            <Card.Meta>{this.props.user.role.name}</Card.Meta>                                 
                        </Card.Content>                  
                    </Card>

                    ) : (
                        null
                    )}
                    
                <Image
                    src={image}
                    floated="right"
                    size="medium"
                />
            </Container>*/}                                
            <Divider hidden/>
            </Container>
        );
    }
}

export default MyHeader;