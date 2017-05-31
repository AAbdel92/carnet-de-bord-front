import React, { Component } from 'react';
import {Modal, Card, Label, Divider, Grid, Header, Button} from "semantic-ui-react";
import QuestionRow from "./QuestionRow/QuestionRow.js";
import axios from "axios";

class ModalForEditing extends Component {

    constructor(props) {
        super(props);
        this.state = {           
            answer1 : "",
            answer2 : "",
            answer3 : "",
            answer4 : "",
            answer5 : ""
        }
    }

    getAnswer = (answer, input) => {
        if (input === 1) {
            this.setState({
                answer1 : answer
            })
        } else if (input === 2) {
            this.setState({
                answer2 : answer
            })
        } else if (input === 3) {
            this.setState({
                answer3 : answer
            })
        } else if (input === 4) {
            this.setState({
                answer4 : answer
            })
        } else if (input === 5) {
            this.setState({
                answer5 : answer
            })
        }
        
    }

    fillAnswers = (anArray) => {
        let result = []
        for (let i = 0; i < 5; i++) {
            let answer = {
                content : anArray[i],
                question : {
                    id : this.props.diary.questions[i].id
                },
                user : {
                    id : this.props.user.id                    
                }
            };
            result.push(answer);
            
        }
        return result;
    }
    

    sendAnswers = () => {
        const self = this;        
        let answers = [];
        answers.push(this.state.answer1, this.state.answer2, this.state.answer3, this.state.answer4, this.state.answer5);
        axios.post("/api/answers", this.fillAnswers(answers))
        .then( (response) => {
            self.props.update(true), () => {
                this.close();
            }
        })
    }   

    render() {
        const diary = this.props.diary;
        let inputId = 0;
        return (
            <Modal dimmer="blurring" key={diary.id} trigger={
                <Card as="article" color="red">
                    <Card.Content>
                        <Label color='red' ribbon>{diary.name}</Label>
                        <Card.Meta>
                            Du {new Date(diary.startDate).toLocaleDateString()} au {new Date(diary.endDate).toLocaleDateString()}
                        </Card.Meta>
                    </Card.Content>
                </Card>
            }>
                <Label id="diary" tag size="big" color='red'>{diary.name}</Label>
                <Modal.Content>
                    <Modal.Description>
                        <Header>Introduction</Header>
                        {diary.introduction}
                    </Modal.Description>
                    <Divider section />
                    <Modal.Description>
                        <Grid centered columns={2}>
                            <Grid.Row >
                                <Grid.Column textAlign="center">
                                    <Header>Questions</Header>
                                </Grid.Column>
                                <Grid.Column textAlign="center">
                                    <Header>Réponses</Header>
                                </Grid.Column>
                            </Grid.Row>
                            {
                                diary.questions.map(
                                    (question) => (
                                        <QuestionRow input={++inputId} getAnswer={this.getAnswer} key={question.id} question={question} />
                                    )
                                )
                            }
                            <Grid.Row columns={1}>
                                <Button onClick={this.sendAnswers} positive>
                                    Valider
                                            </Button>
                            </Grid.Row>
                        </Grid>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

export default ModalForEditing;