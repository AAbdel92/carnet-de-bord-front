import React, { Component } from 'react';
import {Container, Header, Divider, Card, Label, Grid, Modal, Popup} from "semantic-ui-react";
import ModalForReading from "./ModalForReading/ModalForReading.js"
import axios from "axios";

class ReadingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            diaries : []
        }
    }
    

    componentWillMount() {
        if (!this.props.loggedIn) {
           this.props.redirect();
        } else {
            const self = this;
            const promoId = this.props.promoId();
            const studentId = this.props.studentId();
            const role = this.props.user.role.name;
            axios.get(`/api/diaries?consulter=true&promoId=${promoId}&studentId=${studentId}&userRole=${role}`)                       
                .then(function (response) {
                    self.setState({
                        diaries : response.data
                    })
                })
                .catch(function (err) {
                    console.log(err);
                })
        }
    }

    componentDidMount() {
        
    }

    render() {
        console.log(this.props.user)
        const role = this.props.user.role.name;
        return (
            <Container as="main" text>
                <Divider className="test" section />
                <Header textAlign='center' as="h1">
                    Consultation des carnets de bord
                </Header>
                <Divider className="test" section />
                <Grid doubling centered columns={3} divided="vertically">

                    {this.state.diaries.map(
                        diary => (
                            <Grid.Column key={diary.id}>
                                <ModalForReading role={role} diary={diary} />
                            </Grid.Column>
                        )
                    )}
                </Grid>
            </Container>
        );
    }
}

export default ReadingPage;