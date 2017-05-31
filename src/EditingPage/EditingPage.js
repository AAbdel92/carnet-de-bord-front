import React, { Component } from 'react';
import {Container, Divider, Header, Grid, Message} from "semantic-ui-react";
import ModalForEditing from "./ModalForEditing/ModalForEditing.js"
import axios from "axios";



class EditingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            diaries : [],
            update : false                          
        }
    }

    // shouldComponentUpdate() {
    //     if (!this.props.loggedIn) {
    //        this.props.redirect();
    //        return false;
    //     } else {
    //         return true;
    //     }       
    // }
    

    componentWillMount() {
        if (!this.props.loggedIn) {
           this.props.redirect();
        } else {
            this.getDiaries();
        }  
    }

    

    

    getDiaries = () => {
        const self = this;
        const promoId = self.props.promoId();
        const studentId = self.props.studentId();
        const role = self.props.user.role.name;

        return axios.get("/api/diaries?promoId="
            + promoId
            + "&studentId="
            + studentId
            + "&userRole="
            + role)
            .then((response) => {
                self.setState({
                    diaries: response.data,
                    update: false
                }, () => {
                    let content;
                    self.state.diaries.length > 0 ? (
                        content = self.state.diaries.map(
                            diary => (
                                <Grid.Column key={diary.id}>
                                    <ModalForEditing update={self.update} user={self.props.user} diary={diary} />
                                </Grid.Column>
                            )
                        )
                    ) : (
                            content = <Message positive>
                                <Message.Header>
                                    Vous avez déjà répondu à toutes les questions qui vous concernent !
                                        </Message.Header>
                                <p>
                                    Vous pouvez consulter les carnets remplis via le lien correspondant
                                        </p>
                            </Message>
                        );
                    self.setState({
                        content: content
                    })
                })
            })
            .catch(function (err) {
                console.log(err)
            })
    }   

    componentDidUpdate() {
        if (this.state.update) {
            this.getDiaries();
        }
    }

    update = (newUpdate) => {
        this.setState({
            update : newUpdate
        })
    }

    render() {        
        const content = this.state.content;
        return (
            <Container as="main" text>
                <Divider section />                    
                <Header textAlign='center' as="h1">
                        Edition des carnets de bord
                </Header>
                <Divider section />
                <Grid doubling centered columns={3} divided="vertically">
                    {content}  
                </Grid >
            </Container>
        );
    }
}

export default EditingPage;