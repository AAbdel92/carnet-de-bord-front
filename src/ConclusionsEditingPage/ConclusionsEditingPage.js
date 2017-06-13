import React, { Component } from 'react';
import axios from "axios";
import {Container, Divider, Header, Grid, Select, Message} from "semantic-ui-react";
import ModalForReading from "../ReadingPage/ModalForReading/ModalForReading.js";
import ModalForEditingConclusion from "./ModalForEditingConclusion/ModalForEditingConclusion.js";

const defaultMessageForModal =    <Grid.Row>
                                        <Grid.Column textAlign="center">
                                            <Message info content="Aucune conclusion à rédiger pour cet apprenant" />
                                        </Grid.Column>
                                    </Grid.Row>

const defaultMessageForUsers =  <Grid.Row>
                                    <Grid.Column  textAlign="center">
                                        <Message info content="Aucune conclusion à rédiger pour ce carnet" />
                                    </Grid.Column>
                                </Grid.Row>
class ConclusionsEditingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            diaries : [],
            diaryReaded : {},
            users : [],
            userChoosen : {},
            answers : [],
            modal : null  
        }
    }
    

    componentWillMount() {
        this.getDiaries();
    }

    getDiaries = () => {
        const self = this;
        const userRole = this.props.user.role.name;
        const promoId = this.props.user.promo.id;
        axios.get(`/api/diaries?userRole=${userRole}&questions=true&promoId=${promoId}`)
            .then((response) => {
                self.setState({
                    diaries: response.data
                })
            })
    }

    getUsers = (diary) => {
        const self = this;
        const role = this.props.user.role.name;
        const promoId = this.props.user.promo.id;
        const diaryId = diary.id;
        axios.get("/api/users?promoId="
        + promoId
        + "&diaryId="
        + diaryId
        + "&userRole="
        + role)
        .then((response) => {
            self.setState({
                users : response.data,
                diaryReaded : diary,
                modal : null
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    getDiary = (user) => {
        const self = this;
        const promoId = this.props.user.promo.id;
        const diaryId = this.state.diaryReaded.id;
        const userId = user.id
        axios.get("/api/answers?diaryId="
                    + diaryId
                    + "&studentId="
                    + userId)
        .then( (response) => {           
            self.setState({
                answers : response.data,
                userChoosen : user
            }, () => {
                this.showModal();
            })
        })
    }

    setDiariesSelect = () => {
        let content;
        let options = []
        this.state.diaries.map(
            diary => (
                options.push({key : diary.id, text: diary.name, value: diary.id})
            )
        )

        content = <Select
            placeholder="Veuillez choisir un carnet"
            options={options}
            onChange={this.handleDiariesChange}
        />
        return content;
    }

    setUsersSelect = () => {
        let content = defaultMessageForUsers;             
        if (this.state.users.length > 0) {
             let options = [];        
            this.state.users.map(
                user => {
                    options.push({key : user.id, text:user.firstname + " " + user.lastname, value: user.id})
                }
            )
            content = <Grid.Row>
                <Grid.Column textAlign="centered">
                    <Select
                        placeholder="Veuillez choisir un apprenant"
                        options={options}
                        onChange={this.handleUsersChange}
                    />
             </Grid.Column></Grid.Row>
        }
        return content;

    }

    showModal = () => {
        let content = defaultMessageForModal;
        if (this.state.answers.length > 0) {
            content = <Grid.Row>
                        <Grid.Column textAlign="centered">
                            <ModalForEditingConclusion
                        diary={this.state.diaryReaded}
                        answers={this.state.answers}
                    />
                        </Grid.Column>
                    </Grid.Row>;
        }
        
                    console.log("set state de showModal")
                    this.setState({
                        modal : content
                    })
    }

    handleDiariesChange = (event, select) => {
        let content;
        this.state.diaries.map(
            (diary, index) => {
                if (diary.id === select.value) {
                    this.getUsers(diary);
                }
            }
        )
    }

    handleUsersChange = (event, select) => {
        let content;
        this.state.users.map(
            user => {
                if (user.id === select.value) {
                    this.getDiary(user);
                }
            }
        )
    }

    render() {
        console.log(this.state.modal)
        return (
            <Container as="main" text>
                <Divider className="test" section />
                <Header textAlign='center' as="h1">
                    Finalisation des carnets de bord
                </Header>
                <Divider className="test" section />
                <Grid doubling centered divided="vertically">
                    <Grid.Row>
                        <Grid.Column textAlign="centered">
                            {this.setDiariesSelect()}
                        </Grid.Column>
                    </Grid.Row>  
                        {this.setUsersSelect()}
                        {this.state.modal}
                </Grid>
            </Container>
        );
    }
}

export default ConclusionsEditingPage;