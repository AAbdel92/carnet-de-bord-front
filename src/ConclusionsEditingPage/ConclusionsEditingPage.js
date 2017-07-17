import React, { Component } from 'react';
import axios from "axios";
import { Container, Divider, Header, Grid, Select, Message } from "semantic-ui-react";
import ModalForReading from "../ReadingPage/ModalForReading/ModalForReading.js";
import ModalForEditingConclusion from "./ModalForEditingConclusion/ModalForEditingConclusion.js";

const defaultMessageForModal =
    <Message info content="Aucune conclusion à rédiger pour le moment" />;

const defaultMessageForUsers =
    <Message info content="Aucune conclusion à rédiger pour ce carnet" />;

class ConclusionsEditingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            diaries: [],
            diaryReaded: {},
            users: [],
            userChoosen: {},
            answers: [],
            modal: null,
            update: false
        }
    }

    componentWillMount() {
        if (!this.props.loggedIn) {
            this.props.redirect();
        } else {
            this.getDiaries();
        }
    }

    componentWillUpdate() {
        if (!this.props.loggedIn) {
            this.props.redirect();
        }
    }

    componentDidUpdate() {
        if (this.state.update) {
            this.getUsers(this.state.diaryReaded);
        }
    }

    getDiaries = () => {
        const self = this;
        const userRole = this.props.user.role.name;
        const promoId = this.props.user.promo.id;
        axios.get(`/api/v1/diaries?read=false&userRole=${userRole}&questions=true&promoId=${promoId}`)
            .then((response) => {
                self.setState({
                    diaries: response.data,
                    update: false
                })
            })
    }

    getUsers = (diary) => {
        const self = this;
        const role = this.props.user.role.name;
        const promoId = this.props.user.promo.id;
        const diaryId = diary.id;
        axios.get(`/api/v1/users?promoId=${promoId}&diaryId=${diaryId}&userRole=${role}`)
            .then((response) => {
                self.setState({
                    users: response.data,
                    diaryReaded: diary,
                    modal: null,
                    update: false
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
        axios.get(`/api/v1/answers?diaryId=${diaryId}&studentId=${userId}`)
            .then((response) => {
                self.setState({
                    answers: response.data,
                    userChoosen: user
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
                options.push({ key: diary.id, text: diary.name, value: diary.id })
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
        let content = defaultMessageForModal;
        if (this.state.users.length > 0) {
            let options = [];
            this.state.users.map(
                user => {
                    options.push({ key: user.id, text: user.firstname + " " + user.lastname, value: user.id })
                }
            )
            content =
                <Select

                    placeholder="Veuillez choisir un apprenant"
                    options={options}
                    onChange={this.handleUsersChange}
                />
        }
        return content;

    }

    showModal = () => {
        let content =
            <Container textAlign="center">
                {defaultMessageForModal}
        </Container>
        if (this.state.answers.length > 0) {
            content =
                <Grid doubling centered columns={3} divided="vertically">
                    <Grid.Row>
                        <Grid.Column>
                            <ModalForEditingConclusion
                                diary={this.state.diaryReaded}
                                answers={this.state.answers}
                                user={this.state.userChoosen}
                                update={this.update}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
        }

        console.log("set state de showModal")
        this.setState({
            modal: content
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

    update = (newUpdate) => {
        this.setState({
            update: newUpdate
        })
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
                <Container textAlign="center">
                    {this.setDiariesSelect()}
                </Container>
                <Divider className="test" section />
                <Container textAlign="center">
                    {this.setUsersSelect()}
                </Container>
                <Divider section />
                {this.state.modal}
            </Container>
        );
    }
}

export default ConclusionsEditingPage;