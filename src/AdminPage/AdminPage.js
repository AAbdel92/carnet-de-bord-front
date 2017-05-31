import React, { Component } from 'react';
import {Container, Header} from "semantic-ui-react";

class AdminPage extends Component {

    componentWillMount() {
        if (!this.props.loggedIn) {
           this.props.redirect();
        }
    }

    render() {
        return (
            <div>
                {/*<MyHeader user={this.props.user}/>
                <MyNav user={this.props.user} deleteUser={this.props.deleteUser}/>*/}
                <Container textAlign="center">                                     
                    <Header as="h1" textAlign="center">
                        {this.props.name}
                    </Header>                
                </Container>
            </div>
        );
    }
}

export default AdminPage;